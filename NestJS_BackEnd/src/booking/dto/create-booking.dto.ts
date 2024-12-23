import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsPositive,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateBookingDto {
  @IsInt({ message: 'Package ID must be a positive integer' })
  @IsPositive({ message: 'Package ID must be greater than zero' })
  packageId: number; // The ID of the package the user is booking

  @Type(() => Date)
  @IsDate({ message: 'Booking Date must be a valid date' })
  @ValidateIf((dto) => new Date(dto.bookingDate) > new Date())
  bookingDate: Date; // Date of the booking

  @Type(() => Date)
  @IsDate({ message: 'Travel Date must be a valid date' })
  travelDate: Date; // Date of travel
  @IsInt({ message: 'Number of seats must be a positive integer' })
  @IsPositive({ message: 'Number of seats must be greater than zero' })
  seats: number; // Number of seats for transport

  @IsString({ message: 'Room type must be a valid string' })
  @IsEnum(['single', 'double', 'suite'], {
    message: 'Room type must be one of the following: single, double, suite',
  })
  roomType: string; // Room type selected

  @IsInt({ message: 'Hotel room count must be a positive integer' })
  @IsPositive({ message: 'Hotel room count must be greater than zero' })
  hotelCount: number; // Number of hotel rooms
}
