import { CustomDecorator, SetMetadata } from '@nestjs/common'

import { UserRole } from 'src/types/enums/UserRole.enum'

export const UserRoles = (
  roles: UserRole[] = [],
  mode: 'args' | 'default' = 'default',
): CustomDecorator => SetMetadata('roles', { roles, mode })
