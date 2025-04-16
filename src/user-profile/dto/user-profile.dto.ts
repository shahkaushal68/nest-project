import { IsNotEmpty, IsOptional } from "class-validator";

export class UserProfileDto {

    @IsNotEmpty()
    userID: number;
  
    @IsNotEmpty()
    name: string;

    @IsOptional()
    profilePicture: string;

    @IsOptional()
    phoneNumber: string;

    @IsOptional()
    bio: string;

    @IsOptional()
    addressLine1: string;

    @IsOptional()
    addressLine2: string; 
    
    @IsOptional()
    city: string;

    @IsOptional()
    state: string;

    @IsOptional()
    zipcode: string;  
    
    @IsOptional()
    dateOfBirth: string;
}
