import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  // @IsOptional()
  // @IsEmail()
  // email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  phone_no?: string;
  @IsOptional()
  @IsString()
  @MaxLength(15)
  password?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @IsOptional()
  dob?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  gender?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  nid_no?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  nid_pic_path?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  profile_pic_path?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
