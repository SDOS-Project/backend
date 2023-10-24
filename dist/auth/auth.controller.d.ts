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
        imgUrl: string;
        organisation: {
            handle: string;
            imgUrl: string;
            name: string;
            type: import(".prisma/client").$Enums.OrganisationType;
        };
    } | {
        email: string;
        handle: string;
        imgUrl: string;
        name: string;
        type: import(".prisma/client").$Enums.OrganisationType;
        ipPolicy: string;
    }>;
    signup(signUpDto: SignUpDto): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        handle: string;
        imgUrl: string;
        organisation: {
            handle: string;
            imgUrl: string;
            name: string;
            type: import(".prisma/client").$Enums.OrganisationType;
        };
    }>;
    organisationSignup(organisationSignUpDto: OrganisationSignUpDto): Promise<{
        email: string;
        handle: string;
        imgUrl: string;
        name: string;
        type: import(".prisma/client").$Enums.OrganisationType;
        address: string;
        ipPolicy: string;
    }>;
}
