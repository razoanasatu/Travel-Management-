// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Patch,
//   Post,
//   Request,
//   UseGuards,
//   UseInterceptors,
// } from '@nestjs/common';
// import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
// import { UpdateProfileDto } from './dto/update-profile.dto';
// import { UserService } from './user.service';

// //Multer
// import { UploadedFile } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';

// @Controller('user')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   // Get logged-in user's profile
//   @UseGuards(JwtAuthGuard)
//   @Get('profile')
//   async getProfile(@Request() req) {
//     const userId = req.user.sub; // Extract user ID from JWT payload
//     return this.userService.getUserProfile(userId);
//   }

//   // Update logged-in user's profile
//   @UseGuards(JwtAuthGuard)
//   @Patch('update-profile')
//   async updateProfile(
//     @Request() req,
//     @Body() updateProfileDto: UpdateProfileDto,
//   ) {
//     const userId = req.user.sub; // Extract user ID from JWT payload
//     return this.userService.updateUserProfile(userId, updateProfileDto);
//   }

//   // Upload Profile Picture
//   @UseGuards(JwtAuthGuard)
//   @Post('upload-profile-picture')
//   @UseInterceptors(
//     FileInterceptor('file', {
//       storage: diskStorage({
//         destination: './uploads/profile-pictures',
//         filename: (req, file, callback) => {
//           const uniqueSuffix =
//             Date.now() + '-' + Math.round(Math.random() * 1e9);
//           const fileExtension = file.originalname.split('.').pop();
//           const fileName = `${req.user.sub}-${uniqueSuffix}.${fileExtension}`;
//           callback(null, fileName);
//         },
//       }),
//       fileFilter: (req, file, callback) => {
//         if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
//           return callback(new Error('Only image files are allowed!'), false);
//         }
//         callback(null, true);
//       },
//     }),
//   )
//   async uploadProfilePicture(
//     @UploadedFile() file: Express.Multer.File,
//     @Request() req,
//   ) {
//     const userId = req.user.sub;
//     const filePath = `/uploads/profile-pictures/${file.filename}`;
//     return this.userService.uploadProfilePicture(userId, filePath);
//   }

//   // Delete Profile Picture
//   @UseGuards(JwtAuthGuard)
//   @Delete('delete-picture')
//   async deleteProfilePicture(@Request() req) {
//     const userId = req.user.sub;
//     return this.userService.deleteProfilePicture(userId);
//   }

//   // Update Preferences
//   @UseGuards(JwtAuthGuard)
//   @Patch('preferences')
//   async updatePreferences(@Request() req, @Body() preferences: any) {
//     const userId = req.user.sub;
//     return this.userService.updatePreferences(userId, preferences);
//   }

//   // Delete User Account
//   @UseGuards(JwtAuthGuard)
//   @Delete('delete-account')
//   async deleteAccount(@Request() req) {
//     const userId = req.user.sub;
//     return this.userService.deleteAccount(userId);
//   }
// }
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const userId = req.user.sub;
    return this.userService.getUserProfile(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-profile')
  async updateProfile(
    @Request() req,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const userId = req.user.sub;
    return this.userService.updateUserProfile(userId, updateProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-profile-picture')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/profile-pictures',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtension = file.originalname.split('.').pop();
          const fileName = `${req.user.sub}-${uniqueSuffix}.${fileExtension}`;
          callback(null, fileName);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new BadRequestException('Invalid file type'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadProfilePicture(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    if (!file) {
      throw new BadRequestException('File not provided or invalid format');
    }
    const userId = req.user.sub;
    const filePath = `/uploads/profile-pictures/${file.filename}`;
    return this.userService.uploadProfilePicture(userId, filePath);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-picture')
  async deleteProfilePicture(@Request() req) {
    const userId = req.user.sub;
    return this.userService.deleteProfilePicture(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('preferences')
  async updatePreferences(@Request() req, @Body() preferences: any) {
    const userId = req.user.sub;
    return this.userService.updatePreferences(userId, preferences);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-account')
  async deleteAccount(@Request() req) {
    const userId = req.user.sub;
    return this.userService.deleteAccount(userId);
  }
}
