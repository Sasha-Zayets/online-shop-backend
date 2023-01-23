import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/users.entity';
import { ROLES } from './users.constant';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(email: string, password: string) {
    return this.usersRepository.save({ email, password });
  }

  async createAdminUser(email: string, password: string) {
    return this.usersRepository.save({ email, password, role: ROLES.ADMIN });
  }

  async findByUserEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }
}
