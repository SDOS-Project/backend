"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const utils_1 = require("../auth/utils");
let ProjectService = exports.ProjectService = class ProjectService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProjectDto) {
        try {
            const creator = await this.prisma.user.findUnique({
                where: {
                    handle: createProjectDto.creatorHandle,
                },
            });
            const partner = await this.prisma.user.findUnique({
                where: {
                    handle: createProjectDto.partnerHandle,
                },
            });
            if (!partner)
                throw new common_1.HttpException('Partner not found', common_1.HttpStatus.NOT_FOUND);
            const project = await this.prisma.project.create({
                data: {
                    name: createProjectDto.name,
                    description: createProjectDto.description,
                    handle: createProjectDto.name.split(' ').join('-').toLowerCase() +
                        '-' +
                        (0, utils_1.default)(5),
                    users: {
                        connect: [
                            {
                                id: creator.id,
                            },
                            {
                                id: partner.id,
                            },
                        ],
                    },
                    organisations: {
                        connect: [
                            {
                                id: creator.organisationId,
                            },
                            {
                                id: partner.organisationId,
                            },
                        ],
                    },
                },
            });
            return { handle: project.handle };
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        try {
            return await this.prisma.project.findMany();
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(handle) {
        const project = await this.prisma.project.findUnique({
            where: {
                handle,
            },
        });
        if (!project)
            throw new common_1.HttpException('Project not found', common_1.HttpStatus.NOT_FOUND);
        return project;
    }
    async getUpdates(handle) {
        const updates = await this.prisma.project.findUnique({
            where: {
                handle,
            },
            select: {
                updates: true,
            },
        });
        if (!updates)
            throw new common_1.HttpException('Updates not found', common_1.HttpStatus.NOT_FOUND);
        return updates;
    }
    update(id, updateProjectDto) {
        return `This action updates a #${id} project`;
    }
    remove(id) {
        return `This action removes a #${id} project`;
    }
};
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectService);
//# sourceMappingURL=project.service.js.map