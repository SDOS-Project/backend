import { mockOrganisationArray } from '../organisation/mock';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { OrganisationType } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';
import { OrganisationSignUpDto } from './dto/organisation.signup.dto';
import {
  loginDto,
  mockUser,
  organisationSignUpDto,
  signupDto,
  sub,
} from './mock';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('it should return a user or organisation', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      expect(await service.login(sub, loginDto)).toBe(mockUser);
    });
    it('it should throw an error if user or organisation not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      try {
        await service.login(sub, loginDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('User not found');
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe('signup', () => {
    it('should throw an error if organisation type is not academic', async () => {
      jest
        .spyOn(prismaService.organisation, 'findUnique')
        .mockResolvedValue(mockOrganisationArray[0]);

      await expect(service.signup(signupDto)).rejects.toThrow(HttpException);
    });

    it('should create and return a user', async () => {
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(mockUser);
    });
  });

  describe('organisationSignup', () => {
    it('should create and return an organisation', async () => {
      jest
        .spyOn(prismaService.organisation, 'create')
        .mockResolvedValue(mockOrganisationArray[0]);

      expect(await service.organisationSignup(organisationSignUpDto)).toBe(
        mockOrganisationArray[0],
      );
    });
  });
});
