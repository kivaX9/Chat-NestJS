import { Body, Controller, Get, Post, Req } from '@nestjs/common'

import { UsersService } from './users.service'

import RegisterUserDTO from './dtos/RegisterUser.dto'
import LoginUserDTO from './dtos/LoginUser.dto'

import type { Request } from 'express'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Получить текущего пользователя' })
  @ApiBearerAuth('access-token')
  @Get('current')
  getCurrentUser(@Req() request: Request) {
    const jwtPayload = request['user']
    return this.usersService.getCurrentUser(jwtPayload)
  }

  @ApiOperation({ summary: 'Зарегистрировать пользователя' })
  @Post('register')
  @ApiBody({ type: RegisterUserDTO })
  registerUser(@Body() registerUserDto: RegisterUserDTO) {
    return this.usersService.registerUser(registerUserDto)
  }

  @ApiOperation({ summary: 'Авторизировать пользователя' })
  @Post('login')
  @ApiBody({ type: LoginUserDTO })
  loginUser(@Body() loginUserDto: LoginUserDTO) {
    return this.usersService.loginUser(loginUserDto)
  }
}
