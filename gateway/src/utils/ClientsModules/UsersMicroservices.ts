import { type DynamicModule } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { ClientsModule, Transport } from '@nestjs/microservices'

const configService = new ConfigService()

export const UsersMicroservice: DynamicModule = ClientsModule.register([
  {
    name: 'CHAT-USERS',
    transport: Transport.TCP,
    options: {
      host: configService.get<string>('USERS_HOST') ?? 'localhost',
      port: configService.get<number>('USERS_PORT') ?? 3001,
    },
  },
])
