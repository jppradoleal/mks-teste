import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Creates a new person' })
  @ApiCreatedResponse({ type: CreatePersonDto })
  @ApiBadRequestResponse()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all persons' })
  @ApiAcceptedResponse({ type: CreatePersonDto, isArray: true })
  findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get person by id' })
  @ApiForbiddenResponse()
  @ApiCreatedResponse({ type: CreatePersonDto })
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Updates a person data' })
  @ApiForbiddenResponse()
  @ApiCreatedResponse({ type: CreatePersonDto })
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a persons data by id' })
  @ApiForbiddenResponse()
  @ApiAcceptedResponse()
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
