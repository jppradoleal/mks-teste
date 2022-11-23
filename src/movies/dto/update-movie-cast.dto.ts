import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMovieCastDto } from './create-movie-cast.dto';

export class UpdateMovieCastDto extends PartialType(CreateMovieCastDto) {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
