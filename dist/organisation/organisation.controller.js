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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganisationController = void 0;
const common_1 = require("@nestjs/common");
const organisation_service_1 = require("./organisation.service");
const update_organisation_dto_1 = require("./dto/update-organisation.dto");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../common/decorators/user.decorator");
let OrganisationController = exports.OrganisationController = class OrganisationController {
    constructor(organisationService) {
        this.organisationService = organisationService;
    }
    findAll(firebaseId) {
        return this.organisationService.findAll(firebaseId);
    }
    findDropdown() {
        return this.organisationService.findDropdown();
    }
    findOne(handle) {
        return this.organisationService.findOne(handle);
    }
    findUsers(handle) {
        return this.organisationService.findUsers(handle);
    }
    findProjects(handle) {
        return this.organisationService.findProjects(handle);
    }
    update(id, updateOrganisationDto) {
        return this.organisationService.update(+id, updateOrganisationDto);
    }
    remove(id) {
        return this.organisationService.remove(+id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.User)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganisationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/dropdown'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrganisationController.prototype, "findDropdown", null);
__decorate([
    (0, common_1.Get)(':handle'),
    __param(0, (0, common_1.Param)('handle')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganisationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':handle/users'),
    __param(0, (0, common_1.Param)('handle')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganisationController.prototype, "findUsers", null);
__decorate([
    (0, common_1.Get)(':handle/projects'),
    __param(0, (0, common_1.Param)('handle')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganisationController.prototype, "findProjects", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_organisation_dto_1.UpdateOrganisationDto]),
    __metadata("design:returntype", void 0)
], OrganisationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganisationController.prototype, "remove", null);
exports.OrganisationController = OrganisationController = __decorate([
    (0, swagger_1.ApiTags)('Organisation'),
    (0, common_1.Controller)('organisation'),
    __metadata("design:paramtypes", [organisation_service_1.OrganisationService])
], OrganisationController);
//# sourceMappingURL=organisation.controller.js.map