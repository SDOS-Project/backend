import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ProjectService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProjectDto: CreateProjectDto): Promise<string>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateProjectDto: UpdateProjectDto): string;
    remove(id: number): string;
}
