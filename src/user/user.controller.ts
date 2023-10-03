import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/faculty')
  findFaculty() {
    return this.userService.findFaculty();
  }

  @Get('/employees')
  findEmployees() {
    return this.userService.findEmployees();
  }

  @Get(':handle')
  findOne(@Param('handle') handle: string) {
    return this.userService.findOne(handle);
  }

  @Get(':handle/projects')
  findProjects(@Param('handle') handle: string) {
    return this.userService.findProjects(handle);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
