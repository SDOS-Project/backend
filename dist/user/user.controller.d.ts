import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): string;
    findRecommendations(firebaseId: string): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        areasOfInterest: string[];
        handle: string;
        imgUrl: string;
        organisation: {
            handle: string;
            name: string;
            type: import(".prisma/client").$Enums.OrganisationType;
        };
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
        imgUrl: string;
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
        imgUrl: string;
    }[]>;
    findOne(handle: string): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        areasOfInterest: string[];
        handle: string;
        imgUrl: string;
        organisation: {
            handle: string;
            name: string;
            type: import(".prisma/client").$Enums.OrganisationType;
        };
    }>;
    findProjects(handle: string): Promise<{
        handle: string;
        name: string;
        users: {
            firstName: string;
            lastName: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            handle: string;
            imgUrl: string;
        }[];
        description: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        organisations: {
            handle: string;
            imgUrl: string;
            name: string;
            type: import(".prisma/client").$Enums.OrganisationType;
        }[];
    }[]>;
    update(firebaseId: string, updateUserDto: UpdateUserDto): Promise<{
        firstName: string;
        lastName: string;
        areasOfInterest: string[];
    }>;
    remove(id: string): string;
}
