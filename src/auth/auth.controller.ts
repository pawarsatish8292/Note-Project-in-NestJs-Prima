import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) {}

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        let result = this.authService.register(registerDto);
        return result
    }

     @Post('login')
    loign(@Body() loginDto: LoginDto) {
        let result = this.authService.login(loginDto);
        return result
    }
}
