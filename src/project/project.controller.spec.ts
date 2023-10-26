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

  describe('findUpdates', () => {
    it('should return an array of updates', async () => {
      const result = mockProject.updates;
      jest.spyOn(service, 'findUpdates').mockResolvedValue(result);

      expect(await controller.findUpdates('test-project')).toBe(result);
    });
  });

  describe('findConfig', () => {
    it('should return a config', async () => {
      const result = { isAdmin: true };
      jest.spyOn(service, 'findConfig').mockResolvedValue(result);

      expect(
        await controller.findConfig(mockUser.firebaseId, mockProject.handle),
      ).toBe(result);
    });
  });

  describe('addUpdate', () => {
    it('should return an update', async () => {
      const result = mockProject.updates[0];
      jest.spyOn(service, 'addUpdate').mockResolvedValue(result);

      expect(
        await controller.addUpdate(
          mockProject.handle,
          { userHandle: mockUser.handle, content: 'Test Content' },
          mockUser.firebaseId,
        ),
      ).toBe(result);
    });
  });

  describe('update', () => {
    it('should return a project', async () => {
      const result = mockProject;
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(
        await controller.update(
          mockUser.firebaseId,
          mockProject.handle,
          mockProject,
        ),
      ).toBe(result);
    });
  });
});
