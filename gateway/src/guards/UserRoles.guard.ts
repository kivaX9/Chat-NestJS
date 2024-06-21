import type { Request } from 'express'
import { ParsedQs } from 'qs'
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { UserRole } from 'src/types/enums/UserRole.enum'

import UserDTO from 'src/modules/users/dtos/User.dto'

// UserRolesGuard - это guard, который проверяет роль пользователя
// для доступа к текущему запросу, по умолчанию стоит мод default
// Мод "args" сначала проверяет передали параметр или нет, а потом роль
// Мод "default" проверят только роль

@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesMeta = this.reflector.get<{
      roles: UserRole[]
      mode: 'args' | 'default'
    }>('roles', context.getHandler())

    // Если роли не переданы, то проверка не требуется
    if (!rolesMeta) return true

    const { roles, mode } = rolesMeta

    //  Получение user из запроса
    const request = context.switchToHttp().getRequest<Request>()
    const user: UserDTO = request['user'].user

    // Получение параметров
    const params = request.params
    const query = request.query
    const hasArgs =
      Object.keys(params).some((key) => params[key] !== undefined) ||
      Object.keys(query).some((key) => query[key] !== undefined)

    // Проверка на соответствие роли у пользователя и userId
    const isMatchRoles = (
      userId?: string | ParsedQs | string[] | ParsedQs[],
    ): boolean => {
      const isAccessRole = Boolean(roles.find((role) => user.role == role))

      if (userId === user.id) {
        return true
      }

      if (isAccessRole) {
        return true
      } else
        throw new HttpException('У вас нет прав доступа', HttpStatus.FORBIDDEN)
    }

    // Проверка на мод, роль и userId
    if (mode === 'args') {
      return hasArgs ? isMatchRoles(query['userId']) : true
    }
    return isMatchRoles()
  }
}
