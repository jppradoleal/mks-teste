import { IsEmail, IsDate, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;
}
