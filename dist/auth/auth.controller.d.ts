import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(sub: string, loginDto: LoginDto): Promise<string>;
    signup(signUpDto: SignUpDto): Promise<string>;
}
