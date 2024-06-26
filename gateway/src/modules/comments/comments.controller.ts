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
import { JwtUser } from 'src/decorators/jwtUser.decorator'

import { AuthGuard } from 'src/guards/Auth.guard'
import { UserRolesGuard } from 'src/guards/UserRoles.guard'

import { CommentsService } from './comments.service'

import { UserRole } from 'src/types/enums/UserRole.enum'

import AddCommentDTO from './dtos/AddComment.dto'
import CommentDTO from './dtos/Comment.dto'
import HttpResponse from 'src/types/HttpResponse'
import UpdateCommentDTO from './dtos/UpdateComment.dto'
import UserDTO from '../users/dtos/User.dto'

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
  @ApiBody({ type: AddCommentDTO, description: 'Добавление комментария' })
  @Post('add')
  addComment(
    @JwtUser() jwtUser: UserDTO,
    @Body() comment: AddCommentDTO,
  ): Observable<CommentDTO | Error> {
    return this.commentsService.addComment(jwtUser, comment.text)
  }

  @ApiOperation({ summary: 'Изменить комментарий' })
  @ApiBody({ type: UpdateCommentDTO, description: 'Обновление комментария' })
  @ApiParam({ name: 'id', description: 'Идентификатор комментария' })
  @Put('update/:id')
  updateComment(
    @JwtUser() jwtUser: UserDTO,
    @Param('id') id: string,
    @Body() comment: UpdateCommentDTO,
  ): Observable<HttpResponse | Error> {
    return this.commentsService.updateComment(id, comment.text, jwtUser)
  }

  @ApiOperation({ summary: 'Удалить комментарий' })
  @ApiParam({ name: 'id', description: 'Идентификатор комментария' })
  @Delete('delete/:id')
  deleteComment(
    @JwtUser() jwtUser: UserDTO,
    @Param('id') id: string,
  ): Observable<HttpResponse | Error> {
    return this.commentsService.deleteComment(id, jwtUser)
  }
}
