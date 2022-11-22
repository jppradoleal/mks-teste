import { User } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { MovieCast } from './movie-cast.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { cascade: false })
  creator: User;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  title: string;

  @Column({ nullable: false, type: 'date' })
  release_date: Date;

  @OneToMany(() => MovieCast, (movieCast) => movieCast.movie, {
    cascade: false,
    onDelete: 'RESTRICT',
  })
  casts: MovieCast[];

  @Column({ nullable: false, type: 'text' })
  synopsis: string;

  @Column({ type: 'float', nullable: false, default: 0 })
  stars: number;

  @Column({ nullable: false, default: 0 })
  votes: number;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  trailer_url: string;
}
