import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prismaService:PrismaService) {}
    
   async getUserById(email: string) {
       const user = await this.prismaService.user.findUnique({
           where: { email },
       });
       return user;
    }

    async createUser(registerDto: RegisterDto) {
        const newUser = await this.prismaService.user.create({
            data:registerDto
        });
        return newUser;
    }
}
