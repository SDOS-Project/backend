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
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const project_service_1 = require("./project.service");
const create_project_dto_1 = require("./dto/create-project.dto");
const update_project_dto_1 = require("./dto/update-project.dto");
const swagger_1 = require("@nestjs/swagger");
const add_update_dto_1 = require("./dto/add-update.dto");
const user_decorator_1 = require("../common/decorators/user.decorator");
let ProjectController = exports.ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    create(createProjectDto) {
        return this.projectService.create(createProjectDto);
    }
    findAll() {
        return this.projectService.findAll();
    }
    findOne(handle) {
        return this.projectService.findOne(handle);
    }
    findUpdates(handle) {
        return this.projectService.findUpdates(handle);
    }
    findConfig(firebaseId, handle) {
        return this.projectService.findConfig(firebaseId, handle);
    }
    addUpdates(handle, addUpdateDto, firebaseId) {
        return this.projectService.addUpdate(handle, addUpdateDto, firebaseId);
    }
    update(firebaseId, handle, updateProjectDto) {
        return this.projectService.update(firebaseId, handle, updateProjectDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':handle'),
    __param(0, (0, common_1.Param)('handle')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':handle/updates'),
    __param(0, (0, common_1.Param)('handle')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findUpdates", null);
__decorate([
    (0, common_1.Get)(':handle/config'),
    __param(0, (0, user_decorator_1.User)('sub')),
    __param(1, (0, common_1.Param)('handle')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findConfig", null);
__decorate([
    (0, common_1.Post)(':handle/updates'),
    __param(0, (0, common_1.Param)('handle')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.User)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_update_dto_1.AddUpdateDto, String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "addUpdates", null);
__decorate([
    (0, common_1.Patch)(':handle'),
    __param(0, (0, user_decorator_1.User)('sub')),
    __param(1, (0, common_1.Param)('handle')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_project_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "update", null);
exports.ProjectController = ProjectController = __decorate([
    (0, swagger_1.ApiTags)('Project'),
    (0, common_1.Controller)('project'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
//# sourceMappingURL=project.controller.js.map