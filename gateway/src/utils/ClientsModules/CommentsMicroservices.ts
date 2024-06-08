import { type DynamicModule } from '@nestjs/common'

import { ClientsModule, Transport } from '@nestjs/microservices'

export const CommentsMicroservice: DynamicModule = ClientsModule.register([
  {
    name: 'CHAT-COMMENTS',
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3002,
    },
  },
])
