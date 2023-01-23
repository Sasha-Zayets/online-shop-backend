import {
  IsEmail,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateAndSignUpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password is too short',
  })
  password: string;

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
}
