import { Reflector } from '@nestjs/core'

import { UserRole } from 'src/types/enums/UserRole.enum'

export const UserRoles = Reflector.createDecorator<UserRole[]>()
