import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterUserDto {

    @IsEmail({}, { message: 'Invalid email address' })
    @IsNotEmpty()
    email: string;
  
    @IsNotEmpty()
    password: string;

}
