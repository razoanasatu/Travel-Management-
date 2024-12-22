import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { USER_INFO } from '../entities/user-info.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([USER_INFO]), // Directly register the User entity here
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_secure_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailService],
  exports: [AuthService, JwtModule, TypeOrmModule], // Export AuthService if needed elsewhere
})
export class AuthModule {}
