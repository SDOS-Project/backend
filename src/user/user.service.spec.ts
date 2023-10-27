import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { mockUser } from '../auth/mock';
import { mockProjectArray, mockUserArray } from '../organisation/mock';
import { mockUpdateUserDto } from './mock';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findRecommendations', () => {
    it('should return an array of user objects', async () => {
      jest
        .spyOn(prismaService.user, 'findMany')
        .mockResolvedValue(mockUserArray);

      try {
        expect(await service.findRecommendations(mockUser.firebaseId)).toEqual(
          mockUserArray,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe('findFaculty', () => {
    it('should return an array of user objects with role FACULTY', async () => {
      jest
        .spyOn(prismaService.user, 'findMany')
        .mockResolvedValue(mockUserArray);

      expect(await service.findFaculty()).toEqual(mockUserArray);
    });
  });

  describe('findEmployees', () => {
    it('should return an array of user objects with role EMPLOYEE', async () => {
      jest
        .spyOn(prismaService.user, 'findMany')
        .mockResolvedValue(mockUserArray);

      expect(await service.findEmployees()).toEqual(mockUserArray);
    });
  });

  describe('findOne', () => {
    it('should return a user object with the given handle', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      expect(await service.findOne(mockUser.handle)).toEqual(mockUser);
    });

    it('should throw an HttpException with status code 404 if user is not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      try {
        await service.findOne(mockUser.handle);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
        expect(error.message).toBe(`User not found`);
      }
    });
  });

  describe('findProjects', () => {
    it('should return an array of project objects for the given user handle', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      try {
        expect(await service.findProjects(mockUser.handle)).toBe(
          mockProjectArray,
        );
      } catch (error) {
        expect(error);
      }
    });

    it('should throw an HttpException with status code 404 if user is not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      try {
        await service.findOne(mockUser.handle);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
        expect(error.message).toBe(`User not found`);
      }
    });
  });

  describe('update', () => {
    it('should update the user with the given firebaseId and return the updated user object', async () => {
      jest.spyOn(prismaService.user, 'update').mockResolvedValue(mockUser);

      try {
        expect(
          await service.update(mockUser.firebaseId, mockUpdateUserDto),
        ).toEqual(mockUser);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });

    it('should throw an HttpException with status code 404 if user is not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      try {
        await service.findOne(mockUser.handle);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
        expect(error.message).toBe(`User not found`);
      }
    });
  });

  describe('remove', () => {
    it('should remove the user with the given firebaseId and handle', async () => {
      jest.spyOn(prismaService.user, 'delete').mockResolvedValue(null);

      try {
        expect(
          await service.remove(mockUser.firebaseId, mockUser.handle),
        ).toBeNull();
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });

    it('should throw an HttpException with status code 404 if user is not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      try {
        await service.findOne(mockUser.handle);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
        expect(error.message).toBe(`User not found`);
      }
    });
  });
});
