import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { In, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
   constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
   ){}

    async create(createRoleDto: CreateRoleDto) {
      // Check if the role already exists
      const existingRole = await this.findByName(createRoleDto.name);
      if (existingRole) throw new ConflictException('Role already exists');
      const role = await this.roleRepository.save(createRoleDto);
      return role;
    }

    async findAll() {
      const roles = await this.roleRepository.find()
      return roles;
    }

    async findByName(name: string) {
      const role = await this.roleRepository.findOne({ where: { name } });
      return role;
    }

    async clientRole(){
      const role = await this.roleRepository.findOne({ where: { name: 'client' } });
      return role;
    }

    async findByIds(ids: number[]) {
      const roles = await this.roleRepository.find({
        where: { id: In(ids) },
      });
    
      return roles;
    }

}
