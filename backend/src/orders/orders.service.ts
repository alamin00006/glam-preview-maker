import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderStatus, Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: { page?: number; limit?: number; status?: string }) {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const where: Prisma.OrderWhereInput = {};
    if (params.status) where.status = params.status as OrderStatus;

    const [data, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        include: { user: { select: { name: true, email: true, phone: true } }, items: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.order.count({ where }),
    ]);

    const mapped = data.map((o) => ({
      ...o,
      customer: { name: o.user.name, email: o.user.email, phone: o.user.phone || '' },
    }));

    return { data: mapped, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { user: { select: { name: true, email: true, phone: true } }, items: true },
    });
    if (!order) throw new NotFoundException('Order not found');
    return { ...order, customer: { name: order.user.name, email: order.user.email, phone: order.user.phone || '' } };
  }

  async updateStatus(id: string, status: OrderStatus) {
    await this.findOne(id);
    return this.prisma.order.update({ where: { id }, data: { status } });
  }

  async create(userId: string, data: { items: { productId: string; name: string; quantity: number; price: number; color?: string; size?: string }[]; shippingAddress: string; phone?: string; note?: string }) {
    const total = data.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const count = await this.prisma.order.count();
    const orderNumber = `NF-${1001 + count}`;

    return this.prisma.order.create({
      data: {
        orderNumber,
        userId,
        total,
        shippingAddress: data.shippingAddress,
        phone: data.phone,
        note: data.note,
        items: { create: data.items },
      },
      include: { items: true },
    });
  }
}
