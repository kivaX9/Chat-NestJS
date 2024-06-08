import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class CommentsService {
  constructor(
    @Inject('CHAT-COMMENTS') private readonly CommentsUsers: ClientProxy,
  ) {}
}
