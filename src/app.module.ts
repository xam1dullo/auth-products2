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

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    BrandsModule,
    ProductsModule,
    ModelsModule,
    UsersModule,
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
  exports: [PrismaService],
})
export class AppModule {}
