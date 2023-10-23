import { Test, TestingModule } from '@nestjs/testing';
import { OrganisationService } from './organisation.service';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { OrganisationType, ProjectStatus, UserRole } from '@prisma/client';
import { OrganisationController } from './organisation.controller';

describe('OrganisationService', () => {
  let service: OrganisationService;
  let prismaService: PrismaService;

  const mockUserArray = [
    {
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
    },
    {
      id: '2',
      firstName: 'User 2',
      lastName: 'User 2',
      email: 'user2@example.com',
      password: 'password',
      role: UserRole.EMPLOYEE,
      areasOfInterest: ['area3', 'area4'],
      organisationId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      handle: 'user-2',
      firebaseId: 'firebase-id-2',
      imgUrl: 'user2.jpg',
    },
  ];

  const mockProjectArray = [
    {
      id: '1',
      name: 'Project 1',
      description: 'Description 1',
      status: ProjectStatus.ONGOING,
      handle: 'project-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Project 2',
      description: 'Description 2',
      status: ProjectStatus.COMPLETED,
      handle: 'project-2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const firstMockOrganisation = {
    id: '1',
    name: 'Org 1',
    type: OrganisationType.ACADEMIC,
    email: 'org1@example.com',
    password: 'password',
    address: '123 Org St',
    imgUrl: 'org1.jpg',
    ipPolicy: 'allow-all',
    handle: 'org-1',
    firebaseId: 'firebase-id-1',
    projects: mockProjectArray,
    users: mockUserArray,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const secondMockOrganisation = {
    id: '2',
    name: 'Org 2',
    type: OrganisationType.CORPORATE,
    email: 'org2@example.com',
    password: 'password',
    address: '456 Corp St',
    imgUrl: 'org2.jpg',
    ipPolicy: 'restrictive',
    handle: 'org-2',
    firebaseId: 'firebase-id-2',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockOrganisationArray = [firstMockOrganisation, secondMockOrganisation];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganisationController],
      providers: [OrganisationService, PrismaService],
    }).compile();

    service = module.get<OrganisationService>(OrganisationService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of organisations', async () => {
      jest
        .spyOn(prismaService.organisation, 'findMany')
        .mockResolvedValue(mockOrganisationArray);

      expect(await service.findAll('firebaseId')).toBe(mockOrganisationArray);
    });
  });

  describe('findDropdown', () => {
    it('should return an array of organisations with only handle and name fields', async () => {
      jest
        .spyOn(prismaService.organisation, 'findMany')
        .mockResolvedValue(mockOrganisationArray);

      expect(await service.findDropdown()).toEqual(mockOrganisationArray);
    });
  });

  describe('findOne', () => {
    it('should return an organisation with the given handle', async () => {
      const handle = firstMockOrganisation.handle;
      jest
        .spyOn(prismaService.organisation, 'findUnique')
        .mockResolvedValue(firstMockOrganisation);

      expect(await service.findOne(handle)).toBe(firstMockOrganisation);
    });

    it('should throw a HttpException with status 404 if organisation is not found', async () => {
      const handle = firstMockOrganisation.handle;
      jest
        .spyOn(prismaService.organisation, 'findUnique')
        .mockResolvedValue(null);

      try {
        await service.findOne(handle);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe(`Organisation not found`);
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe('findUsers', () => {
    it('should return an array of users belonging to the organisation with the given handle', async () => {
      const handle = firstMockOrganisation.handle;
      jest
        .spyOn(prismaService.organisation, 'findUnique')
        .mockResolvedValue(firstMockOrganisation);

      expect(await service.findUsers(handle)).toBe(mockUserArray);
      expect(prismaService.organisation.findUnique).toHaveBeenCalledWith({
        where: { handle },
        select: {
          users: {
            select: {
              handle: true,
              firstName: true,
              lastName: true,
              email: true,
              imgUrl: true,
            },
          },
        },
      });
    });
  });

  describe('findProjects', () => {
    it('should return an array of projects belonging to the organisation with the given handle', async () => {
      const handle = firstMockOrganisation.handle;
      jest
        .spyOn(prismaService.organisation, 'findUnique')
        .mockResolvedValue(firstMockOrganisation);

      expect(await service.findProjects(handle)).toBe(mockProjectArray);
      expect(prismaService.organisation.findUnique).toHaveBeenCalledWith({
        where: { handle },
        select: {
          projects: {
            select: {
              name: true,
              description: true,
              handle: true,
              status: true,
              users: {
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                  handle: true,
                  role: true,
                },
              },
              organisations: {
                select: {
                  name: true,
                  handle: true,
                  type: true,
                  imgUrl: true,
                },
              },
            },
          },
        },
      });
    });
  });

  describe('update', () => {
    it('should update and return the organisation with the given firebaseId and updateOrganisationDto', async () => {
      const firebaseId = firstMockOrganisation.firebaseId;
      const updateOrganisationDto: UpdateOrganisationDto = {
        name: 'New Org Name',
        address: 'New Org Address',
        ipPolicy: 'New Org IP Policy',
      };
      const updatedOrganisation = {
        ...updateOrganisationDto,
        ...firstMockOrganisation,
      };
      jest
        .spyOn(prismaService.organisation, 'update')
        .mockResolvedValue(updatedOrganisation);

      expect(
        await service.update(
          firstMockOrganisation.firebaseId,
          updateOrganisationDto,
        ),
      ).toBe(updatedOrganisation);
      expect(prismaService.organisation.update).toHaveBeenCalledWith({
        where: { firebaseId },
        data: updateOrganisationDto,
        select: {
          name: true,
          email: true,
          handle: true,
          type: true,
          imgUrl: true,
          address: true,
          ipPolicy: true,
        },
      });
    });

    it('should throw a HttpException with status 404 if organisation is not found', async () => {
      const firebaseId = firstMockOrganisation.firebaseId;
      const updateOrganisationDto: UpdateOrganisationDto = {
        name: 'New Org Name',
        address: 'New Org Address',
        ipPolicy: 'New Org IP Policy',
      };
      const updatedOrganisation = {
        ...updateOrganisationDto,
        ...firstMockOrganisation,
      };
      jest.spyOn(prismaService.organisation, 'update').mockResolvedValue(null);

      try {
        await service.update(firebaseId, updatedOrganisation);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe(`Organisation not found`);
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });
});
