import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AddUpdateDto } from './dto/add-update.dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(createProjectDto: CreateProjectDto): Promise<{
        handle: any;
    }>;
    findAll(): Promise<any>;
    findOne(handle: string): Promise<any>;
    findUpdates(handle: string): Promise<any>;
    findConfig(firebaseId: string, handle: string): Promise<{
        isAdmin: boolean;
    }>;
    addUpdates(handle: string, addUpdateDto: AddUpdateDto, firebaseId: string): Promise<any>;
    update(handle: string, updateProjectDto: UpdateProjectDto): void;
    remove(id: string): string;
}
