import { Observable } from 'rxjs'
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'

import { UsersService } from './users.service'

import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'

import { JwtUser } from 'src/decorators/jwtUser.decorator'

import { AuthGuard } from 'src/guards/Auth.guard'

import RegisterUserDTO from './dtos/RegisterUser.dto'
import LoginUserDTO from './dtos/LoginUser.dto'
import UserDTO from './dtos/User.dto'
import HttpResponse from 'src/types/HttpResponse'

@ApiTags('Пользователи')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Получить текущего пользователя' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Get('current')
  getCurrentUser(@JwtUser() jwtUser: UserDTO): UserDTO | Error {
    return jwtUser
  }

  @ApiOperation({ summary: 'Зарегистрировать пользователя' })
  @ApiBody({ type: RegisterUserDTO, description: 'Регистрация пользователя' })
  @Post('register')
  registerUser(
    @Body() registerUserDto: RegisterUserDTO,
  ): Observable<HttpResponse | Error> {
    return this.usersService.registerUser(registerUserDto)
  }

  @ApiOperation({ summary: 'Авторизировать пользователя' })
  @ApiBody({ type: LoginUserDTO, description: 'Авторизация пользователя' })
  @Post('login')
  loginUser(
    @Body() loginUserDto: LoginUserDTO,
  ): Observable<UserDTO | HttpResponse | Error> {
    return this.usersService.loginUser(loginUserDto)
  }
}
