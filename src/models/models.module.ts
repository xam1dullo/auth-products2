import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ModelsController],
  providers: [ModelsService, PrismaService],
  imports: [PrismaModule],
})
export class ModelsModule {}
