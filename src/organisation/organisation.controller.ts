import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';

@ApiTags('Organisation')
@Controller('organisation')
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @Get()
  findAll(@User('sub') firebaseId: string) {
    return this.organisationService.findAll(firebaseId);
  }

  @Get('/dropdown')
  findDropdown() {
    return this.organisationService.findDropdown();
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

  @Patch()
  update(
    @User('sub') firebaseId: string,
    @Body() updateOrganisationDto: UpdateOrganisationDto,
  ) {
    return this.organisationService.update(firebaseId, updateOrganisationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organisationService.remove(+id);
  }
}
