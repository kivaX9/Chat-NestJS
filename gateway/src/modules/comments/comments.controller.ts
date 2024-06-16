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
    return this.commentsService.getAllMyComments(request)
  }

  @CommentsAddDecorators('Добавить комментарий')
  @Post('add')
  addComment(@Req() request: Request, @Body() comment: AddCommentDTO) {
    return this.commentsService.addComment(request, comment.text)
  }

  @CommentsUpdateDecorators('Изменить комментарий')
  @Put('update/:id')
  updateComment(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() comment: AddCommentDTO,
  ) {
    return this.commentsService.updateComment(id, comment.text, request)
  }

  @CommentsDeleteDecorators('Удалить комментарий')
  @Delete('delete/:id')
  deleteComment(@Req() request: Request, @Param('id') id: string) {
    return this.commentsService.deleteComment(id, request)
  }
}
