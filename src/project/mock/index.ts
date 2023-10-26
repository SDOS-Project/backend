import { ProjectStatus } from '@prisma/client';
import { CreateProjectDto } from '../dto/create-project.dto';

export const mockProject = {
  id: 'test-id',
  name: 'Test Project',
  description: 'Test Description',
  creatorHandle: 'test-creator',
  partnerHandle: 'test-partner',
  handle: 'test-project',
  status: ProjectStatus.ONGOING,
  createdAt: new Date(),
  updatedAt: new Date(),
  updates: [
    {
      id: 'test-id',
      title: 'Test Title',
      content: 'Test Description',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'test-user',
      projectId: 'test-project',
    },
  ],
};

export const mockCreateProjectDto: CreateProjectDto = {
  name: 'Test Project',
  description: 'Test Description',
  creatorHandle: 'test-creator',
  partnerHandle: 'test-partner',
};
