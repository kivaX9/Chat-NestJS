import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @Column()
  userId: number

  @Column()
  text: string
}
