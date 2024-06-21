import { UserRole } from 'src/types/enums/UserRole.enum'

export default class DeleteCommentDTO {
  id: string

  userId: string

  role: UserRole
}
