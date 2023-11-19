import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from '../common/decorators/user.decorator';
import { OrganisationSignUpDto } from './dto/organisation.signup.dto';
import { ApiTags } from '@nestjs/swagger';
import { StudentSignupDto } from './dto/student.signup.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@User('sub') sub: string, @Body() loginDto: LoginDto) {
    return await this.authService.login(sub, loginDto);
  }

  @Post('/signup')
  async signup(@Body() signUpDto: SignUpDto) {
    return await this.authService.signup(signUpDto);
  }

  @Post('/signup/organisation')
  async organisationSignup(
    @Body() organisationSignUpDto: OrganisationSignUpDto,
  ) {
    return await this.authService.organisationSignup(organisationSignUpDto);
  }

  @Post('/signup/student')
  async studentSignup(@Body() studentSignUpDto: StudentSignupDto) {
    return await this.authService.studentSignup(studentSignUpDto);
  }
}
