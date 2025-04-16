import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UpdateUserRoleDto } from './dto/update-userRole.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('user')
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles('Admin', 'ProjectManager')
  findAll() {
    return this.userService.findAll();
  }

  //update role of based on userID
  @Patch(':userId/role')
  async updateUserRole(
    @Param('userId') userId: number,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) { 
    return this.userService.updateUserRole(userId, updateUserRoleDto.roleIds);
  }

  //Delete the user
  @Delete(':userId')
  @Roles('Admin')
  async deleteUser(@Param('userId') userId: number) {
    return this.userService.deleteUser(userId);
  }


}
