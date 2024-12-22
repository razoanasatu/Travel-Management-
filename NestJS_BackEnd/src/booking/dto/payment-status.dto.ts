// payment-status.dto.ts
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class PaymentStatusDto {
  @IsInt()
  @IsNotEmpty()
  bookingId: number; // The booking ID for payment status

  @IsString()
  @IsNotEmpty()
  status: string; // Payment status (success, failed, pending)
}
