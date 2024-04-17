import { ApiProperty } from '@nestjs/swagger';
import { CreateBrandDto } from 'src/brands/dto/create-brand.dto';
import { CreateModelDto } from 'src/models/dto/create-model.dto';

export class CreateProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  imageUr: string;

  @ApiProperty()
  brand: CreateBrandDto[];

  @ApiProperty()
  model: CreateModelDto[];
}
