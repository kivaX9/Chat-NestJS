import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { AppService } from './app.service'

import AddCommentDTO from './dtos/AddComment.dto'
import UpdateCommentDTO from './dtos/UpdateComment.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'GET_COMMENTS_USER' })
  getAllComments(@Payload() userId: number) {
    return this.appService.getAllComments(userId)
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
  deleteComment(@Payload() id: number) {
    return this.appService.deleteComment(id)
  }
}
