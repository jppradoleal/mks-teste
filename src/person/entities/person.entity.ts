import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MovieCast } from '../../movies/entities';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  name: string;

  @OneToMany(
    () => MovieCast,
    (movieCast) => movieCast.person,
    { cascade: false, onDelete: 'RESTRICT' }
  )
  jobs: MovieCast[];
}
