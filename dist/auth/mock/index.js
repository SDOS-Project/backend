"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organisationSignUpDto = exports.signupDto = exports.loginDto = exports.sub = exports.mockUser = void 0;
const client_1 = require("@prisma/client");
exports.mockUser = {
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
    organisation: {
        id: '1',
        name: 'Org 1',
        type: client_1.OrganisationType.ACADEMIC,
        imgUrl: 'org1.jpg',
        handle: 'org-1',
    },
};
exports.sub = 'firebaseId';
exports.loginDto = {
    email: '',
    password: '',
};
exports.signupDto = {
    firstName: 'User 1',
    lastName: 'User 1',
    email: 'user@gmail.com',
    password: 'password',
    role: client_1.UserRole.FACULTY,
    organisationHandle: 'org-1',
    areasOfInterest: ['area1', 'area2'],
    firebaseId: 'firebase-id-1',
    imgUrl: 'user1.jpg',
};
exports.organisationSignUpDto = {
    name: 'Org 1',
    email: '',
    password: '',
    type: client_1.OrganisationType.ACADEMIC,
    imgUrl: 'org1.jpg',
    address: 'Address 1',
    ipPolicy: 'ip policy',
    firebaseId: 'firebase-id-1',
};
//# sourceMappingURL=index.js.map