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
        handle: string;
        name: string;
        description: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        organisations: {
            handle: string;
            name: string;
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
    findOne(handle: string): Promise<{
        handle: string;
        name: string;
        description: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        organisations: {
            handle: string;
            name: string;
            logoUrl: string;
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
        handle: string;
        name: string;
        description: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        organisations: {
            handle: string;
            name: string;
            logoUrl: string;
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
        id: string;
        projectId: string;
        content: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    checkIfUserIsAdmin(firebaseId: string, handle: string): Promise<boolean>;
    remove(id: number): string;
}
