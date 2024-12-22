import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { Repository } from 'typeorm';
import { USER_INFO } from '../entities/user-info.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  private blacklistedTokens: Set<string> = new Set();
  constructor(
    @InjectRepository(USER_INFO)
    private readonly userRepository: Repository<USER_INFO>, // Directly interact with the USER_INFO repository
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  // Signup Method
  async signup(createAuthDto: CreateAuthDto) {
    const { password, ...rest } = createAuthDto;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      password: hashedPassword,
      ...rest, // Spread other fields
    });

    return await this.userRepository.save(newUser);
  }

  // Signin Method
  async signIn(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  // Forgot Password Method (generate reset token)
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = this.jwtService.sign(
      { email: user.email },
      { expiresIn: '1h' },
    );
    await this.emailService.sendEmail(
      user.email,
      'Password Reset Request',
      `Use this token to reset your password: ${resetToken}`,
    );

    return {
      message: 'Password reset token sent to mail',
      reset_token: resetToken,
    };
  }

  // Reset Password Method (validate token and reset password)
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { reset_token, new_password } = resetPasswordDto;

    try {
      const decoded: any = this.jwtService.verify(reset_token);
      const user = await this.userRepository.findOne({
        where: { email: decoded.email },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const hashedPassword = await bcrypt.hash(new_password, 10);
      user.password = hashedPassword;

      await this.userRepository.save(user);

      return { message: 'Password has been successfully reset' };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }
  }

  // Change Password Method
  async changePassword(userId: number, changePasswordDto: ChangePasswordDto) {
    const { current_password, new_password } = changePasswordDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      current_password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const isSamePassword = await bcrypt.compare(new_password, user.password);
    if (isSamePassword) {
      throw new BadRequestException(
        'New password cannot be the same as the old password',
      );
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    await this.userRepository.save({ ...user, password: hashedPassword });

    return { message: 'Password updated successfully' };
  }

  // Logout
  async logout(token: string) {
    this.blacklistedTokens.add(token); // Add the token to the blacklist
    return { message: 'Logged out successfully' };
  }

  // Check if token is blacklisted
  async isTokenBlacklisted(token: string): Promise<boolean> {
    return this.blacklistedTokens.has(token);
  }
}
