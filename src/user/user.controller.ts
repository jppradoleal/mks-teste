import {
  Controller,
  Post,
  Body,
  Delete,
  UseGuards,
  Request,
  Put,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new user' })
  @ApiCreatedResponse({ type: UserDto })
  @ApiBadRequestResponse()
  create(@Body() createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Gets user data' })
  @ApiAcceptedResponse({ type: UserDto })
  async whoami(@Request() req) {
    const user = await this.userService.findOne(req.user.email);
    delete user.password;
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Updates user password' })
  @ApiForbiddenResponse()
  @ApiCreatedResponse({ type: UserDto })
  update(@Request() req, @Body() updateUserDto: UserDto) {
    return this.userService.update(req.user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Removes a user' })
  @ApiForbiddenResponse()
  @ApiCreatedResponse()
  remove(@Request() req) {
    return this.userService.remove(req.user.id);
  }
}
