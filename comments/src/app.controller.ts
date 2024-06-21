import { Controller } from '@nestjs/common'

import { MessagePattern, Payload } from '@nestjs/microservices'

import { AppService } from './app.service'

import AddCommentDTO from './dtos/AddComment.dto'
import UpdateCommentDTO from './dtos/UpdateComment.dto'
import DeleteCommentDTO from './dtos/DeleteComment.dto'
import { CommentDTO } from './dtos/Comment.dto'
import HttpResponse from './types/HttpResponse'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'GET_COMMENTS_USER' })
  getAllComments(@Payload() userId: string): Promise<CommentDTO[] | Error> {
    return this.appService.getAllComments(userId)
  }

  @MessagePattern({ cmd: 'ADD_COMMENT' })
  addComment(
    @Payload() addCommentDto: AddCommentDTO,
  ): Promise<CommentDTO | Error> {
    return this.appService.addComment(addCommentDto)
  }

  @MessagePattern({ cmd: 'UPDATE_COMMENT' })
  updateComment(
    @Payload() updateCommentDto: UpdateCommentDTO,
  ): Promise<HttpResponse | Error> {
    return this.appService.updateComment(updateCommentDto)
  }

  @MessagePattern({ cmd: 'DELETE_COMMENT' })
  deleteComment(
    @Payload() deleteCommentDto: DeleteCommentDTO,
  ): Promise<HttpResponse | Error> {
    return this.appService.deleteComment(deleteCommentDto)
  }
}
