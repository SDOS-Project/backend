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
exports.OrganisationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrganisationService = exports.OrganisationService = class OrganisationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(firebaseId) {
        return await this.prisma.organisation.findMany({
            where: { firebaseId: { not: firebaseId } },
            select: {
                name: true,
                email: true,
                handle: true,
                type: true,
                logoUrl: true,
                address: true,
            },
        });
    }
    async findDropdown() {
        return await this.prisma.organisation.findMany({
            select: {
                name: true,
                handle: true,
            },
        });
    }
    findOne(handle) {
        const organisation = this.prisma.organisation.findUnique({
            where: {
                handle,
            },
        });
        if (!organisation) {
            throw new common_1.HttpException('Organisation not found', common_1.HttpStatus.NOT_FOUND);
        }
        return organisation;
    }
    async findUsers(handle) {
        const organisation = await this.prisma.organisation.findUnique({
            where: {
                handle,
            },
            select: {
                users: {
                    select: {
                        handle: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        });
        if (!organisation) {
            throw new common_1.HttpException('Organisation not found', common_1.HttpStatus.NOT_FOUND);
        }
        return organisation.users;
    }
    async findProjects(handle) {
        const organisation = await this.prisma.organisation.findUnique({
            where: {
                handle,
            },
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
                                logoUrl: true,
                            },
                        },
                    },
                },
            },
        });
        if (!organisation) {
            throw new common_1.HttpException('Organisation not found', common_1.HttpStatus.NOT_FOUND);
        }
        return organisation.projects;
    }
    async update(firebaseId, updateOrganisationDto) {
        const organisation = await this.prisma.organisation.findUnique({
            where: {
                firebaseId,
            },
        });
        if (!organisation) {
            throw new common_1.HttpException('Organisation not found', common_1.HttpStatus.NOT_FOUND);
        }
        return await this.prisma.organisation.update({
            where: {
                firebaseId,
            },
            data: updateOrganisationDto,
            select: {
                name: true,
                email: true,
                handle: true,
                type: true,
                logoUrl: true,
                address: true,
            },
        });
    }
    remove(id) {
        return `This action removes a #${id} organisation`;
    }
};
exports.OrganisationService = OrganisationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrganisationService);
//# sourceMappingURL=organisation.service.js.map