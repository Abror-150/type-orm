import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Genre } from './genre.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @ManyToOne(() => User, (user) => user.book)
  user: User;
  @ManyToMany(() => Genre, (genre) => genre.book)
  genre: Genre[];
}
