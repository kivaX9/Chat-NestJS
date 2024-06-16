import { applyDecorators, UseGuards } from '@nestjs/common'

import { ApiBearerAuth, ApiOperation, ApiBody, ApiTags } from '@nestjs/swagger'

import { AuthGuard } from 'src/guards/Auth.guard'

import LoginUserDTO from 'src/modules/users/dtos/LoginUser.dto'
import RegisterUserDTO from 'src/modules/users/dtos/RegisterUser.dto'

export function UsersDecorators(summary: string) {
  return applyDecorators(ApiTags(summary))
}

export function UsersCurrentDecorators(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBearerAuth('access-token'),
    UseGuards(AuthGuard),
  )
}

export function UsersRegisterDecorators(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: RegisterUserDTO }),
  )
}

export function UsersLoginDecorators(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: LoginUserDTO }),
  )
}
