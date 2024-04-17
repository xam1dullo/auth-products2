import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
// import { CreateBrandDto } from './dto/create-brand.dto';
// import { UpdateBrandDto } from './dto/update-brand.dto';
import { Prisma } from '@prisma/client';
import { CreateBrandDto } from './dto/create-brand.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const brand = await this.brandsService.findOne(id);
    if (!brand) {
      console.log('Error');
      throw new NotFoundException(`Brand with ${id} does not exist.`);
    }
    return brand;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBrandDto: Prisma.BrandUpdateInput,
  ) {
    try {
      const updateBrand = await this.brandsService.update(id, updateBrandDto);
      if (!updateBrand) {
        throw new NotFoundException(`Brand with ${id} does not exist.`);
      }
      return updateBrand;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deleteBrand = await this.brandsService.remove(id);
    if (!deleteBrand) {
      throw new NotFoundException(`Brand with ${id} does not exist.`);
    }
    return deleteBrand;
  }
}
