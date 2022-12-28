import { MaxLength, IsString, IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty({
    message: 'Name must be not empty',
  })
  @IsString({
    message: 'Name must be a string',
  })
  @MaxLength(150, {
    message:
      'Name is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  name: string;
}
