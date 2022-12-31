import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(email: string, password: string) {
    return this.usersRepository.save({ email, password });
  }

  async findByUserEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }
}
