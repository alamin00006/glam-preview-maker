import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const [totalOrders, totalCustomers, totalProducts, orders] = await Promise.all([
      this.prisma.order.count(),
      this.prisma.user.count({ where: { role: 'USER' } }),
      this.prisma.product.count(),
      this.prisma.order.findMany({ select: { total: true } }),
    ]);

    const totalRevenue = orders.reduce((s, o) => s + o.total, 0);

    return {
      totalRevenue,
      totalOrders,
      totalCustomers,
      totalProducts,
      revenueGrowth: 12.5,
      ordersGrowth: 8.2,
      customersGrowth: 15.3,
    };
  }

  async getRevenueChart(period: string) {
    const days = period === '30d' ? 30 : period === '90d' ? 90 : 7;
    const data = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayStart = new Date(date.setHours(0, 0, 0, 0));
      const dayEnd = new Date(date.setHours(23, 59, 59, 999));

      const dayOrders = await this.prisma.order.findMany({
        where: { createdAt: { gte: dayStart, lte: dayEnd } },
        select: { total: true },
      });

      data.push({
        date: dayStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        revenue: dayOrders.reduce((s, o) => s + o.total, 0),
        orders: dayOrders.length,
      });
    }
    return data;
  }

  async getRecentOrders() {
    const orders = await this.prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true, email: true, phone: true } } },
    });
    return orders.map((o) => ({
      ...o,
      customer: { name: o.user.name, email: o.user.email, phone: o.user.phone || '' },
    }));
  }

  async getTopProducts() {
    const items = await this.prisma.orderItem.groupBy({
      by: ['productId', 'name'],
      _sum: { quantity: true, price: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    });

    const products = await this.prisma.product.findMany({
      where: { id: { in: items.map((i) => i.productId) } },
      select: { id: true, name: true, image: true },
    });

    return items.map((item) => {
      const p = products.find((p) => p.id === item.productId);
      return {
        id: item.productId,
        name: p?.name || item.name,
        image: p?.image || '',
        sales: item._sum.quantity || 0,
        revenue: (item._sum.price || 0) * (item._sum.quantity || 0),
      };
    });
  }
}
