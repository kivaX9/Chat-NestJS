import { type DynamicModule } from '@nestjs/common'

import { ThrottlerModule } from '@nestjs/throttler'

export const ConnectionThrottler: DynamicModule = ThrottlerModule.forRoot([
  {
    ttl: 60000,
    limit: 15,
  },
])
