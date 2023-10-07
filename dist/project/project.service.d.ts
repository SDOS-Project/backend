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
            type: import(".prisma/client").$Enums.OrganisationType;
            logoUrl: string;
        }[];
        users: {
            handle: string;
            firstName: string;
            lastName: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
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
            logoUrl: string;
        }[];
        users: {
            handle: string;
            firstName: string;
            lastName: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
        }[];
    }>;
    findUpdates(handle: string): Promise<{
        createdAt: Date;
        user: {
            handle: string;
            firstName: string;
            lastName: string;
        };
        content: string;
    }[]>;
    findConfig(firebaseId: string, handle: string): Promise<{
        isAdmin: boolean;
    }>;
    update(firebaseId: string, handle: string, updateProjectDto: UpdateProjectDto): Promise<{
        id: string;
        name: string;
        description: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        handle: string;
        createdAt: Date;
        updatedAt: Date;
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
