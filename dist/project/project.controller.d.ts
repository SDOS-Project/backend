import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
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
            handle: string;
            firstName: string;
            lastName: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
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
    update(id: string, updateProjectDto: UpdateProjectDto): string;
    remove(id: string): string;
}
