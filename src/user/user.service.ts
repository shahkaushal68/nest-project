import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RoleService } from 'src/role/role.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserRoleDto } from './dto/update-userRole.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private roleService: RoleService,
  ) {}

  async create(registerDto: any) {
    const hashPassword = await bcrypt.hash(registerDto.password, 10);

    const clientRole = await this.roleService.clientRole();
    console.log('clientRole', clientRole);

    if(!clientRole) throw new NotFoundException('Client role not found');
    
    const user = await this.userRepository.save({
      ...registerDto,
      password: hashPassword,
      roles: [clientRole],
    });
    // Remove password and trim role fields
  const { password, ...userWithoutPassword } = user;

    const formattedUser = {
      ...userWithoutPassword,
      roles: user.roles.map((role:any) => ({
        id: role.id,
        name: role.name,
      })),
    };

    return formattedUser
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async findByUserId(userId: any) {
    // Check if user exists
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return user;
  }

  async findAll() {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user_profile', 'profile', 'profile.userId = user.id')
      .getRawMany();

    // Remove password and format the result
    const formatted = users.map((user) => {
      const {
        user_password, // raw alias for password
        ...rest
      } = user;

      return {
        ...rest,
      };
    });

    return formatted;
  }

  async updateUserRole(userId: number, roleIds: number[]) {
    // Check if user exists
    const user = await this.userRepository.findOne({ 
      where: { id: userId },
      relations: ['roles'],
    });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Check if roles exist
     // Get all roles by ID
    const roles = await this.roleService.findByIds(roleIds);

    if (roles?.length !== roleIds.length) {
      throw new NotFoundException('One or more roles not found');
    }
    user.roles = roles;
    const updatedUser = await this.userRepository.save(user);
  
    const { password, ...userWithoutPassword } = updatedUser;
  
    const formattedUser = {
      ...userWithoutPassword,
      roles: updatedUser.roles.map((role) => ({
        id: role.id,
        name: role.name,
      })),
    };
  
    return {
      message: 'Roles updated successfully',
      user: formattedUser,
    };
  }


  async deleteUser(userId: number) {  
    // Check if user exists
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(userId);
    return {
      message: 'User deleted successfully',
    };
  }

}
