import type { Request } from 'express'
import {
  Controller,
  Param,
  Body,
  Post,
  Get,
  Put,
  Delete,
  Req,
} from '@nestjs/common'

import {
  CommentsAddDecorators,
  CommentsAllUserIdDecorators,
  CommentsCurrentDecorators,
  CommentsDecorators,
  CommentsDeleteDecorators,
  CommentsUpdateDecorators,
} from 'src/decorators/comments.decorator'

import { CommentsService } from './comments.service'
import AddCommentDTO from './dtos/AddComment.dto'

@CommentsDecorators('Комментарии')
@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @CommentsAllUserIdDecorators(
    'Получить все комментарии выбранного пользователя',
  )
  @Get('all/:userId')
  getAllUserComments(@Param('userId') userId: string) {
    return this.commentsService.getAllComments(userId)
  }

  @CommentsCurrentDecorators('Получить все комментарии текущего пользователя')
  @Get('current')
  getAllMyComments(@Req() request: Request) {
    const { user } = request['user']
    return this.commentsService.getAllMyComments(user.id)
  }

  @CommentsAddDecorators('Добавить комментарий')
  @Post('add')
  addComment(@Req() request: Request, @Body() comment: AddCommentDTO) {
    const { user } = request['user']
    return this.commentsService.addComment(user.id, comment.text)
  }

  @CommentsUpdateDecorators('Изменить комментарий')
  @Put('update/:id')
  updateComment(@Param('id') id: string, @Body() comment: AddCommentDTO) {
    return this.commentsService.updateComment(id, comment.text)
  }

  @CommentsDeleteDecorators('Удалить комментарий')
  @Delete('delete/:id')
  deleteComment(@Param('id') id: string) {
    console.log(id)
    return this.commentsService.deleteComment(id)
  }
}
