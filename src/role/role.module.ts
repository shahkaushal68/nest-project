import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]), // Assuming Role is the entity you want to use
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService], // Exporting RoleService if you want to use it in other modules
})
export class RoleModule {}
