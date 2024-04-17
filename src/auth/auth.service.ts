import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDtoType } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(userData: RegisterDtoType) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.prisma.user.create({
      data: {
        username: userData.username,
        password: hashedPassword,
        phone: userData.phone,
      },
    });
    return user;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userData) {
    const user = await this.validateUser(userData.username, userData.password);
    if (!user) {
      throw new Error('User not found or password does not match');
    }
    // For simplicity, assuming the user is returned directly
    // Typically, you should return a JWT token or a session token here
    return user;
  }
}
