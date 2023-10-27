import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { mockUser } from '../auth/mock';
import * as admin from 'firebase-admin';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeAll(async () => {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findRecommendations', () => {
    it('should return an array of user objects', async () => {
      jest.spyOn(service, 'findRecommendations').mockResolvedValue([mockUser]);

      expect(await controller.findRecommendations('firebaseId')).toStrictEqual([
        mockUser,
      ]);
    });
  });

  describe('findFaculty', () => {
    it('should return an array of user objects with role FACULTY', async () => {
      jest.spyOn(service, 'findFaculty').mockResolvedValue([mockUser]);

      expect(await controller.findFaculty()).toStrictEqual([mockUser]);
    });
  });

  describe('findEmployees', () => {
    it('should return an array of user objects with role EMPLOYEE', async () => {
      jest.spyOn(service, 'findEmployees').mockResolvedValue([mockUser]);

      expect(await controller.findEmployees()).toStrictEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should return a user object', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockUser);

      expect(await controller.findOne('firebaseId')).toStrictEqual(mockUser);
    });
  });
});
