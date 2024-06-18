import { ApiProperty } from '@nestjs/swagger'
import { UserRole } from 'src/types/enums/UserRole.enum'

export default class UserDTO {
  @ApiProperty({ example: '0', description: 'id пользователя' })
  id: string

  @ApiProperty({ example: 'Pasha', description: 'Логин' })
  username: string

  @ApiProperty({ example: 'user@mail.com', description: 'Почта' })
  email: string

  @ApiProperty({ example: 'USER', description: 'Роль' })
  role: UserRole

  @ApiProperty({ example: '00', description: 'Жетон' })
  token?: string
}
