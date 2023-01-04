import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersModule } from 'src/users/users.module';

const jwtFactory = {
  imports: [ConfigModule.forRoot()],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get('JWT_EXP_H'),
    },
  }),
  inject: [ConfigService],
};

@Module({
  imports: [ConfigModule, UsersModule, JwtModule.registerAsync(jwtFactory)],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
