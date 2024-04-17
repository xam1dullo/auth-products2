import { Injectable } from '@nestjs/common';
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
    const res = await this.prisma.model.delete({
      where: {
        id,
      },
    });

    return res;
  }
}
