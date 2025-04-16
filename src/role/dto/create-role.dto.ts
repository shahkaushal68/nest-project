import { IsEnum, IsNotEmpty } from 'class-validator';
import { RoleEnum } from '../enum/role.enum';

export class CreateRoleDto {
  @IsEnum(RoleEnum, {
    message:
      'Role name must be one of the following: Admin, ProjectManager, TeamLeader, Member, Client',
  })
  @IsNotEmpty({ message: 'Role name is required' })
  name: RoleEnum;
}
