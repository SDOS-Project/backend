import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(sub: string, loginDto: LoginDto): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        areasOfInterest: string[];
        organisationId: string;
        createdAt: Date;
        updatedAt: Date;
        handle: string;
        firebaseId: string;
    }>;
    signup(signUpDto: SignUpDto): Promise<string>;
}
