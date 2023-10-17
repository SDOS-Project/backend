import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { OrganisationSignUpDto } from './dto/organisation.signup.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(sub: string, loginDto: LoginDto): Promise<{
        organisation: {
            name: string;
            handle: string;
            type: import(".prisma/client").$Enums.OrganisationType;
        };
        firstName: string;
        lastName: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        areasOfInterest: string[];
        handle: string;
    } | {
        name: string;
        email: string;
        handle: string;
        imgUrl: string;
        type: import(".prisma/client").$Enums.OrganisationType;
        ipPolicy: string;
    }>;
    signup(signUpDto: SignUpDto): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.UserRole;
        areasOfInterest: string[];
        organisationId: string;
        createdAt: Date;
        updatedAt: Date;
        handle: string;
        firebaseId: string;
        imgUrl: string;
    }>;
    organisationSignup(organisationSignUpDto: OrganisationSignUpDto): Promise<{
        name: string;
        email: string;
        handle: string;
        imgUrl: string;
        type: import(".prisma/client").$Enums.OrganisationType;
        address: string;
        ipPolicy: string;
    }>;
}
