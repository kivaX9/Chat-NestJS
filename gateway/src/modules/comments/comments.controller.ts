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

import type { Request } from 'express'

@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('all')
  getAllComments(@Req() request: Request) {
    const { user } = request['user']
    return this.commentsService.getAllComments(user.id)
  }

  @Post('add')
  addComment(@Req() request: Request, @Body() comment: { text: string }) {
    const { user } = request['user']
    return this.commentsService.addComment(user.id, comment.text)
  }

  @Put('update/:id')
  updateComment(@Param('id') id: string, @Body() comment: { text: string }) {
    return this.commentsService.updateComment(id, comment.text)
  }

  @Delete('delete/:id')
  deleteComment(@Param('id') id: string) {
    return this.commentsService.deleteComment(id)
  }
}
