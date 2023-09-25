import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
export declare class AuthService {
    login(loginDto: LoginDto): Promise<string>;
    signup(signUpDto: SignUpDto): Promise<string>;
    organisationSignup(signUpDto: SignUpDto): Promise<string>;
}
