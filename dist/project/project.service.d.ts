import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddUpdateDto } from './dto/add-update.dto';
export declare class ProjectService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProjectDto: CreateProjectDto): Promise<{
        handle: string;
    }>;
    findAll(): Promise<{
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
        }[];
    }[]>;
    findOne(handle: string): Promise<{
        name: string;
        description: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        handle: string;
        organisations: {
            name: string;
            handle: string;
            imgUrl: string;
        }[];
        users: {
            firstName: string;
            lastName: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            handle: string;
        }[];
    }>;
    findUpdates(handle: string): Promise<{
        user: {
            firstName: string;
            lastName: string;
            handle: string;
        };
        createdAt: Date;
        content: string;
    }[]>;
    findConfig(firebaseId: string, handle: string): Promise<{
        isAdmin: boolean;
    }>;
    update(firebaseId: string, handle: string, updateProjectDto: UpdateProjectDto): Promise<{
        name: string;
        description: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        handle: string;
        organisations: {
            name: string;
            handle: string;
            imgUrl: string;
        }[];
        users: {
            firstName: string;
            lastName: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            handle: string;
        }[];
    }>;
    addUpdate(handle: string, addUpdateDto: AddUpdateDto, firebaseId: string): Promise<{
        user: {
            firstName: string;
            lastName: string;
            handle: string;
        };
        createdAt: Date;
        content: string;
    }>;
    checkIfUserIsAdmin(firebaseId: string, handle: string): Promise<boolean>;
    remove(id: number): string;
}
