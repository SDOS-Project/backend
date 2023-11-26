import { firstMockOrganisation } from './../organisation/mock/index';
import { mockOrganisationArray } from '../organisation/mock';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException } from '@nestjs/common';
import {
  loginDto,
  mockUser,
  organisationSignUpDto,
  signupDto,
  sub,
} from './mock';
import { HttpService } from '@nestjs/axios';
import { OrganisationType, UserRole } from '@prisma/client';
import { SignUpDto } from './dto/signup.dto';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;
  const mockHttpService = {
    get: jest.fn((url) => {
      if (
        url.startsWith('https://company.clearbit.com/v2/companies/find?domain=')
      ) {
        return Promise.resolve({
          status: 200,
          data: { name: 'Mocked Company Name' },
        });
      }
      return Promise.resolve({ status: 404, data: {} });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PrismaService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    service = module.get<AuthService>(AuthService);
  });

  afterEach(async () => {
    await prismaService.$disconnect();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('it should return a user', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);
      jest
        .spyOn(prismaService.organisation, 'findUnique')
        .mockResolvedValue(null);

      expect(await service.login(sub, loginDto)).toBe(mockUser);
    });

    it('it should return an organisation', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
      jest
        .spyOn(prismaService.organisation, 'findUnique')
        .mockResolvedValue(mockOrganisationArray[0]);

      expect(await service.login(sub, loginDto)).toBe(mockOrganisationArray[0]);
    });

    it('it should throw an error if user or organisation not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
      jest
        .spyOn(prismaService.organisation, 'findUnique')
        .mockResolvedValue(null);

      await expect(service.login(sub, loginDto)).rejects.toThrow(HttpException);
    });
  });

  describe('signup', () => {
    it('should throw an error for student role', async () => {
      const studentDto = { ...signupDto, role: UserRole.STUDENT };
      await expect(service.signup(studentDto)).rejects.toThrow(HttpException);
    });

    it('should throw an error if organisation type is not academic for faculty', async () => {
      const facultyDto: SignUpDto = {
        ...signupDto,
        role: UserRole.FACULTY,
        organisationHandle: mockOrganisationArray[1].handle,
      };
      jest
        .spyOn(prismaService.organisation, 'findUnique')
        .mockResolvedValue(mockOrganisationArray[1]);

      await expect(service.signup(facultyDto)).rejects.toThrow(HttpException);
    });

    it('should create and return a user', async () => {
      const validOrganisation = {
        ...firstMockOrganisation,
        type: OrganisationType.ACADEMIC,
      };

      jest
        .spyOn(prismaService.organisation, 'findUnique')
        .mockResolvedValue(validOrganisation);
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(mockUser);

      expect(await service.signup(signupDto)).toBe(mockUser);

      expect(prismaService.organisation.findUnique).toHaveBeenCalledWith({
        where: { handle: signupDto.organisationHandle },
        select: { type: true },
      });
      expect(prismaService.user.create).toHaveBeenCalled();
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

    it('should throw an error if organisation creation fails', async () => {
      jest
        .spyOn(prismaService.organisation, 'create')
        .mockRejectedValue(new Error('Creation failed'));

      await expect(
        service.organisationSignup(organisationSignUpDto),
      ).rejects.toThrow(HttpException);
    });
  });
});
