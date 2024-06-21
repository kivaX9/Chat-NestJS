import type { Request } from 'express'
import { Observable } from 'rxjs'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import UserDTO from '../users/dtos/User.dto'
import CommentDTO from './dtos/Comment.dto'
import HttpResponse from 'src/types/HttpResponse'

@Injectable()
export class CommentsService {
  constructor(
    @Inject('CHAT-COMMENTS') private readonly CommentsUsers: ClientProxy,
  ) {}

  // Получить все комментарии пользователя
  getAllComments(
    request: Request,
    userId?: string,
  ): Observable<CommentDTO[] | Error> {
    const { id } = request['user'].user as UserDTO
    return this.CommentsUsers.send({ cmd: 'GET_COMMENTS_USER' }, userId ?? id)
  }

  // Добавить комментарий
  addComment(jwtUser: UserDTO, text: string): Observable<CommentDTO | Error> {
    const { id: userId } = jwtUser
    return this.CommentsUsers.send({ cmd: 'ADD_COMMENT' }, { userId, text })
  }

  // Изменить комментарий
  updateComment(
    id: string,
    text: string,
    jwtUser: UserDTO,
  ): Observable<HttpResponse | Error> {
    const { id: userId, role } = jwtUser

    return this.CommentsUsers.send(
      { cmd: 'UPDATE_COMMENT' },
      { id, userId, role, text },
    )
  }

  // Удалить комментарий
  deleteComment(
    id: string,
    jwtUser: UserDTO,
  ): Observable<HttpResponse | Error> {
    const { id: userId, role } = jwtUser
    return this.CommentsUsers.send(
      { cmd: 'DELETE_COMMENT' },
      { id, userId, role },
    )
  }
}
