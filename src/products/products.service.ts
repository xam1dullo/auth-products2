import { Injectable } from '@nestjs/common';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const res = await this.prisma.product.create({
        data: createProductDto,
      });
      return res;
    } catch (error) {
      console.log(error.name);

      return error;
    }
  }

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findOne(id: number) {
    const res = await this.prisma.product.findFirst({
      where: {
        id,
      },
    });
    return res;
  }

  async update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    const res = await this.prisma.product.update({
      where: {
        id,
      },
      data: updateProductDto,
    });
    return res;
  }

  async remove(id: number) {
    const res = await this.prisma.product.delete({
      where: {
        id,
      },
    });
    return res;
  }
}
