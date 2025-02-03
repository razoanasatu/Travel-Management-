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
  // async signIn(loginDto: LoginDto) {
  //   const { email, password } = loginDto;

  //   const user = await this.userRepository.findOne({ where: { email } });

  //   if (!user) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }

  //   const isPasswordValid = await bcrypt.compare(password, user.password);
  //   if (!isPasswordValid) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }

  //   const payload = { sub: user.id, email: user.email };
  //   const token = this.jwtService.sign(payload);

  //   return { access_token: token };
  // }
  async signIn(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['bookings'], // You can include related entities, like bookings
    });

    // If user doesn't exist, throw an Unauthorized exception
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Validate the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Create the payload to include in the JWT token
    const payload = { sub: user.id, email: user.email };

    // Generate the token using the JWT service
    const token = this.jwtService.sign(payload);

    // Return user information along with the access token
    return {
      access_token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone_no: user.phone_no,
        address: user.address,
        dob: user.dob,
        gender: user.gender,
        nid_no: user.nid_no,
        nid_pic_path: user.nid_pic_path,
        profile_pic_path: user.profile_pic_path,
        description: user.description,
        user_type: user.user_type,
        bookings: user.bookings, // Include the bookings information if needed
      },
    };
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
      user.email, // recipient email
      'Password Reset Request', // subject line
      ``, // plain text content
      `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Request</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f7fa;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            color: #333;
          }
          .message {
            font-size: 16px;
            line-height: 1.5;
            color: #555;
          }
          .button-container {
            text-align: center;
            margin-top: 20px;
          }
          .button {
            background-color: #4CAF50;
            color: white;
            font-size: 16px;
            padding: 12px 20px;
            border-radius: 5px;
            text-decoration: none;
            display: inline-block;
            transition: background-color 0.3s ease;
          }
          .button:hover {
            background-color: #45a049;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Password Reset Request</h2>
          </div>
          <div class="message">
            <p>Hi,</p>
            <p>You requested to reset your password. Please use the following token to reset your password:</p>
            <p><strong>${resetToken}</strong></p>
            <p>If you didn't request this, please ignore this email.</p>
          </div>
      
          <div class="button-container">
            <a href="http://localhost:3000/reset-password?token=${resetToken}" class="button">Change Password</a>
          </div>
      
          <p style="text-align: center; font-size: 14px; color: #777;">If you have any issues, please contact our support team.</p>
        </div>
      </body>
      </html>
      `, // HTML content
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
