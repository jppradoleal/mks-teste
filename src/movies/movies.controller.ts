import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Creates a new movie' })
  @ApiCreatedResponse({ type: CreateMovieDto })
  @ApiBadRequestResponse()
  create(@Request() req, @Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(req.user, createMovieDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all movies' })
  @ApiAcceptedResponse({ type: CreateMovieDto })
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get movie by id' })
  @ApiForbiddenResponse()
  @ApiCreatedResponse({ type: CreateMovieDto })
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Updates a movie data' })
  @ApiForbiddenResponse()
  @ApiCreatedResponse({ type: UpdateMovieDto })
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a movie by id' })
  @ApiForbiddenResponse()
  @ApiAcceptedResponse()
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
