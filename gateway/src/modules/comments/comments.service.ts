import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class CommentsService {
  constructor(
    @Inject('CHAT-COMMENTS') private readonly CommentsUsers: ClientProxy,
  ) {}

  getAllComments(userId: string) {
    return this.CommentsUsers.send({ cmd: 'GET_COMMENTS_USER' }, userId)
  }

  addComment(userId: string, text: string) {
    return this.CommentsUsers.send({ cmd: 'ADD_COMMENT' }, { userId, text })
  }

  updateComment(id: string, text: string) {
    return this.CommentsUsers.send({ cmd: 'UPDATE_COMMENT' }, { id, text })
  }

  deleteComment(id: string) {
    return this.CommentsUsers.send({ cmd: 'DELETE_COMMENT' }, id)
  }
}
