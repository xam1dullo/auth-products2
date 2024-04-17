import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
  imports: [PrismaModule],
  exports: [PrismaService],
})
export class ProductsModule {}
