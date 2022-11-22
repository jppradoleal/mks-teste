import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { Movie, MovieCast } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonService } from '../person/person.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private moviesRepository: Repository<Movie>,
    @InjectRepository(MovieCast)
    private movieCastsRepository: Repository<MovieCast>,
    private personsService: PersonService,
  ) {}

  async create(user: User, createMovieDto: CreateMovieDto) {
    let movie;

    try {
      movie = await this.moviesRepository.save({
        ...createMovieDto,
        creator: user,
      });
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Movie already exists');
      }

      throw new InternalServerErrorException('Error saving movie data');
    }

    const casts = await Promise.all(
      createMovieDto.casts.map(async (cast) => {
        cast.person = await this.personsService.create(cast.person);

        const existentCast = await this.movieCastsRepository.findOne({
          where: { person: cast.person, movie: { id: movie.id } },
        });

        if (existentCast) {
          return existentCast;
        }

        return this.movieCastsRepository.save({ ...cast, movie: movie });
      }),
    );

    movie.casts = casts;

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
    return await this.moviesRepository.update(id, updateMovieDto);
  }

  async remove(id: number) {
    try {
      return await this.moviesRepository.delete(id);
    } catch {
      throw new ConflictException('Failed to remove movie data');
    }
  }
}
