import { IsString, MinLength } from 'class-validator';

export class DeleteAccountDto {
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string; // Required password for confirmation
}
