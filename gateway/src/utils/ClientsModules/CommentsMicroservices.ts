import { type DynamicModule } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { ClientsModule, Transport } from '@nestjs/microservices'

const configService = new ConfigService()

export const CommentsMicroservice: DynamicModule = ClientsModule.register([
  {
    name: 'CHAT-COMMENTS',
    transport: Transport.TCP,
    options: {
      host: configService.get<string>('COMMENTS_HOST'),
      port: configService.get<number>('COMMENTS_PORT'),
    },
  },
])
