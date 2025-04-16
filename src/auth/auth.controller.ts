import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {   

    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('login')
    login(@Body() loginDto: LoginUserDto) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    register(@Body() registerDto: RegisterUserDto) {
        return this.authService.register(registerDto);
    }

    
}
