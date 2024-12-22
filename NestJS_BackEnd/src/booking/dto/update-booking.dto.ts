// update-booking.dto.ts
import {
  IsDate,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateBookingDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  seats?: number; // Updated number of seats

  @IsOptional()
  @IsString()
  roomType?: string; // Updated room type

  @IsOptional()
  @IsDate()
  bookingDate?: Date; // Updated booking date

  @IsOptional()
  @IsInt()
  hotelCount?: number; // Updated hotel count
}
