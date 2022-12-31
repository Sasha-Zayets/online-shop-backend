import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByUserEmail(email);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new NotAcceptableException('Password is not valid');
    }

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    const secretKey = this.configService.get('JWT_SECRET');
    const expiresIn = this.configService.get('JWT_EXP_H');
    return {
      access_token: this.jwtService.sign(
        { email, _id: user.id },
        { secret: secretKey, expiresIn },
      ),
    };
  }
}
