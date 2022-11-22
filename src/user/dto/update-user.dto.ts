import { IsNotEmpty } from 'class-validator';
import { Match } from '../../decorators/match.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @Match('password')
  passwordConfirmation: string;
}
