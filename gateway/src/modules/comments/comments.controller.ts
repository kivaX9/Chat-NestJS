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

import { CommentsService } from './comments.service'
import AddCommentDTO from './dtos/AddComment.dto'

import type { Request } from 'express'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'

@ApiTags('Сomments')
@ApiBearerAuth('access-token')
@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Получить все комментарии пользователя' })
  @Get('all')
  getAllComments(@Req() request: Request) {
    const { user } = request['user']
    return this.commentsService.getAllComments(user.id)
  }

  @ApiOperation({ summary: 'Добавить комментарий' })
  @Post('add')
  @ApiBody({ type: AddCommentDTO, description: 'Comment text' })
  addComment(@Req() request: Request, @Body() comment: AddCommentDTO) {
    const { user } = request['user']
    return this.commentsService.addComment(user.id, comment.text)
  }

  @ApiOperation({ summary: 'Изменить комментарий' })
  @Put('update/:id')
  @ApiParam({ name: 'id', description: 'Comment ID' })
  @ApiBody({ type: AddCommentDTO, description: 'Updated comment text' })
  updateComment(@Param('id') id: string, @Body() comment: AddCommentDTO) {
    return this.commentsService.updateComment(id, comment.text)
  }

  @ApiOperation({ summary: 'Удалить комментарий' })
  @Delete('delete/:id')
  @ApiParam({ name: 'id', description: 'Comment ID' })
  deleteComment(@Param('id') id: string) {
    return this.commentsService.deleteComment(id)
  }
}
