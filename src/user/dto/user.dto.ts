import { IsEmail, IsNotEmpty, Equals } from 'class-validator';
import { Match } from 'src/decorators/match.decorator';

export class UserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @Match('password')
  passwordConfirmation: string;
}
