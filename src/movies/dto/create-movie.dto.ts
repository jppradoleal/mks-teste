import {
  IsNotEmpty,
  IsUrl,
  IsNumber,
  ValidateNested,
  IsISO8601,
  IsDecimal,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateMovieCastDto } from './create-movie-cast.dto';

export class CreateMovieDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty({type: Date, format: 'date'})
  @IsISO8601()
  @IsNotEmpty()
  release_date: Date;

  @ApiProperty({ type: () => CreateMovieCastDto, isArray: true })
  @ValidateNested()
  casts: CreateMovieCastDto[];

  @ApiProperty()
  @IsNotEmpty()
  synopsis: string;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 1 })
  stars: number;

  @ApiProperty()
  @IsNumber()
  votes: number;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  trailer_url: string;
}
