import type { Request } from 'express'
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { UserRoles } from 'src/decorators/userRole.decorator'

import { UserRole } from 'src/types/enums/UserRole.enum'

import UserDTO from 'src/modules/users/dtos/User.dto'

// UserRolesGuard - это guard, который проверяет роль пользователя
// для доступа к текущему запросу

@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Проверка на наличие декоратора UserRoles
    const requiredRoles = this.reflector.get<UserRole[]>(
      UserRoles,
      context.getHandler(),
    )
    if (!requiredRoles) return true

    //  Получение user из запроса
    const request = context.switchToHttp().getRequest<Request>()
    const user: UserDTO = request['user'].user

    // Проверка на соответсвие текущей роли у пользователя
    const isMatchRoles = Boolean(
      requiredRoles.find((role) => user.role == role),
    )

    if (isMatchRoles) {
      return true
    }

    throw new HttpException('У вас нет прав доступа', HttpStatus.FORBIDDEN)
  }
}
