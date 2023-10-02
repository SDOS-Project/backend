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
        user: {
            firstName: string;
            lastName: string;
            handle: string;
        };
        createdAt: Date;
        content: string;
    }[]>;
    update(id: number, updateProjectDto: UpdateProjectDto): string;
    remove(id: number): string;
}
