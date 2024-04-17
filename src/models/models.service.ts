import { Injectable } from '@nestjs/common';
// import { CreateModelDto } from './dto/create-model.dto';
// import { UpdateModelDto } from './dto/update-model.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ModelsService {
  constructor(private prisma: PrismaService) {}
  async create(createModelDto: Prisma.ModelCreateInput) {
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

  async update(id: number, updateModelDto: Prisma.ModelUpdateInput) {
    const res = await this.prisma.model.update({
      where: {
        id,
      },
      data: updateModelDto,
    });

    return res;
  }

  async remove(id: number) {
    const res = await this.prisma.model.delete({
      where: {
        id,
      },
    });

    return res;
  }
}
