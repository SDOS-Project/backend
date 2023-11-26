import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  loginDto,
  mockUser,
  organisationSignUpDto,
  signupDto,
  sub,
} from './mock';
import { mockOrganisationArray } from '../organisation/mock';
import { HttpService } from '@nestjs/axios';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  const mockHttpService = {
    get: jest.fn().mockImplementation(() => {
      return {
        toPromise: jest.fn().mockResolvedValue({ data: {} }),
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        PrismaService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('it should return a user or organisation', async () => {
      jest.spyOn(service, 'login').mockResolvedValue(mockUser);

      expect(await controller.login(sub, loginDto)).toBe(mockUser);
    });
  });

  describe('signup', () => {
    it('it should create and return a user', async () => {
      jest.spyOn(service, 'signup').mockResolvedValue(mockUser);

      expect(await controller.signup(signupDto)).toBe(mockUser);
    });
  });

  describe('organisationSignup', () => {
    it('it should create and return a organisation', async () => {
      jest
        .spyOn(service, 'organisationSignup')
        .mockResolvedValue(mockOrganisationArray[0]);

      expect(await controller.organisationSignup(organisationSignUpDto)).toBe(
        mockOrganisationArray[0],
      );
    });
  });
});
