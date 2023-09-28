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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const utils_1 = require("./utils");
const bcrypt = require("bcrypt");
const saltRounds = 12;
let AuthService = exports.AuthService = class AuthService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async login(sub, loginDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                firebaseId: sub,
                email: loginDto.email,
            },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async signup(signUpDto) {
        try {
            const hash = await bcrypt.hash(signUpDto.password, saltRounds);
            const user = await this.prisma.user.create({
                data: {
                    firstName: signUpDto.firstName,
                    lastName: signUpDto.lastName,
                    email: signUpDto.email,
                    password: hash,
                    role: signUpDto.role,
                    organisation: {
                        connect: {
                            handle: signUpDto.organisationHandle,
                        },
                    },
                    areasOfInterest: signUpDto.areasOfInterest,
                    handle: signUpDto.firstName.toLowerCase() +
                        '-' +
                        signUpDto.lastName.toLowerCase() +
                        '-' +
                        (0, utils_1.default)(5),
                    firebaseId: signUpDto.firebaseId,
                },
            });
            return user;
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.HttpException('A user with similar credentials already exists', common_1.HttpStatus.CONFLICT);
            }
            throw new Error(error);
        }
    }
    async organisationSignup(organisationSignUpDto) {
        try {
            const hash = await bcrypt.hash(organisationSignUpDto.password, saltRounds);
            const organisation = await this.prisma.organisation.create({
                data: {
                    name: organisationSignUpDto.name,
                    email: organisationSignUpDto.email,
                    password: hash,
                    type: organisationSignUpDto.type,
                    logoUrl: organisationSignUpDto.logoUrl,
                    address: organisationSignUpDto.address,
                    ipPolicy: organisationSignUpDto.ipPolicy,
                    handle: organisationSignUpDto.name.toLowerCase() +
                        '-' +
                        (0, utils_1.default)(5),
                    firebaseId: organisationSignUpDto.firebaseId,
                },
            });
            return organisation;
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map