import { Provider } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { CustomThrottlerGuard } from 'src/guards/CustomThrottler.guard'
import { UserRolesGuard } from 'src/guards/UserRoles.guard'
import { AuthGuard } from 'src/guards/Auth.guard'

export const GuardsProviders: Provider[] = [
  AuthGuard,
  UserRolesGuard,
  {
    provide: APP_GUARD,
    useClass: CustomThrottlerGuard,
  },
]
