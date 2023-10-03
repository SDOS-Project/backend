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
        content: string;
        user: {
            firstName: string;
            lastName: string;
            handle: string;
        };
        createdAt: Date;
    }[]>;
    update(handle: string, updateProjectDto: UpdateProjectDto): void;
    addUpdate(handle: string, addUpdateDto: AddUpdateDto): Promise<{
        id: string;
        projectId: string;
        content: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): string;
}
