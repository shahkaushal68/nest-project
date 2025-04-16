// common/guards/roles.guard.ts
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { ROLES_KEY } from '../decorators/roles.decorator';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
  
      if (!requiredRoles) return true;
  
      const { user } = context.switchToHttp().getRequest();
  
      if (!user?.roles || user.roles.length === 0) {
        throw new ForbiddenException('No roles assigned to this user');
      }
  
      const hasRole = user.roles.some((role: any) =>
        requiredRoles.includes(role.name)
      );
  
      if (!hasRole) {
        throw new ForbiddenException('You do not have permission (Roles)');
      }
  
      return true;
    }
  }
  