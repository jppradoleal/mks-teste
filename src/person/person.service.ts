import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) private personsRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    const existentPerson = await this.personsRepository.findOne({
      where: { name: createPersonDto.name },
    });

    if (existentPerson) {
      return existentPerson;
    }

    return await this.personsRepository.save(createPersonDto);
  }

  async findAll() {
    return await this.personsRepository.find();
  }

  async findOne(id: number) {
    return await this.personsRepository.findOne(<FindOneOptions>{
      where: { id },
    });
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    return await this.personsRepository.update(id, updatePersonDto);
  }

  async remove(id: number) {
    return await this.personsRepository.delete(id);
  }
}
