import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user.isBlocked) throw new UnauthorizedException('Account is blocked');

    const token = this.jwt.sign({ sub: user.id, role: user.role });
    const { password: _, ...result } = user;
    return { token, user: result };
  }

  async register(name: string, email: string, password: string, phone?: string) {
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { name, email, password: hashed, phone },
    });
    const token = this.jwt.sign({ sub: user.id, role: user.role });
    const { password: _, ...result } = user;
    return { token, user: result };
  }
}
