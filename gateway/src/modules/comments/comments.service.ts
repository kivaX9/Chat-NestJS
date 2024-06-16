import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class CommentsService {
  constructor(
    @Inject('CHAT-COMMENTS') private readonly CommentsUsers: ClientProxy,
  ) {}

  // Получить все комментарии выбранного пользователя
  getAllComments(userId: string) {
    return this.CommentsUsers.send({ cmd: 'GET_COMMENTS_ALL' }, userId)
  }

  // Получить все комментарии текущего пользователя
  getAllMyComments(userId: string) {
    return this.CommentsUsers.send({ cmd: 'GET_COMMENTS_USER' }, userId)
  }

  // Добавить комментарий
  addComment(userId: string, text: string) {
    return this.CommentsUsers.send({ cmd: 'ADD_COMMENT' }, { userId, text })
  }

  // Изменить комментарий
  updateComment(id: string, text: string) {
    return this.CommentsUsers.send({ cmd: 'UPDATE_COMMENT' }, { id, text })
  }

  // Удалить комментарий
  deleteComment(id: string) {
    return this.CommentsUsers.send({ cmd: 'DELETE_COMMENT' }, id)
  }
}
