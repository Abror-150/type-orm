import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
    name: string;
    @OneToMany(() => Book, (book) => book.user)
    book:Book[]
}
