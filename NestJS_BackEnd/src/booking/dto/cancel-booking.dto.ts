// cancel-booking.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CancelBookingDto {
  @IsString()
  @IsNotEmpty()
  cancellationReason: string; // Reason for canceling the booking
}
