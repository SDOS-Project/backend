import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login(sub: string, loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        firebaseId: sub,
        email: loginDto.email,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async signup(signUpDto: SignUpDto) {
    return 'This action returns a new user';
  }

  async organisationSignup(signUpDto: SignUpDto) {
    return 'This action returns a new user';
  }
}
