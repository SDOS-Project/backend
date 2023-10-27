import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from '@prisma/client';
import * as admin from 'firebase-admin';
import { mockUser } from '../auth/mock';
import { mockUserArray } from '../organisation/mock';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: 'https://<your-project-id>.firebaseio.com',
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

      expect(await service.findRecommendations(mockUser.firebaseId)).toEqual(
        mockUserArray,
      );
    });

    describe('findFaculty', () => {
      it('should return an array of user objects with role FACULTY', async () => {
        jest
          .spyOn(prismaService.user, 'findMany')
          .mockResolvedValue(mockUserArray);

        expect(await service.findFaculty()).toEqual(mockUserArray);
        expect(prismaService.user.findMany).toHaveBeenCalledWith({
          where: {
            role: UserRole.FACULTY,
          },
        });
      });
    });

    describe('findEmployees', () => {
      it('should return an array of user objects with role EMPLOYEE', async () => {
        jest
          .spyOn(prismaService.user, 'findMany')
          .mockResolvedValue(mockUserArray);

        expect(await service.findEmployees()).toEqual(mockUser);
        expect(prismaService.user.findMany).toHaveBeenCalledWith({
          where: {
            role: UserRole.EMPLOYEE,
          },
        });
      });
    });

    describe('findOne', () => {
      it('should return a user object with the given handle', async () => {
        const handle = 'johndoe';
        const expected = { id: 1, name: 'John Doe', handle };
        jest
          .spyOn(prismaService.user, 'findUnique')
          .mockResolvedValue(mockUser);

        const result = await service.findOne(handle);

        expect(result).toEqual(expected);
        expect(prismaService.user.findFirst).toHaveBeenCalledWith({
          where: {
            handle,
          },
        });
      });

      it('should throw an HttpException with status code 404 if user is not found', async () => {
        const handle = 'johndoe';
        jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);

        try {
          await service.findOne(handle);
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException);
          expect(error.status).toBe(HttpStatus.NOT_FOUND);
          expect(error.message).toBe(`User with handle ${handle} not found`);
        }
      });
    });

    describe('findProjects', () => {
      it('should return an array of project objects for the given user handle', async () => {
        const handle = 'johndoe';
        const expected = [
          { id: 1, name: 'Project 1' },
          { id: 2, name: 'Project 2' },
        ];
        jest
          .spyOn(prismaService.user, 'findUnique')
          .mockResolvedValue(mockUser);

        const result = await service.findProjects(handle);

        expect(result).toEqual(expected);
        expect(prismaService.project.findMany).toHaveBeenCalledWith({
          where: {
            users: {
              some: {
                user: {
                  handle,
                },
              },
            },
          },
        });
      });
    });

    describe('update', () => {
      it('should update the user with the given firebaseId and return the updated user object', async () => {
        const firebaseId = '123';
        const updateUserDto: UpdateUserDto = {
          firstName: 'John',
          lastName: 'Doe',
          areasOfInterest: ['Area 1', 'Area 2'],
        };
        const expected = {
          id: 1,
          name: 'John Doe',
          email: 'johndoe@example.com',
        };
        jest.spyOn(prismaService.user, 'update').mockResolvedValue(mockUser);

        const result = await service.update(firebaseId, updateUserDto);

        expect(result).toEqual(expected);
        expect(prismaService.user.update).toHaveBeenCalledWith({
          where: {
            firebaseId,
          },
          data: updateUserDto,
        });
      });
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
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
        expect(error.message).toBe(`User not found`);
      }
    });
  });
});
