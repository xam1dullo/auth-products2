import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma.service';
import { BrandsModule } from './brands/brands.module';
import { ProductsModule } from './products/products.module';
import { ModelsModule } from './models/models.module';
import { ModelsService } from './models/models.service';
import { ProductsService } from './products/products.service';
import { BrandsService } from './brands/brands.service';
import { UserService } from './users/users.service';
import { ImagesModule } from './images/images.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads', // make sure this folder exists
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const fileExtension = path.extname(file.originalname);
      cb(null, `${uniqueSuffix}${fileExtension}`); // or any other naming convention
    },
  }),
};

@Module({
  imports: [
    MulterModule.register(multerConfig),
    AuthModule,
    UsersModule,
    PrismaModule,
    BrandsModule,
    ProductsModule,
    ModelsModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    ModelsService,
    ProductsService,
    BrandsService,
    UserService,
  ],
  exports: [PrismaService, UserService],
})
export class AppModule {}
