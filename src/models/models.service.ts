import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateModelDto } from './dto/update-model.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ModelsService {
  constructor(private prisma: PrismaService) {}

  async create(createModelDto: Prisma.ModelCreateInput) {
    console.log(createModelDto);

    const res = await this.prisma.model.create({
      data: createModelDto,
    });
    return res;
  }

  async findAll() {
    const res = await this.prisma.model.findMany({});
    return res;
  }

  async findOne(id: number) {
    const res = await this.prisma.model.findFirst({
      where: {
        id,
      },
    });

    return res;
  }

  async update(id: number, updateModelDto: UpdateModelDto) {
    const res = await this.prisma.model.update({
      where: {
        id,
      },
      data: updateModelDto,
    });

    return res;
  }

  async remove(id: number) {
    try {
      console.log(`Attempting to delete model with id: ${id}`);

      const res = await this.prisma.model.delete({
        where: { id },
      });

      console.log(`Model deleted successfully: ${id}`);
      return res;
    } catch (error) {
      // Handle the case where the brand does not exist.
      if (error.code === 'P2025') {
        console.error(`No model found with id: ${id}`);
        throw new NotFoundException(`No model found with id: ${id}`);
      }

      // Log unexpected errors and rethrow a more specific error
      console.error('Failed to delete model:', error);
      throw new InternalServerErrorException('Failed to delete model');
    }
  }
}
