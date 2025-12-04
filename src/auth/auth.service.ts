import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(private readonly userSerive:UserService, private readonly jwtService:JwtService) {}

    async register(registerDto:RegisterDto) {
        const user = await this.userSerive.getUserById(registerDto.email);
        if (user) {
            throw new ConflictException('Email already Taken!');
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);
        const newUser = {
           ...registerDto,
            password: hashedPassword,
        };
        const createdUser = await this.userSerive.createUser(newUser);
        const payload = { sub: createdUser.id, email: createdUser.email };
        return {
        access_token: await this.jwtService.signAsync(payload),
        };
    }

    async login(loginDto:LoginDto) {
        const user = await this.userSerive.getUserById(loginDto.email);
        if (!user) {
            throw new UnauthorizedException('Email or password is incorrect!');
        }
        const isPasswordMatching = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordMatching) {
            throw new UnauthorizedException('Email or password is incorrect!');
        }
        const payload = { sub: user.id, email: user.email };
        this.logger.log(`User ${user.email} logged in successfully.`);  
        return {
        access_token: await this.jwtService.signAsync(payload),
        };
    }   
}
