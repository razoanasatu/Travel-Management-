import { IsOptional, IsString } from 'class-validator';
export class UpdateDestinationDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  best_season?: string;

  @IsOptional()
  @IsString()
  imagePath?: string; // Optional field
}
