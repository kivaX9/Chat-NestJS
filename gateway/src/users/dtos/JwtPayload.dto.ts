export default class JwtPayloadDTO {
  sub: string
  user: UserDTO
}

class UserDTO {
  id: number
  username: string
  email: string
}
