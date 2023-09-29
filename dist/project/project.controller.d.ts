import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(createProjectDto: CreateProjectDto): Promise<{
        handle: string;
    }>;
    findAll(): string;
    findOne(handle: string): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        id: string;
        name: string;
        description: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        handle: string;
        createdAt: Date;
        updatedAt: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateProjectDto: UpdateProjectDto): string;
    remove(id: string): string;
}
