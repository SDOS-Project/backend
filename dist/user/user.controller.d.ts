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
            imgUrl: string;
            type: import(".prisma/client").$Enums.OrganisationType;
        };
        firstName: string;
        lastName: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        areasOfInterest: string[];
        handle: string;
        imgUrl: string;
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
        imgUrl: string;
    }>;
    findProjects(handle: string): Promise<{
        name: string;
        description: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        handle: string;
        organisations: {
            name: string;
            handle: string;
            imgUrl: string;
            type: import(".prisma/client").$Enums.OrganisationType;
        }[];
        users: {
            firstName: string;
            lastName: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            handle: string;
            imgUrl: string;
        }[];
    }[]>;
    update(firebaseId: string, updateUserDto: UpdateUserDto): Promise<{
        firstName: string;
        lastName: string;
        areasOfInterest: string[];
        handle: string;
    }>;
    remove(firebaseId: string, handle: string): Promise<void>;
}
