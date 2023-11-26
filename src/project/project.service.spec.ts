import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { mockProjectArray, mockUserArray } from '../organisation/mock';
import { mockUser } from '../auth/mock';
import { createUpdateDto, mockCreateProjectDto, mockProject } from './mock';

describe('ProjectService', () => {
  let service: ProjectService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectService, PrismaService],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await prismaService.$disconnect();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a project', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValueOnce(mockUserArray[0]);
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValueOnce(mockUserArray[1]);
      jest
        .spyOn(prismaService.project, 'create')
        .mockResolvedValueOnce(mockProject);

      const result = await service.create(mockCreateProjectDto);
      expect(result).toEqual({ handle: mockProject.handle });
      expect(prismaService.project.create).toHaveBeenCalledWith(
        expect.anything(),
      );
    });

    it('should throw an error if creator not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(null);

      await expect(service.create(mockCreateProjectDto)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of projects', async () => {
      jest
        .spyOn(prismaService.project, 'findMany')
        .mockResolvedValue([mockProject]);

      const result = await service.findAll();
      expect(result).toEqual([mockProject]);
    });
  });

  describe('findOne', () => {
    it('should return a project', async () => {
      jest
        .spyOn(prismaService.project, 'findUnique')
        .mockResolvedValue(mockProject);

      const result = await service.findOne(mockProject.handle);
      expect(result).toEqual(mockProject);
    });

    it('should throw an error if project not found', async () => {
      jest.spyOn(prismaService.project, 'findUnique').mockResolvedValue(null);

      await expect(service.findOne(mockProject.handle)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('findUpdates', () => {
    it('should return an array of updates', async () => {
      const result = mockProject.updates;
      jest
        .spyOn(prismaService.project, 'findUnique')
        .mockResolvedValue(mockProject);

      expect(await service.findUpdates(mockProject.handle)).toBe(result);
    });
    it('should throw an error if project not found', async () => {
      jest.spyOn(prismaService.project, 'findUnique').mockResolvedValue(null);

      try {
        expect(await service.findUpdates('test-project')).toBe(null);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('Project not found');
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe('findConfig', () => {
    it('should return a config object', async () => {
      const result = {
        name: mockProject.name,
        description: mockProject.description,
        status: mockProject.status,
        users: mockUserArray,
        organisations: [],
      };

      jest
        .spyOn(prismaService.project, 'findUnique')
        .mockResolvedValue(mockProject);
      try {
        expect(
          await service.findConfig(mockUser.id, mockProject.handle),
        ).toStrictEqual(result);
      } catch (error) {}
    });
    it('should return true if user is an admin', async () => {
      jest
        .spyOn(prismaService.project, 'findUnique')
        .mockResolvedValue(mockProject);

      try {
        expect(
          await service.checkIfUserIsAdmin(
            mockUser.firebaseId,
            mockProject.handle,
          ),
        ).toBe(true);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
    it('should return false if user is not an admin', async () => {
      jest
        .spyOn(prismaService.project, 'findUnique')
        .mockResolvedValue(mockProject);

      try {
        expect(
          await service.checkIfUserIsAdmin(
            mockUser.firebaseId,
            mockProject.handle,
          ),
        ).toBe(false);
      } catch (error) {
        expect(error);
      }
    });
    it('should throw an error if project not found', async () => {
      jest.spyOn(prismaService.project, 'findUnique').mockResolvedValue(null);

      try {
        expect(await service.findUpdates('test-project')).toBe(null);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('Project not found');
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe('update', () => {
    it('should return true if user is an admin', async () => {
      jest
        .spyOn(prismaService.project, 'findUnique')
        .mockResolvedValue(mockProject);

      try {
        expect(
          await service.checkIfUserIsAdmin(
            mockUser.firebaseId,
            mockProject.handle,
          ),
        ).toBe(true);
      } catch (error) {
        expect(error);
      }
    });
    it('should return false if user is not an admin', async () => {
      jest
        .spyOn(prismaService.project, 'findUnique')
        .mockResolvedValue(mockProject);

      try {
        expect(
          await service.checkIfUserIsAdmin(
            mockUser.firebaseId,
            mockProject.handle,
          ),
        ).toBe(false);
      } catch (error) {
        expect(error);
      }
    });
    it('should throw an error if project not found', async () => {
      jest.spyOn(prismaService.project, 'findUnique').mockResolvedValue(null);

      try {
        expect(await service.findUpdates('test-project')).toBe(null);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('Project not found');
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
      }
    });
    it('should update and return a project', async () => {
      const result = mockProject;
      jest
        .spyOn(prismaService.project, 'findUnique')
        .mockResolvedValue(mockProject);
      jest.spyOn(prismaService.project, 'update').mockResolvedValue(result);
      try {
        expect(
          await service.update(
            mockUser.firebaseId,
            mockProject.handle,
            mockProject,
          ),
        ).toBe(result);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });
  });

  describe('addUpdate', () => {
    it('should return an update', async () => {
      const result = mockProject.updates[0];
      jest
        .spyOn(prismaService.project, 'findUnique')
        .mockResolvedValue(mockProject);
      jest
        .spyOn(prismaService.update, 'create')
        .mockResolvedValue(mockProject.updates[0]);
      try {
        expect(
          await service.addUpdate(
            mockUser.id,
            mockProject.handle,
            createUpdateDto,
          ),
        ).toBe(result);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
    it('should throw an error if project not found', async () => {
      jest.spyOn(prismaService.project, 'findUnique').mockResolvedValue(null);

      try {
        expect(await service.findUpdates('test-project')).toBe(null);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('Project not found');
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });
});
