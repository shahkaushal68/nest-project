import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './entities/userProfile.entity';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './user-profile.service';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserProfile]),
        UserModule
    ], // Add your entities here
    controllers: [UserProfileController],
    providers: [UserProfileService],
    exports: [],
})
export class UserProfileModule {}
