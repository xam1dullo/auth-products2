import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService, PrismaService],
  imports: [PrismaModule],
})
export class BrandsModule {}
