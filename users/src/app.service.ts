import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  createString(value: { value: string }) {
    return value
  }
}
