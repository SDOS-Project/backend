import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): string;
    findRecommendations(firebaseId: string): Promise<{
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
            handle: string;
            type: import(".prisma/client").$Enums.OrganisationType;
        };
        firstName: string;
        lastName: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        areasOfInterest: string[];
        handle: string;
    }>;
    findProjects(handle: string): Promise<{
        name: string;
        description: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        handle: string;
        organisations: {
            name: string;
            handle: string;
            type: import(".prisma/client").$Enums.OrganisationType;
            logoUrl: string;
        }[];
        users: {
            firstName: string;
            lastName: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            handle: string;
        }[];
    }[]>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
