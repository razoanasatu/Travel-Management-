import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BOOKING_INFO } from '../entities/booking-info.entity';
import { DESTINATION_INFO } from '../entities/destination-info.entity';
import { GUIDE_INFO } from '../entities/guide-info.entity';
import { Hotel } from '../entities/hotel.entity';
import { PACKAGE_INFO } from '../entities/package-info.entity';
import { PAYMENT_INFO } from '../entities/payment-info.entity';
import { REVIEW_INFO } from '../entities/review-info.entity';
import { TRANSPORT_INFO } from '../entities/transport-info.entity';
import { USER_INFO } from '../entities/user-info.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'TravelUser',
      entities: [
        // USER_INFO,
        // BOOKING_INFO,
        // PACKAGE_INFO,
        // TRANSPORT_INFO,
        // DESTINATION_INFO,
        // PAYMENT_INFO,
        // REVIEW_INFO,
        // Hotel,
        // GUIDE_INFO,
        __dirname + '/../../db/entities/*.entity.{ts,js}',
      ],
      synchronize: true, // Enable automatic synchronization (for development)
      logging: false,
      autoLoadEntities: true, // Automatically load entities
    }),
    TypeOrmModule.forFeature([
      USER_INFO,
      BOOKING_INFO,
      PACKAGE_INFO,
      TRANSPORT_INFO,
      DESTINATION_INFO,
      PAYMENT_INFO,
      REVIEW_INFO,
      Hotel,
      GUIDE_INFO,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class Database {}
