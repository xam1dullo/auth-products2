import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class RegisterDtoType {
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
  @MinLength(12)
  @Matches(/^\+[1-9]\d{1,14}$/)
  phone: string;
}
