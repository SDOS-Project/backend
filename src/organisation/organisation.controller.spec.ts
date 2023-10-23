import { Test, TestingModule } from '@nestjs/testing';
import { OrganisationController } from './organisation.controller';
import { OrganisationService } from './organisation.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  mockOrganisationArray,
  mockProjectArray,
  mockUserArray,
} from './organisation.mocks';

describe('OrganisationController', () => {
  let service: OrganisationService;
  let controller: OrganisationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganisationController],
      providers: [OrganisationService, PrismaService],
    }).compile();

    service = module.get<OrganisationService>(OrganisationService);
    controller = module.get<OrganisationController>(OrganisationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('it should return an array of organisations', async () => {
      jest
        .spyOn(service, `findAll`)
        .mockImplementation(async () => mockOrganisationArray);

      expect(await controller.findAll('firebaseId')).toBe(
        mockOrganisationArray,
      );
    });
  });

  describe('findDropdown', () => {
    it('it should return an array of organisations with only handle and name fields', async () => {
      jest
        .spyOn(service, `findDropdown`)
        .mockImplementation(async () => mockOrganisationArray);

      expect(await controller.findDropdown()).toBe(mockOrganisationArray);
    });
  });

  describe('findOne', () => {
    it('it should return an organisation with the given handle', async () => {
      jest
        .spyOn(service, `findOne`)
        .mockImplementation(async () => mockOrganisationArray[0]);

      expect(await controller.findOne(mockOrganisationArray[0].handle)).toBe(
        mockOrganisationArray[0],
      );
    });
  });

  describe('findUsers', () => {
    it('it should return an array of users for the given organisation', async () => {
      jest
        .spyOn(service, `findUsers`)
        .mockImplementation(async () => mockUserArray);

      expect(await controller.findUsers(mockOrganisationArray[0].handle)).toBe(
        mockUserArray,
      );
    });
  });

  describe('findProjects', () => {
    it('it should return an array of projects for the given organisation', async () => {
      jest
        .spyOn(service, `findProjects`)
        .mockImplementation(async () => mockProjectArray);

      expect(
        await controller.findProjects(mockOrganisationArray[0].handle),
      ).toBe(mockProjectArray);
    });
  });

  describe('update', () => {
    it('it should return an updated organisation', async () => {
      jest
        .spyOn(service, `update`)
        .mockImplementation(async () => mockOrganisationArray[0]);

      expect(
        await controller.update('firebaseId', mockOrganisationArray[0]),
      ).toBe(mockOrganisationArray[0]);
    });
  });
});
