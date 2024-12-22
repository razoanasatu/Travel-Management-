import { IsBoolean } from 'class-validator';

export class DeleteProfilePictureDto {
  @IsBoolean()
  confirm: boolean; // Confirmation flag to ensure user intent
}
