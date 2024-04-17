import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
// import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UsersController],
  imports: [PrismaModule],
  providers: [UserService, PrismaService],
})
export class UsersModule {}
