import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

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

  @BeforeInsert()
  generateId() {
    this.id = uuidv4()
  }
}
