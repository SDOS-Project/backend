import { Test, TestingModule } from '@nestjs/testing';
import { OrganisationService } from './organisation.service';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { OrganisationController } from './organisation.controller';
import {
  firstMockOrganisation,
  mockOrganisationArray,
  mockProjectArray,
  mockUserArray,
} from './mock';

describe('OrganisationService', () => {
  let service: OrganisationService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganisationController],
      providers: [OrganisationService, PrismaService],
    }).compile();

    service = module.get<OrganisationService>(OrganisationService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await prismaService.$disconnect();
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
