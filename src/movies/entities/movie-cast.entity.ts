import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Movie } from './movie.entity';
import { Person } from '../../person/entities/person.entity';
import { Exclude } from 'class-transformer';

export enum JobType {
  ACTOR = 'ACTOR',
  WRITER = 'WRITER',
  DIRECTOR = 'DIRECTOR',
}

@Entity()
// @Unique(['movie', 'person'])
export class MovieCast {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @ManyToOne(() => Movie, (movie) => movie.casts)
  movie: Movie;

  @ManyToOne(() => Person, (person) => person.jobs, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  person: Person;

  @Column({ nullable: false })
  role: string;

  @Column({ type: 'enum', enum: JobType, nullable: false })
  job: JobType;
}
