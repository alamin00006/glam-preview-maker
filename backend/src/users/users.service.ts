import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: { page?: number; limit?: number; search?: string; role?: string }) {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const where: Prisma.UserWhereInput = {};

    if (params.role) where.role = params.role as Role;
    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { email: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: {
          id: true, name: true, email: true, phone: true, role: true,
          isBlocked: true, avatar: true, createdAt: true,
          _count: { select: { orders: true } },
          orders: { select: { total: true } },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    const data = users.map((u) => ({
      id: u.id, name: u.name, email: u.email, phone: u.phone || '',
      role: u.role.toLowerCase() as any, isBlocked: u.isBlocked, avatar: u.avatar,
      ordersCount: u._count.orders,
      totalSpent: u.orders.reduce((s, o) => s + o.total, 0),
      createdAt: u.createdAt.toISOString(),
    }));

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateRole(id: string, role: Role) {
    await this.findOne(id);
    return this.prisma.user.update({ where: { id }, data: { role } });
  }

  async toggleBlock(id: string) {
    const user = await this.findOne(id);
    return this.prisma.user.update({ where: { id }, data: { isBlocked: !user.isBlocked } });
  }
}
