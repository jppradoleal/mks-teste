import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';
import { UpdateMovieCastDto } from './update-movie-cast.dto';

export class UpdateMovieDto extends PartialType(
  OmitType(CreateMovieDto, ['casts']),
) {
  @ApiProperty({ type: () => UpdateMovieCastDto, isArray: true })
  @ValidateNested()
  casts: UpdateMovieCastDto[];
}
