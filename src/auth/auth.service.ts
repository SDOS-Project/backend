import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  async login(loginDto: LoginDto) {
    return 'This action returns a new user';
  }

  async signup(signUpDto: SignUpDto) {
    return 'This action returns a new user';
  }
}
