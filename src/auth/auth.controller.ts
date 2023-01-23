import * as bcrypt from 'bcrypt';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateAndSignUpDto } from './dto/createAndSignUpDto';
import { SALT_OR_ROUNDS } from './auth.constant';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() user: CreateAndSignUpDto) {
    const { password, email } = user;
    return this.authService.login(email, password);
  }

  @Post('signup')
  async createUser(@Body() user: CreateAndSignUpDto) {
    const { password, email, isAdmin } = user;
    const resultSearch = await this.usersService.findByUserEmail(email);

    if (resultSearch) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Your email is already use',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const hashedPassword: string = await bcrypt.hash(password, SALT_OR_ROUNDS);
    return isAdmin
      ? this.usersService.createAdminUser(email, hashedPassword)
      : this.usersService.createUser(email, hashedPassword);
  }
}
