import { type DynamicModule } from '@nestjs/common'

import { ClientsModule, Transport } from '@nestjs/microservices'

export const UsersMicroservices: DynamicModule = ClientsModule.register([
  {
    name: 'CHAT-USERS',
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001,
    },
  },
])