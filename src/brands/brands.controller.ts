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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { CreateBrandDto } from './dto/create-brand.dto';
import { BrandsService } from './brands.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @Get()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const brand = await this.brandsService.findOne(id);
    if (!brand) {
      console.log('Error');
      throw new NotFoundException(`Brand with ${id} does not exist.`);
    }
    return brand;
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
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
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deleteBrand = await this.brandsService.remove(id);
    if (!deleteBrand) {
      throw new NotFoundException(`Brand with ${id} does not exist.`);
    }
    return deleteBrand;
  }
}
