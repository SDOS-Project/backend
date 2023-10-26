import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags } from '@nestjs/swagger';
import { AddUpdateDto } from './dto/add-update.dto';
import { User } from '../common/decorators/user.decorator';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':handle')
  findOne(@Param('handle') handle: string) {
    return this.projectService.findOne(handle);
  }

  @Get(':handle/updates')
  findUpdates(@Param('handle') handle: string) {
    return this.projectService.findUpdates(handle);
  }

  @Get(':handle/config')
  findConfig(@User('sub') firebaseId: string, @Param('handle') handle: string) {
    return this.projectService.findConfig(firebaseId, handle);
  }

  @Post(':handle/updates')
  addUpdates(
    @Param('handle') handle: string,
    @Body() addUpdateDto: AddUpdateDto,
    @User('sub') firebaseId: string,
  ) {
    return this.projectService.addUpdate(handle, addUpdateDto, firebaseId);
  }

  @Patch(':handle')
  update(
    @User('sub') firebaseId: string,
    @Param('handle') handle: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(firebaseId, handle, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
