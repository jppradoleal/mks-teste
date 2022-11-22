import {
  Controller,
  Post,
  Body,
  Delete,
  UseGuards,
  Request,
  Put,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Authentication')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new user' })
  @ApiCreatedResponse({ type: GetUserDto })
  @ApiBadRequestResponse()
  create(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Gets user data' })
  @ApiAcceptedResponse({ type: GetUserDto })
  async whoami(@Request() req): Promise<GetUserDto> {
    const user = await this.userService.findOne(req.user.email);
    delete user.password;
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Updates logged user password' })
  @ApiForbiddenResponse()
  @ApiCreatedResponse({ type: GetUserDto })
  update(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<GetUserDto> {
    return this.userService.update(req.user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletes logged user account' })
  @ApiForbiddenResponse()
  @ApiAcceptedResponse()
  remove(@Request() req) {
    return this.userService.remove(req.user.id);
  }
}
