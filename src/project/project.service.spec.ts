import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectStatus } from '@prisma/client';
import { CreateProjectDto } from './dto/create-project.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { mockUserArray } from '../organisation/mock';
import { mockUser } from '../auth/mock';

describe('ProjectService', () => {
  let service: ProjectService;
  let prismaService: PrismaService;

  const mockProject = {
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectService, PrismaService],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of projects', async () => {
      const result = [mockProject];
      jest.spyOn(prismaService.project, 'findMany').mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a project', async () => {
      const result = mockProject;
      jest.spyOn(prismaService.project, 'findUnique').mockResolvedValue(result);

      expect(await service.findOne('test-project')).toBe(result);
    });
  });
});
