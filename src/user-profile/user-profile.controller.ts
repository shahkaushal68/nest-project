import { Body, Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('userProfile')
@UseGuards(AuthGuard)
export class UserProfileController {
    constructor(private readonly userProfileService: UserProfileService) {}

    @Post(":userID")
    async addUserProfile(
        @Param('userID') userId: number,
        @Body() userProfileDto: any,
        @Request() req,
    ) {
        return this.userProfileService.addUserProfile(userId, userProfileDto, req);    
    }    
}
