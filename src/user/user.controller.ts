import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/common/decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/config')
  getConfig(@User('sub') firebaseId: string) {
    return this.userService.getConfig(firebaseId);
  }

  @Get('/faculty')
  getFaculty() {
    return this.userService.getFaculty();
  }

  @Get('/employees')
  getEmployees() {
    return this.userService.getEmployees();
  }

  @Get(':handle')
  findOne(@Param('handle') handle: string) {
    return this.userService.findOne(handle);
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
