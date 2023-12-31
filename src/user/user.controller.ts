import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../common/decorators/user.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/recommended')
  findRecommendations(@User('sub') firebaseId: string) {
    return this.userService.findRecommendations(firebaseId);
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

  @Patch()
  update(
    @User('sub') firebaseId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(firebaseId, updateUserDto);
  }

  @Delete(':handle')
  remove(@User('sub') firebaseId: string, @Param('handle') handle: string) {
    return this.userService.remove(firebaseId, handle);
  }
}
