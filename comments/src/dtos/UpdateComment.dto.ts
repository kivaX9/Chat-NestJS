import { UserRole } from 'src/types/enums/UserRole.enum'

export default class UpdateCommentDTO {
  id: string

  userId: string

  role: UserRole

  text: string
}
