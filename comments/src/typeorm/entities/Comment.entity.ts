import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryColumn()
  id: string

  @Column()
  userId: string

  @Column()
  text: string

  @BeforeInsert()
  generateId(): void {
    this.id = uuidv4()
  }
}
