import { ApiProperty } from '@nestjs/swagger'

export default class CommentDTO {
  @ApiProperty({ example: '00', description: 'Идентификатор комментария' })
  id: string

  @ApiProperty({ example: '01', description: 'Идентификатор пользователя' })
  userId: string

  @ApiProperty({ example: 'Hello', description: 'Сообщение' })
  text: string
}
