import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Organisation')
@Controller('organisation')
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @Get()
  findAll() {
    return this.organisationService.findAll();
  }

  @Get(':handle')
  findOne(@Param('handle') handle: string) {
    return this.organisationService.findOne(handle);
  }

  @Get(':handle/users')
  findUsers(@Param('handle') handle: string) {
    return this.organisationService.findUsers(handle);
  }

  @Get(':handle/projects')
  findProjects(@Param('handle') handle: string) {
    return this.organisationService.findProjects(handle);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganisationDto: UpdateOrganisationDto,
  ) {
    return this.organisationService.update(+id, updateOrganisationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organisationService.remove(+id);
  }
}
