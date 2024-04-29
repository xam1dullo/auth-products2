import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
// import { CreateBrandDto } from './dto/create-brand.dto';
// import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async create(createBrandDto: Prisma.BrandCreateInput) {
    const res = await this.prisma.brand.create({
      data: createBrandDto,
    });
    return res;
  }

  async findAll() {
    const res = await this.prisma.brand.findMany();
    return res;
  }

  async findOne(id: number) {
    const res = await this.prisma.brand.findFirst({
      where: {
        id,
      },
    });
    return res;
  }

  async update(id: number, updateBrandDto: Prisma.BrandUpdateInput) {
    try {
      // First, check if the brand exists
      const brand = await this.prisma.brand.findUnique({
        where: { id },
      });

      if (!brand) {
        throw new Error(`Brand with ID ${id} not found`);
      }

      // If the brand exists, proceed with the update
      const res = await this.prisma.brand.update({
        where: { id },
        data: updateBrandDto,
      });

      return res;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          // Handle not found error
          console.error(`Brand with ID ${id} not found.`);
          throw new Error(`Brand with ID ${id} not found.`);
        }
      }
      console.error('Failed to update brand:', error);
      throw error; // Rethrow the error if it is not handled above
    }
  }

  async remove(id: number) {
    try {
      console.log(`Attempting to delete brand with id: ${id}`);

      const res = await this.prisma.brand.delete({
        where: { id },
      });

      console.log(`Brand deleted successfully: ${id}`);
      return res;
    } catch (error) {
      // Handle the case where the brand does not exist.
      if (error.code === 'P2025') {
        console.error(`No brand found with id: ${id}`);
        throw new NotFoundException(`No brand found with id: ${id}`);
      }

      // Log unexpected errors and rethrow a more specific error
      console.error('Failed to delete brand:', error);
      throw new InternalServerErrorException('Failed to delete brand');
    }
  }
}
