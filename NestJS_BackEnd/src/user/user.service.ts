// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { USER_INFO } from '../entities/user-info.entity';
// import * as fs from 'fs';
// import * as path from 'path';
// import { Repository } from 'typeorm';
// import { UpdateProfileDto } from './dto/update-profile.dto';

// // @Injectable()
// // export class UserService {
// //   constructor(
// //     @InjectRepository(USER_INFO)
// //     private readonly userRepository: Repository<USER_INFO>,
// //   ) {}

// //   // Helper method to find a user by ID
// //   private async findUserById(userId: number): Promise<USER_INFO> {
// //     const user = await this.userRepository.findOne({ where: { id: userId } });
// //     if (!user) {
// //       throw new NotFoundException('User not found');
// //     }
// //     return user;
// //   }

// //   // Get user profile by ID
// //   async getUserProfile(userId: number) {
// //     return await this.findUserById(userId);
// //   }

// //   // Update user profile by ID
// //   async updateUserProfile(userId: number, updateProfileDto: UpdateProfileDto) {
// //     const user = await this.findUserById(userId);

// //     await this.userRepository.update(userId, updateProfileDto);

// //     const updatedUser = await this.findUserById(userId);
// //     return {
// //       message: 'Profile updated successfully',
// //       updatedProfile: updatedUser,
// //     };
// //   }
// // }

// @Injectable()
// export class UserService {
//   constructor(
//     @InjectRepository(USER_INFO)
//     private readonly userRepository: Repository<USER_INFO>,
//   ) {}

//   // Get user profile by ID
//   async getUserProfile(userId: number) {
//     const user = await this.userRepository.findOne({ where: { id: userId } });
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }
//     return user;
//   }

//   // Update user profile by ID
//   async updateUserProfile(userId: number, updateProfileDto: UpdateProfileDto) {
//     const user = await this.userRepository.findOne({ where: { id: userId } });
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }

//     await this.userRepository.update(userId, updateProfileDto);
//     return await this.userRepository.findOne({ where: { id: userId } });
//   }

//   // Upload profile picture
//   async uploadProfilePicture(userId: number, filePath: string) {
//     const user = await this.userRepository.findOne({ where: { id: userId } });

//     if (!user) {
//       throw new NotFoundException('User not found');
//     }

//     // Update profile picture path
//     user.profile_pic_path = filePath;
//     await this.userRepository.save(user);

//     return { message: 'Profile picture uploaded successfully', filePath };
//   }

//   // Delete profile picture
//   async deleteProfilePicture(userId: number) {
//     const user = await this.userRepository.findOne({ where: { id: userId } });

//     if (!user) {
//       throw new NotFoundException('User not found');
//     }

//     const picturePath = user.profile_pic_path;
//     if (picturePath) {
//       const absolutePath = path.join(__dirname, '..', '..', '..', picturePath);
//       try {
//         fs.unlinkSync(absolutePath); // Delete the file
//       } catch (error) {
//         console.error('Error deleting file:', error);
//       }
//     }

//     user.profile_pic_path = null;
//     await this.userRepository.save(user);

//     return { message: 'Profile picture deleted successfully' };
//   }

//   // Update Preferences
//   async updatePreferences(userId: number, preferences: any) {
//     const user = await this.userRepository.findOne({ where: { id: userId } });

//     if (!user) {
//       throw new NotFoundException('User not found');
//     }

//     user.description = preferences.description || user.description;
//     await this.userRepository.save(user);

//     return { message: 'Preferences updated successfully', preferences: user };
//   }

//   // Delete User Account
//   async deleteAccount(userId: number) {
//     const user = await this.userRepository.findOne({ where: { id: userId } });

//     if (!user) {
//       throw new NotFoundException('User not found');
//     }

//     await this.userRepository.remove(user);

//     return { message: 'User account deleted successfully' };
//   }
// }

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Repository } from 'typeorm';
import { USER_INFO } from '../entities/user-info.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(USER_INFO)
    private readonly userRepository: Repository<USER_INFO>,
  ) {}

  private async findUserById(userId: number): Promise<USER_INFO> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUserProfile(userId: number) {
    return this.findUserById(userId);
  }

  async updateUserProfile(userId: number, updateProfileDto: UpdateProfileDto) {
    const user = await this.findUserById(userId);

    // Explicitly prevent the `email` field from being updated
    if ('email' in updateProfileDto) {
      throw new BadRequestException('Email update is not allowed.');
    }

    // Update the user with the allowed fields only
    await this.userRepository.update(userId, updateProfileDto);

    // Fetch the updated user (if needed) to return the latest details
    const updatedUser = await this.findUserById(userId);

    return {
      message: 'Profile updated successfully',
      user: updatedUser,
    };
  }

  async uploadProfilePicture(userId: number, filePath: string) {
    const user = await this.findUserById(userId);
    user.profile_pic_path = filePath;
    await this.userRepository.save(user);
    return { message: 'Profile picture uploaded successfully', filePath };
  }

  async deleteProfilePicture(userId: number) {
    const user = await this.findUserById(userId);

    if (!user.profile_pic_path) {
      return { message: 'No profile picture to delete' };
    }

    const picturePath = path.resolve(user.profile_pic_path);

    try {
      if (fs.existsSync(picturePath)) {
        fs.unlinkSync(picturePath);
      }
    } catch (error) {
      console.error('Error deleting profile picture:', error.message);
      throw new Error('Failed to delete the profile picture file');
    }

    // Clear the profile picture path in the database
    user.profile_pic_path = null;
    await this.userRepository.save(user);

    return { message: 'Profile picture deleted successfully' };
  }

  async updatePreferences(userId: number, preferences: any) {
    const user = await this.findUserById(userId);
    if (preferences.description) {
      user.description = preferences.description;
    }
    await this.userRepository.save(user);
    return { message: 'Preferences updated successfully', user };
  }

  async deleteAccount(userId: number) {
    const user = await this.findUserById(userId);
    await this.userRepository.remove(user);
    return { message: 'User account deleted successfully' };
  }
}
