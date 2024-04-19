import { Module } from '@nestjs/common';
import { CustomConfigUploadController } from './images.controller';
import { PrismaService } from 'src/prisma.service';
import { ImagesService } from './images.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CustomConfigUploadController],
  providers: [PrismaService, ImagesService],
  imports: [PrismaModule],
})
export class ImagesModule {}
