import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDtoType {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(5)
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string;
}
