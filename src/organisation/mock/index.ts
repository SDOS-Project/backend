import {
  Discipline,
  OrganisationType,
  ProjectStatus,
  UserRole,
} from '@prisma/client';

export const mockUserArray = [
  {
    id: '1',
    firstName: 'User 1',
    lastName: 'User 1',
    email: 'user1@example.com',
    password: 'password',
    role: UserRole.FACULTY,
    discipline: Discipline.AerospaceEngineering,
    areasOfInterest: ['area1', 'area2'],
    organisationId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    handle: 'user-1',
    firebaseId: 'firebase-id-1',
    imgUrl: 'user1.jpg',
    socialUrl: 'social-url',
    organisationName: 'Org 1',
  },
  {
    id: '2',
    firstName: 'User 2',
    lastName: 'User 2',
    email: 'user2@example.com',
    password: 'password',
    role: UserRole.EMPLOYEE,
    discipline: Discipline.AutomobileEngineering,
    areasOfInterest: ['area3', 'area4'],
    organisationId: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
    handle: 'user-2',
    firebaseId: 'firebase-id-2',
    imgUrl: 'user2.jpg',
    socialUrl: 'social-url',
    organisationName: 'Org 1',
  },
];

export const mockProjectArray = [
  {
    name: 'Project 1',
    handle: 'project-1',
    users: [],
    description: 'Description 1',
    status: ProjectStatus.ONGOING,
    organisations: [],
  },
  {
    name: 'Project 2',
    handle: 'project-2',
    users: [],
    description: 'Description 2',
    status: ProjectStatus.COMPLETED,
    organisations: [],
  },
];

export const firstMockOrganisation = {
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

export const mockOrganisationArray = [
  firstMockOrganisation,
  secondMockOrganisation,
];
