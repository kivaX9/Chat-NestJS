import type { Request } from 'express'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import UserDTO from '../users/dtos/User.dto'

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
  getAllMyComments(request: Request) {
    const { id } = request['user'].user as UserDTO
    return this.CommentsUsers.send({ cmd: 'GET_COMMENTS_USER' }, id)
  }

  // Добавить комментарий
  addComment(request: Request, text: string) {
    const { id: userId } = request['user'].user as UserDTO
    return this.CommentsUsers.send({ cmd: 'ADD_COMMENT' }, { userId, text })
  }

  // Изменить комментарий
  updateComment(id: string, text: string, request: Request) {
    const { id: userId, role } = request['user'].user as UserDTO

    return this.CommentsUsers.send(
      { cmd: 'UPDATE_COMMENT' },
      { id, userId, role, text },
    )
  }

  // Удалить комментарий
  deleteComment(id: string, request: Request) {
    const { id: userId, role } = request['user'].user as UserDTO
    return this.CommentsUsers.send(
      { cmd: 'DELETE_COMMENT' },
      { id, userId, role },
    )
  }
}
