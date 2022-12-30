import {
  IsString,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Type(() => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  available: boolean;

  @Transform(({ value }) => JSON.parse(value))
  categories: Array<number>;
}
