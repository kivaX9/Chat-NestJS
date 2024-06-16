import { Controller } from '@nestjs/common'

import { MessagePattern, Payload } from '@nestjs/microservices'

import { AppService } from './app.service'

import AddCommentDTO from './dtos/AddComment.dto'
import UpdateCommentDTO from './dtos/UpdateComment.dto'
import DeleteCommentDTO from './dtos/DeleteComment.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'GET_COMMENTS_ALL' })
  getAllComments(@Payload() userId: string) {
    return this.appService.getAllComments(userId)
  }

  @MessagePattern({ cmd: 'GET_COMMENTS_USER' })
  getAllMyComments(@Payload() userId: string) {
    return this.appService.getAllMyComments(userId)
  }

  @MessagePattern({ cmd: 'ADD_COMMENT' })
  addComment(@Payload() addCommentDto: AddCommentDTO) {
    return this.appService.addComment(addCommentDto)
  }

  @MessagePattern({ cmd: 'UPDATE_COMMENT' })
  updateComment(@Payload() updateCommentDto: UpdateCommentDTO) {
    return this.appService.updateComment(updateCommentDto)
  }

  @MessagePattern({ cmd: 'DELETE_COMMENT' })
  deleteComment(@Payload() deleteCommentDto: DeleteCommentDTO) {
    return this.appService.deleteComment(deleteCommentDto)
  }
}
