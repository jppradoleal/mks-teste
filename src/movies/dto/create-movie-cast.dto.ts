import { IsEnum, IsDefined, ValidateNested, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { JobType } from '../entities/movie-cast.entity';
import { CreatePersonDto } from '../../person/dto/create-person.dto';

export class CreateMovieCastDto {
  @ApiProperty({ type: () => CreatePersonDto })
  @IsDefined()
  @ValidateNested()
  person: CreatePersonDto;

  @ApiProperty()
  @IsNotEmpty()
  role: string;

  @ApiProperty()
  @IsEnum(JobType)
  job: JobType;
}
