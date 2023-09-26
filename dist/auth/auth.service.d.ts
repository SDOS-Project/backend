import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
export declare class AuthService {
    login(sub: string, loginDto: LoginDto): Promise<string>;
    signup(signUpDto: SignUpDto): Promise<string>;
    organisationSignup(signUpDto: SignUpDto): Promise<string>;
}
