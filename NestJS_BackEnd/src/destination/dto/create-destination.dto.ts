import { IsOptional, IsString } from 'class-validator';

export class CreateDestinationDTO {
  @IsString()
  name: string;

  @IsString()
  country: string;

  @IsString()
  description: string;

  @IsString()
  best_season: string;

  @IsOptional()
  @IsString()
  imagePath?: string; // Optional field
}
