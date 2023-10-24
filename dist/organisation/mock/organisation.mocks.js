"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockOrganisationArray = exports.firstMockOrganisation = exports.mockProjectArray = exports.mockUserArray = void 0;
const client_1 = require("@prisma/client");
exports.mockUserArray = [
    {
        id: '1',
        firstName: 'User 1',
        lastName: 'User 1',
        email: 'user1@example.com',
        password: 'password',
        role: client_1.UserRole.FACULTY,
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
        role: client_1.UserRole.EMPLOYEE,
        areasOfInterest: ['area3', 'area4'],
        organisationId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        handle: 'user-2',
        firebaseId: 'firebase-id-2',
        imgUrl: 'user2.jpg',
    },
];
exports.mockProjectArray = [
    {
        name: 'Project 1',
        handle: 'project-1',
        users: [],
        description: 'Description 1',
        status: client_1.ProjectStatus.ONGOING,
        organisations: [],
    },
    {
        name: 'Project 2',
        handle: 'project-2',
        users: [],
        description: 'Description 2',
        status: client_1.ProjectStatus.COMPLETED,
        organisations: [],
    },
];
exports.firstMockOrganisation = {
    id: '1',
    name: 'Org 1',
    type: client_1.OrganisationType.ACADEMIC,
    email: 'org1@example.com',
    password: 'password',
    address: '123 Org St',
    imgUrl: 'org1.jpg',
    ipPolicy: 'allow-all',
    handle: 'org-1',
    firebaseId: 'firebase-id-1',
    projects: exports.mockProjectArray,
    users: exports.mockUserArray,
    createdAt: new Date(),
    updatedAt: new Date(),
};
const secondMockOrganisation = {
    id: '2',
    name: 'Org 2',
    type: client_1.OrganisationType.CORPORATE,
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
exports.mockOrganisationArray = [
    exports.firstMockOrganisation,
    secondMockOrganisation,
];
//# sourceMappingURL=organisation.mocks.js.map