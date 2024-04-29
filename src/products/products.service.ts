import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      const { brandId, modelId } = createProductDto;

      console.log(brandId, modelId);

      // Check for model and brand in one go (if applicable)
      const [model, brand] = await this.prisma.$transaction([
        this.prisma.model.findUnique({ where: { id: modelId } }),
        this.prisma.brand.findUnique({ where: { id: brandId } }),
      ]);

      if (!model) {
        throw new HttpException('Model id not found', HttpStatus.NOT_FOUND);
      }

      if (!brand) {
        throw new HttpException('Brand id not found', HttpStatus.NOT_FOUND);
      }

      const res = await this.prisma.product.create({
        data: createProductDto,
      });
      return res;
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    try {
      return await this.prisma.product.findMany();
    } catch (error) {
      return error;
    }
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
    try {
      console.log(`Attempting to delete product with id: ${id}`);

      const res = await this.prisma.product.delete({
        where: { id },
      });

      console.log(`Product deleted successfully: ${id}`);
      return res;
    } catch (error) {
      // Handle the case where the product does not exist.
      if (error.code === 'P2025') {
        console.error(`No product found with id: ${id}`);
        throw new HttpException(
          `No product found with id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }

      // Log unexpected errors and rethrow them
      console.error('Failed to delete product:', error);
      throw new HttpException(
        'Failed to delete product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
