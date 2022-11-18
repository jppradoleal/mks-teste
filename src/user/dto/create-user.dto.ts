import { IsEmail, IsNotEmpty } from 'class-validator';
import { Match } from 'src/decorators/match.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @Match('password')
  passwordConfirmation: string;
}
