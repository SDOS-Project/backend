import { OrganisationSignUpDto } from './dto/organisation.signup.dto';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
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
        imgUrl: string;
        handle: string;
        name: string;
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
        email: string;
        imgUrl: string;
        handle: string;
        name: string;
        type: import(".prisma/client").$Enums.OrganisationType;
        address: string;
        ipPolicy: string;
    }>;
}
