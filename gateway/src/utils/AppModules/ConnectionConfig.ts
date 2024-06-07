import { type DynamicModule } from '@nestjs/common'

import { ConfigModule } from '@nestjs/config'

export const ConnectionConfig: DynamicModule = ConfigModule.forRoot({
  isGlobal: true,
})
