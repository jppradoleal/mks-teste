import { ConflictException, Injectable } from '@nestjs/common';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { Movie, MovieCast } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonService } from '../person/person.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private moviesRepository: Repository<Movie>,
    @InjectRepository(MovieCast)
    private movieCastsRepository: Repository<MovieCast>,
    private personsService: PersonService,
  ) {}

  async create(userId: number, createMovieDto: CreateMovieDto) {
    const casts = createMovieDto.casts;
    delete createMovieDto.casts;

    const movie = await this.moviesRepository.save({
      ...createMovieDto,
      creator: { id: userId },
    });

    const castObjects = await Promise.all(
      casts.map(async (cast) => {
        cast.person = await this.personsService.create(cast.person);

        const existentCast = await this.movieCastsRepository.findOne({
          where: { person: cast.person, movie: { id: movie.id } },
        });

        if (existentCast) {
          return existentCast;
        }

        return this.movieCastsRepository.save({
          ...cast,
          movie: { id: movie.id },
        });
      }),
    );

    movie.casts = castObjects;

    return movie;
  }

  async findAll() {
    return await this.moviesRepository.find({
      relations: { casts: { person: true } },
    });
  }

  async findOne(id: number) {
    return await this.moviesRepository.findOne({
      where: { id },
      relations: { casts: { person: true } },
    });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.moviesRepository.findOne({
      where: { id },
      relations: ['casts'],
    });
    Object.assign(movie, updateMovieDto);
    return await this.moviesRepository.save(movie);
  }

  async remove(id: number) {
    try {
      return await this.moviesRepository.delete(id);
    } catch {
      throw new ConflictException('Failed to remove movie data');
    }
  }
}
