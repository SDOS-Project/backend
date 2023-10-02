import { ProjectStatus } from '@prisma/client';
declare class UpdateDto {
    content: string;
}
export declare class UpdateProjectDto {
    name: string;
    description: string;
    status: ProjectStatus;
    update: UpdateDto;
}
export {};
