import { ProjectStatus } from '@prisma/client';
import { CreateProjectDto } from '../dto/create-project.dto';
import { mockOrganisationArray, mockUserArray } from '../../organisation/mock';
import { mockUser } from '../../auth/mock';
import { AddUpdateDto } from '../dto/add-update.dto';

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
      user: mockUser,
    },
  ],
  users: mockUserArray,
  organisations: mockOrganisationArray,
};

export const mockCreateProjectDto: CreateProjectDto = {
  name: 'Test Project',
  description: 'Test Description',
  creatorHandle: 'test-creator',
  partnerHandle: 'test-partner',
};

export const createUpdateDto: AddUpdateDto = {
  userHandle: mockUser.handle,
  content: 'Test Content',
};
