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
import { memoryStorage } from 'multer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

export const multerConfig = {
  storage: memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit size to 5MB
  },
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(new Error('Invalid file type, only images are allowed!'), false);
    }
  },
};

console.log(join(__dirname, '..', '..', 'uploads'));
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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/static',
    }),
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
