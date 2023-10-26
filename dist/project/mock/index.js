"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockCreateProjectDto = exports.mockProject = void 0;
const client_1 = require("@prisma/client");
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
        },
    ],
};
exports.mockCreateProjectDto = {
    name: 'Test Project',
    description: 'Test Description',
    creatorHandle: 'test-creator',
    partnerHandle: 'test-partner',
};
//# sourceMappingURL=index.js.map