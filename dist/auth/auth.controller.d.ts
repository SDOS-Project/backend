import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { OrganisationSignUpDto } from './dto/organisation.signup.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(sub: string, loginDto: LoginDto): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        areasOfInterest: string[];
        handle: string;
        organisation: {
            handle: string;
            name: string;
            type: import(".prisma/client").$Enums.OrganisationType;
        };
    } | {
        email: string;
        handle: string;
        name: string;
        type: import(".prisma/client").$Enums.OrganisationType;
        logoUrl: string;
    }>;
    signup(signUpDto: SignUpDto): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        handle: string;
    }>;
    organisationSignup(organisationSignUpDto: OrganisationSignUpDto): Promise<{
        email: string;
        handle: string;
        name: string;
        type: import(".prisma/client").$Enums.OrganisationType;
        address: string;
        logoUrl: string;
    }>;
}
