import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MinLength } from 'class-validator'

export default class LoginUserDTO {
  @ApiProperty({ example: 'Pasha', description: 'Логин' })
  @IsNotEmpty()
  username: string

  @ApiProperty({ example: '123456789', description: 'Пароль' })
  @IsNotEmpty()
  @MinLength(5)
  password: string
}
