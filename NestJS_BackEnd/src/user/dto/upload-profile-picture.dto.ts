import { IsNotEmpty } from 'class-validator';

export class UploadProfilePictureDto {
  @IsNotEmpty()
  file: Express.Multer.File; // Represents the uploaded file
}
