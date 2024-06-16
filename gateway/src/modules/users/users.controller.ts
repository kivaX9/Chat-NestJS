import type { Request } from 'express'
import { Body, Controller, Get, Post, Req } from '@nestjs/common'

import { UsersService } from './users.service'

import {
  UsersCurrentDecorators,
  UsersDecorators,
  UsersLoginDecorators,
  UsersRegisterDecorators,
} from 'src/decorators/users.decorator'

import RegisterUserDTO from './dtos/RegisterUser.dto'
import LoginUserDTO from './dtos/LoginUser.dto'

@UsersDecorators('Пользователи')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsersCurrentDecorators('Получить текущего пользователя')
  @Get('current')
  getCurrentUser(@Req() request: Request) {
    const jwtPayload = request['user']
    return this.usersService.getCurrentUser(jwtPayload)
  }

  @UsersRegisterDecorators('Зарегистрировать пользователя')
  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDTO) {
    return this.usersService.registerUser(registerUserDto)
  }

  @UsersLoginDecorators('Авторизировать пользователя')
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDTO) {
    return this.usersService.loginUser(loginUserDto)
  }
}
