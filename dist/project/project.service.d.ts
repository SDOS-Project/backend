import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddUpdateDto } from './dto/add-update.dto';
export declare class ProjectService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProjectDto: CreateProjectDto): Promise<{
        handle: any;
    }>;
    findAll(): Promise<any>;
    findOne(handle: string): Promise<any>;
    findUpdates(handle: string): Promise<any>;
    findConfig(firebaseId: string, handle: string): Promise<{
        isAdmin: boolean;
    }>;
    update(handle: string, updateProjectDto: UpdateProjectDto): void;
    addUpdate(handle: string, addUpdateDto: AddUpdateDto, firebaseId: string): Promise<any>;
    remove(id: number): string;
}
