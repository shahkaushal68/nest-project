import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(
        private userService: UserService, // Assuming you have a UserService to handle user-related operations
        private jwtService: JwtService, // Injecting JwtService for token generation
    ){}

    async register(registerDto: RegisterUserDto) {
        if (!registerDto.email) {
            throw new BadRequestException('Email is required');
        }
        const existingUser = await this.userService.findByEmail(registerDto.email);
        if (existingUser) throw new ConflictException('This Email already exists');
        const savedUser = await this.userService.create(registerDto);
        return { message: 'Registration successful', savedUser };
    }

    async login(loginDto: LoginUserDto) {
        if (!loginDto.email) throw new BadRequestException('Email is required');
        if (!loginDto.password) throw new BadRequestException('Password is required');
        const existingUser = await this.userService.findByEmail(loginDto.email);
        if (!existingUser) throw new NotFoundException('This Email is not exists');
        const isMatch = await bcrypt.compare(loginDto.password, existingUser.password);
        if(existingUser && !isMatch) throw new BadRequestException('Invalid password');
        const payload = {id: existingUser.id, email: existingUser.email};
        return {
            email: existingUser.email,
            access_token: await this.jwtService.signAsync(payload),
          };
    }
    
}
