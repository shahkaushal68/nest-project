import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from './entities/userProfile.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserProfileService {
    constructor(
        @InjectRepository(UserProfile)
        private userProfileRepository: Repository<UserProfile>,
        private userService: UserService,
       
    ) { }


    async addUserProfile(userId:number,userProfileDto: any, req: any) {
        // Check if user exists

       
        
        
        const user = await this.userService.findByUserId(+userId);
        if (!user) throw new NotFoundException('User not found');
    

        const currentUser = req.user;

        const isOwner = currentUser.id === +userId;
        console.log("isOwner", isOwner); // 👈 useful lo
        const isAdmin = currentUser.roles.some((role) => role.name === 'Admin');

        
        
        console.log("isAdmin", isAdmin); // 👈 useful log

        // Check if profile already exists for this user
        const existingProfile = await this.userProfileRepository.findOne({
            where: { user: userProfileDto.user },
        });
    
        if (existingProfile) {
            // Merge new data into existing profile and update
            const updatedProfile = this.userProfileRepository.merge(existingProfile, userProfileDto);
            return await this.userProfileRepository.save(updatedProfile);
        } else {
            // Create new profile
            const newProfile = this.userProfileRepository.create(userProfileDto);
            return await this.userProfileRepository.save(newProfile);
        }
    }
    

   

}
