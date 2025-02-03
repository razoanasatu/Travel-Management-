import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { Database } from './db/database.module';
import { EmailService } from './email/email.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { UserModule } from './user/user.module';
import { DestinationModule } from './destination/destination.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes config available globally
      envFilePath: '.env', // Specify the .env file
    }),
    Database,
    AuthModule,
    UserModule,
    BookingModule,
    DestinationModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService, JwtAuthGuard],
})
export class AppModule {}
