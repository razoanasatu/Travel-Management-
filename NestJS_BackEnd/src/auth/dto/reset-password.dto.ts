import { IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  reset_token: string; // Token from the forgot-password step

  @IsNotEmpty()
  @MinLength(3) // Minimum password length requirement
  new_password: string; // The new password to be set
}
