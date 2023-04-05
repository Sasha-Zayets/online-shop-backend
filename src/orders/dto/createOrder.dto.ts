import {
  MaxLength,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { TYPE_PAYMENT, MAX_LENGTH_COMMENT } from '../orders.constant';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  products: number[];

  @IsNotEmpty()
  @IsString()
  @IsEnum(TYPE_PAYMENT)
  typePayment: string;

  @IsOptional()
  @IsString()
  @MaxLength(MAX_LENGTH_COMMENT)
  comment?: string;
}
