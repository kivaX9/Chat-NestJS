import type { Request } from 'express'
import { Observable } from 'rxjs'
import {
  Controller,
  Param,
  Body,
  Post,
  Get,
  Put,
  Delete,
  Req,
  UseGuards,
  HttpException,
  Query,
} from '@nestjs/common'

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'

import { UserRoles } from 'src/decorators/userRole.decorator'

import { AuthGuard } from 'src/guards/Auth.guard'
import { UserRolesGuard } from 'src/guards/UserRoles.guard'

import { CommentsService } from './comments.service'

import { UserRole } from 'src/types/enums/UserRole.enum'

import AddCommentDTO from './dtos/AddComment.dto'
import CommentDTO from './dtos/Comment.dto'

@ApiTags('Комментарии')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard, UserRolesGuard)
@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Получить все комментарии пользователя' })
  @ApiQuery({
    name: 'userId',
    description: 'Идентификатор пользователя',
    required: false,
  })
  @UserRoles([UserRole.ADMIN], 'args')
  @Get('all')
  getAllComments(
    @Req() request: Request,
    @Query('userId') userId?: string,
  ): Observable<CommentDTO[] | Error> {
    return this.commentsService.getAllComments(request, userId)
  }

  @ApiOperation({ summary: 'Добавить комментарий' })
  @ApiBody({ type: AddCommentDTO, description: 'Текст комментария' })
  @Post('add')
  addComment(
    @Req() request: Request,
    @Body() comment: AddCommentDTO,
  ): Observable<CommentDTO | Error> {
    return this.commentsService.addComment(request, comment.text)
  }

  @ApiOperation({ summary: 'Изменить комментарий' })
  @ApiParam({ name: 'id', description: 'Идентификатор комментария' })
  @ApiBody({ type: AddCommentDTO, description: 'Updated comment text' })
  @Put('update/:id')
  updateComment(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() comment: AddCommentDTO,
  ): Observable<HttpException | Error> {
    return this.commentsService.updateComment(id, comment.text, request)
  }

  @ApiOperation({ summary: 'Удалить комментарий' })
  @ApiParam({ name: 'id', description: 'Идентификатор комментария' })
  @Delete('delete/:id')
  deleteComment(
    @Req() request: Request,
    @Param('id') id: string,
  ): Observable<HttpException | Error> {
    return this.commentsService.deleteComment(id, request)
  }
}
