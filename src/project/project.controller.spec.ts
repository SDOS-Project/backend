import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { PrismaService } from '../prisma/prisma.service';
import { mockCreateProjectDto, mockProject } from './mock';
import { mockProjectArray } from '../organisation/mock';
import { mockUser } from '../auth/mock';

describe('ProjectController', () => {
  let controller: ProjectController;
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [ProjectService, PrismaService],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return a project', async () => {
      const result = mockProject;
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(mockCreateProjectDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of projects', async () => {
      const result = mockProjectArray;
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a project', async () => {
      const result = mockProject;
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('test-project')).toBe(result);
    });
  });
});
