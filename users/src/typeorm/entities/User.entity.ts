import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

import { UserRole } from 'src/types/enums/UserRole.enum'

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn()
  id: string

  @Column({ unique: true })
  username: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ default: UserRole.USER })
  role: UserRole

  @BeforeInsert()
  generateId(): void {
    this.id = uuidv4()
  }
}
