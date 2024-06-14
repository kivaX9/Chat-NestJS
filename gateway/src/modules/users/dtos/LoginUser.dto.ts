import { ApiProperty } from '@nestjs/swagger'

export default class LoginUserDTO {
  @ApiProperty({ example: 'Pasha', description: 'Логин' })
  username: string

  @ApiProperty({ example: '123456789', description: 'Пароль' })
  password: string
}
