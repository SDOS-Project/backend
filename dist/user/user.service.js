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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const admin = require("firebase-admin");
let UserService = exports.UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
        this.firebaseAdmin = admin.app();
    }
    findAll() {
        return `This action returns all user`;
    }
    async findRecommendations(firebaseId) {
        const user = await this.prisma.user.findUnique({
            where: {
                firebaseId,
            },
            select: {
                id: true,
                areasOfInterest: true,
            },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return await this.prisma.user.findMany({
            where: {
                id: { not: user.id },
                areasOfInterest: {
                    hasSome: user.areasOfInterest,
                },
            },
            select: {
                firstName: true,
                lastName: true,
                email: true,
                handle: true,
                role: true,
                areasOfInterest: true,
                imgUrl: true,
                organisation: {
                    select: {
                        name: true,
                        handle: true,
                        type: true,
                        imgUrl: true,
                    },
                },
            },
        });
    }
    async findFaculty() {
        try {
            const faculty = await this.prisma.user.findMany({
                where: {
                    role: client_1.UserRole.FACULTY,
                },
            });
            return faculty;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findEmployees() {
        try {
            const employees = await this.prisma.user.findMany({
                where: {
                    role: client_1.UserRole.EMPLOYEE,
                },
            });
            return employees;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(handle) {
        const user = await this.prisma.user.findUnique({
            where: {
                handle,
            },
            select: {
                firstName: true,
                lastName: true,
                email: true,
                handle: true,
                role: true,
                areasOfInterest: true,
                imgUrl: true,
                organisation: {
                    select: {
                        name: true,
                        handle: true,
                        type: true,
                        imgUrl: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async findProjects(handle) {
        const user = await this.prisma.user.findUnique({
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
                                imgUrl: true,
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
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return user.projects;
    }
    async update(firebaseId, updateUserDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                firebaseId,
            },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return await this.prisma.user.update({
            where: {
                firebaseId,
            },
            data: updateUserDto,
            select: {
                firstName: true,
                lastName: true,
                areasOfInterest: true,
            },
        });
    }
    async remove(firebaseId, handle) {
        const user = await this.prisma.user.findUnique({
            where: {
                handle,
            },
            select: {
                firebaseId: true,
                organisation: {
                    select: {
                        firebaseId: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (user.organisation.firebaseId !== firebaseId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            await this.firebaseAdmin.auth().deleteUser(user.firebaseId);
            await this.prisma.user.delete({
                where: {
                    handle,
                },
            });
            return;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map