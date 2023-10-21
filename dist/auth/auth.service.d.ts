import { OrganisationSignUpDto } from './dto/organisation.signup.dto';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    login(sub: string, loginDto: LoginDto): Promise<{
        organisation: {
            name: string;
            handle: string;
            imgUrl: string;
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
        organisation: {
            name: string;
            handle: string;
            imgUrl: string;
            type: import(".prisma/client").$Enums.OrganisationType;
        };
        firstName: string;
        lastName: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        handle: string;
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
