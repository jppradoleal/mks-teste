import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Movie } from './movie.entity';
import { Person } from '../../person/entities/person.entity';

export enum JobType {
  ACTOR = 'Actor',
  WRITER = 'Writer',
  DIRECTOR = 'Director',
}

@Entity()
@Unique(['movie', 'person'])
export class MovieCast {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Movie, (movie) => movie.casts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  movie: Movie;

  @ManyToOne(() => Person, (person) => person.jobs)
  person: Person;

  @Column({ nullable: false })
  role: string;

  @Column({ type: 'enum', enum: JobType, nullable: false })
  job: JobType;
}
