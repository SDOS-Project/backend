import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ProjectService {
    private prisma;
    constructor(prisma: PrismaService);
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
    update(id: number, updateProjectDto: UpdateProjectDto): string;
    remove(id: number): string;
}
