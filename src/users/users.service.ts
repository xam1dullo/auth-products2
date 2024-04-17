import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateUserDtoType } from './dto/create-user.dto';
import { UpdateUserDtoType } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(userData: CreateUserDtoType) {
    const newUser = await this.prisma.user.create({
      data: {
        username: userData.username,
        password: userData.password, // Remember to hash the password
        phone: userData.phone,
      },
    });
    return newUser;
  }

  async updateUser(userId: number, userData: UpdateUserDtoType) {
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...userData,
      },
    });
    return updatedUser;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }
  async findOne(id) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async remove(id) {
    const user = await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return user;
  }
}
