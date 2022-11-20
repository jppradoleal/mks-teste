import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie, MovieCast } from './entities';
import { PersonModule } from 'src/person/person.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, MovieCast]), PersonModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
