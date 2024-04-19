import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDtoType } from './dto/register.dto';
import { AuthEntity } from './entity/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDtoType } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(userData: RegisterDtoType) {
    const user = await this.prisma.user.findUnique({
      where: { username: userData.username },
    });

    // If user exists, throw an error
    if (user) {
      throw new ConflictException('User already exist');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const result = await this.prisma.user.create({
      data: {
        username: userData.username,
        password: hashedPassword,
        phone: userData.phone,
      },
    });
    delete result.password;
    delete result.id;
    return {
      message: 'Successful created',
      ...result,
    };
  }

  async login(userData: LoginDtoType): Promise<AuthEntity> {
    const { username, password } = userData;
    console.log({
      username,
      password,
    });

    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException(`No user found for username: ${username}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log({ user, isPasswordValid });

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
