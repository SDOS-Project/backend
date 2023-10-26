"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUpdateDto = exports.mockCreateProjectDto = exports.mockProject = void 0;
const client_1 = require("@prisma/client");
const mock_1 = require("../../organisation/mock");
const mock_2 = require("../../auth/mock");
exports.mockProject = {
    id: 'test-id',
    name: 'Test Project',
    description: 'Test Description',
    creatorHandle: 'test-creator',
    partnerHandle: 'test-partner',
    handle: 'test-project',
    status: client_1.ProjectStatus.ONGOING,
    createdAt: new Date(),
    updatedAt: new Date(),
    updates: [
        {
            id: 'test-id',
            title: 'Test Title',
            content: 'Test Description',
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 'test-user',
            projectId: 'test-project',
            user: mock_2.mockUser,
        },
    ],
    users: mock_1.mockUserArray,
    organisations: mock_1.mockOrganisationArray,
};
exports.mockCreateProjectDto = {
    name: 'Test Project',
    description: 'Test Description',
    creatorHandle: 'test-creator',
    partnerHandle: 'test-partner',
};
exports.createUpdateDto = {
    userHandle: mock_2.mockUser.handle,
    content: 'Test Content',
};
//# sourceMappingURL=index.js.map