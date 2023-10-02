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

  @Post(':handle/updates')
  addUpdates(
    @Param('handle') handle: string,
    @Body() addUpdateDto: AddUpdateDto,
  ) {
    return this.projectService.addUpdate(handle, addUpdateDto);
  }

  @Patch(':id')
  update(
    @Param('id') handle: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(handle, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
