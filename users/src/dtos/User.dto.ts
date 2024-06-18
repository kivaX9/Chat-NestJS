import { UserRole } from 'src/types/enums/UserRole.enum'

export class UserDTO {
  id: string

  username: string

  email: string

  role: UserRole

  token?: string
}
