import { mock } from 'node:test';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { mockUserArray } from 'src/organisation/mock';
import { mockUser } from 'src/auth/mock';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

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

      expect(await controller.findRecommendations('firebaseId')).toBe([
        mockUser,
      ]);
    });
  });

  describe('findFaculty', () => {
    it('should return an array of user objects with role FACULTY', async () => {
      jest.spyOn(service, 'findFaculty').mockResolvedValue([mockUser]);

      expect(await controller.findFaculty()).toBe([mockUser]);
    });
  });
});
