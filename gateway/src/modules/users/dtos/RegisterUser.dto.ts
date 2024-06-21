import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export default class RegisterUserDTO {
  @ApiProperty({ example: 'Pasha', description: 'Логин' })
  @IsNotEmpty()
  username: string

  @ApiProperty({ example: 'user@mail.com', description: 'Почта' })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({ example: '123456789', description: 'Пароль' })
  @IsNotEmpty()
  @MinLength(5)
  password: string
}
