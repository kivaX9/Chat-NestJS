import UserDTO from './User.dto'

export default class JwtPayloadDTO {
  sub: string
  user: UserDTO
}
