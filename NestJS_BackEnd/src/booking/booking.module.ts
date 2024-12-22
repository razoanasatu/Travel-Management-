import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BOOKING_INFO } from 'src/entities/booking-info.entity';
import { PAYMENT_INFO } from 'src/entities/payment-info.entity';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
// @Module({
//   imports: [
//     TypeOrmModule.forFeature([BOOKING_INFO, PAYMENT_INFO]), // Ensure repositories are provided here
//     JwtModule.register({
//       secret: process.env.JWT_SECRET || 'your_secret_secret_key', // Ensure secret is configured here
//       signOptions: { expiresIn: '1h' }, // JWT token expiration time
//     }),
//   ],
//   controllers: [BookingController], // Controller
//   providers: [
//     BookingService, // Service for booking-related operations
//     JwtAuthGuard, // Add JwtAuthGuard to the providers array
//   ],
// })
// export class BookingModule {}

@Module({
  imports: [
    TypeOrmModule.forFeature([BOOKING_INFO, PAYMENT_INFO]), // Ensure repositories are provided here
    ConfigModule.forRoot({
      // Load environment variables from .env file
      isGlobal: true, // Makes config available globally
      envFilePath: '.env', // Specify .env file location (optional if located in the root)
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule to use ConfigService
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'default_secret', // Use ConfigService to fetch JWT_SECRET
        signOptions: { expiresIn: '1h' }, // JWT token expiration time
      }),
      inject: [ConfigService], // Inject ConfigService
    }),
  ],
  controllers: [BookingController], // Controller
  providers: [
    BookingService, // Service for booking-related operations
    JwtAuthGuard, // Add JwtAuthGuard to the providers array
  ],
})
export class BookingModule {}
