import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const user = this.usersRepository.create({ email: email });
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, salt);

    try {
      return await user.save();
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Endereço de email já existente');
      } else {
        throw new InternalServerErrorException('Erro ao criar usuário');
      }
    }
  }

  async validate(email: string, password: string) {
    const user = await this.usersRepository.findOneBy({
      email: email,
    } as FindOptionsWhere<User>);

    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
  }

  async findAll() {
    const users = await this.usersRepository.find();

    return users.map((user) => user.email);
  }

  async findOne(email: string) {
    return await this.usersRepository.findOne(<FindOneOptions>{
      where: {
        email,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;

    if (password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    return await this.usersRepository.save({
      id: id,
      password,
    });
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne(<FindOneOptions>{
      where: {
        id: id,
      },
    });
    return await user.remove();
  }
}
