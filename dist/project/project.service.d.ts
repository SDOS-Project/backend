import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ProjectService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProjectDto: CreateProjectDto): Promise<{
        handle: string;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        description: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        handle: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(handle: string): Promise<{
        name: string;
        description: string;
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
    getUpdates(handle: string): Promise<{
        updates: {
            id: string;
            projectId: string;
            content: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    update(id: number, updateProjectDto: UpdateProjectDto): string;
    remove(id: number): string;
}
