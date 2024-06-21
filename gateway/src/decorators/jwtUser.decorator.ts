import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import type { Request } from 'express'
import JwtPayloadDTO from 'src/modules/users/dtos/JwtPayload.dto'

export const JwtUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>()
    const jwtPayload: JwtPayloadDTO = request['user']
    return jwtPayload.user
  },
)
