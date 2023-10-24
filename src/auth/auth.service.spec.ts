import { mockOrganisationArray } from './../organisation/organisation.mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { OrganisationType, UserRole } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { OrganisationSignUpDto } from './dto/organisation.signup.dto';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;

  const mockUser = {
    id: '1',
    firstName: 'User 1',
    lastName: 'User 1',
    email: 'user1@example.com',
    password: 'password',
    role: UserRole.FACULTY,
    areasOfInterest: ['area1', 'area2'],
    organisationId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    handle: 'user-1',
    firebaseId: 'firebase-id-1',
    imgUrl: 'user1.jpg',
    organisation: {
      id: '1',
      name: 'Org 1',
      type: OrganisationType.ACADEMIC,
      imgUrl: 'org1.jpg',
      handle: 'org-1',
    },
  };

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
    const sub = 'firebaseId';
    const loginDto: LoginDto = {
      email: '',
      password: '',
    };
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
    const signupDto: SignUpDto = {
      firstName: 'User 1',
      lastName: 'User 1',
      email: 'user@gmail.com',
      password: 'password',
      role: UserRole.FACULTY,
      organisationHandle: 'org-1',
      areasOfInterest: ['area1', 'area2'],
      firebaseId: 'firebase-id-1',
      imgUrl: 'user1.jpg',
    };

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
    const organisationSignUpDto: OrganisationSignUpDto = {
      name: 'Org 1',
      email: '',
      password: '',
      type: OrganisationType.ACADEMIC,
      imgUrl: 'org1.jpg',
      address: 'Address 1',
      ipPolicy: 'ip policy',
      firebaseId: 'firebase-id-1',
    };

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
