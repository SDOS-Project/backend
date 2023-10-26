import { CreateProjectDto } from '../dto/create-project.dto';
export declare const mockProject: {
    id: string;
    name: string;
    description: string;
    creatorHandle: string;
    partnerHandle: string;
    handle: string;
    status: "ONGOING";
    createdAt: Date;
    updatedAt: Date;
    updates: {
        id: string;
        title: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        projectId: string;
    }[];
};
export declare const mockCreateProjectDto: CreateProjectDto;
