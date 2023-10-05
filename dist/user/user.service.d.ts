import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): string;
    findRecommendations(firebaseId: string): Promise<{
        organisation: {
            name: string;
            type: import(".prisma/client").$Enums.OrganisationType;
            handle: string;
        };
        email: string;
        firstName: string;
        lastName: string;
        role: import(".prisma/client").$Enums.UserRole;
        areasOfInterest: string[];
        handle: string;
    }[]>;
    findFaculty(): Promise<{
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
    }[]>;
    findEmployees(): Promise<{
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
    }[]>;
    findOne(handle: string): Promise<{
        organisation: {
            name: string;
            type: import(".prisma/client").$Enums.OrganisationType;
            handle: string;
        };
        email: string;
        firstName: string;
        lastName: string;
        role: import(".prisma/client").$Enums.UserRole;
        areasOfInterest: string[];
        handle: string;
    }>;
    getConfig(firebaseId: string): Promise<string>;
    findProjects(handle: string): Promise<{
        name: string;
        description: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        handle: string;
        users: {
            email: string;
            firstName: string;
            lastName: string;
            role: import(".prisma/client").$Enums.UserRole;
            handle: string;
        }[];
        organisations: {
            name: string;
            type: import(".prisma/client").$Enums.OrganisationType;
            logoUrl: string;
            handle: string;
        }[];
    }[]>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
