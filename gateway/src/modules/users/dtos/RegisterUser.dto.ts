import { ApiProperty } from '@nestjs/swagger'

export default class RegisterUserDTO {
  @ApiProperty({ example: 'Pasha', description: 'Логин' })
  username: string

  @ApiProperty({ example: 'user@mail.com', description: 'Почта' })
  email: string

  @ApiProperty({ example: '123456789', description: 'Пароль' })
  password: string
}
