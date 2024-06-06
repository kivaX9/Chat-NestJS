import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class AppService {
  constructor(@Inject('CHAT-USERS') private readonly ChatUsers: ClientProxy) {}

  createString(value: { value: string }) {
    return this.ChatUsers.send({ cmd: 'string' }, value)
  }
}
