import { applyDecorators, UseGuards } from '@nestjs/common'

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger'

import { UserRoles } from './userRole.decorator'

import { AuthGuard } from 'src/guards/Auth.guard'
import { UserRolesGuard } from 'src/guards/UserRoles.guard'

import { UserRole } from 'src/types/enums/UserRole.enum'

import AddCommentDTO from 'src/modules/comments/dtos/AddComment.dto'

export function CommentsDecorators(summary: string) {
  return applyDecorators(
    ApiTags(summary),
    ApiBearerAuth('access-token'),
    UseGuards(AuthGuard, UserRolesGuard),
  )
}

export function CommentsAllUserIdDecorators(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    UserRoles([UserRole.ADMIN]),
    ApiParam({ name: 'userId', description: 'User ID' }),
  )
}

export function CommentsCurrentDecorators(summary: string) {
  return applyDecorators(ApiOperation({ summary }))
}

export function CommentsAddDecorators(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: AddCommentDTO, description: 'Comment text' }),
  )
}

export function CommentsUpdateDecorators(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiParam({ name: 'id', description: 'Comment ID' }),
    ApiBody({ type: AddCommentDTO, description: 'Updated comment text' }),
  )
}

export function CommentsDeleteDecorators(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiParam({ name: 'id', description: 'Comment ID' }),
  )
}
