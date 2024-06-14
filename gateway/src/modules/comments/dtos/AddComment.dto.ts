import { ApiProperty } from '@nestjs/swagger'

export default class AddCommentDTO {
  @ApiProperty({ example: 'Hello', description: 'Сообщение' })
  text: string
}
