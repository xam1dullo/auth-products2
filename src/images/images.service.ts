import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  async createImage(data: { title: string; path: string }) {
    console.log(data);
    return await this.prisma.image.create({
      data,
    });
  }
}
