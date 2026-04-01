import { PrismaClient, Role, ProductStatus, OrderStatus, PaymentStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const adminPass = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@nigarfashion.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@nigarfashion.com',
      password: adminPass,
      role: Role.ADMIN,
      phone: '+8801700000000',
    },
  });

  // Demo users
  const userPass = await bcrypt.hash('user123', 10);
  const users = [];
  const names = ['Fatima Akter', 'Rashida Begum', 'Nusrat Jahan', 'Tasnim Rahman', 'Ayesha Siddiqua'];
  for (let i = 0; i < names.length; i++) {
    const u = await prisma.user.upsert({
      where: { email: `user${i + 1}@example.com` },
      update: {},
      create: {
        name: names[i],
        email: `user${i + 1}@example.com`,
        password: userPass,
        role: Role.USER,
        phone: `+88017000000${i + 1}`,
      },
    });
    users.push(u);
  }

  // Products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Elegant Silk Saree',
        brand: 'Nigar Collection',
        image: '/images/products/saree-1.jpg',
        images: [],
        price: 4500,
        oldPrice: 5500,
        category: 'Sarees',
        description: 'Beautiful handcrafted silk saree with intricate embroidery',
        details: ['Pure silk fabric', 'Hand embroidered', 'Blouse piece included'],
        colors: ['#DC2626', '#1D4ED8', '#15803D'],
        stock: 25,
        tag: 'Bestseller',
        status: ProductStatus.ACTIVE,
        rating: 4.5,
        reviewCount: 128,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Designer Kurti Set',
        brand: 'Nigar Premium',
        image: '/images/products/kurti-1.jpg',
        images: [],
        price: 2800,
        oldPrice: 3200,
        category: 'Kurtis',
        description: 'Trendy cotton kurti with palazzo pants',
        details: ['Cotton blend', 'Machine washable', 'Palazzo included'],
        colors: ['#F59E0B', '#8B5CF6'],
        stock: 40,
        tag: 'New',
        status: ProductStatus.ACTIVE,
        rating: 4.2,
        reviewCount: 76,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Bridal Lehenga',
        brand: 'Nigar Bridal',
        image: '/images/products/lehenga-1.jpg',
        images: [],
        price: 18500,
        oldPrice: 22000,
        category: 'Lehenga',
        description: 'Stunning bridal lehenga with heavy embroidery',
        details: ['Premium fabric', 'Handwork embroidery', 'Dupatta included'],
        colors: ['#DC2626', '#BE185D'],
        stock: 8,
        tag: 'Premium',
        status: ProductStatus.ACTIVE,
        rating: 4.8,
        reviewCount: 45,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Casual Salwar Kameez',
        brand: 'Nigar Daily',
        image: '/images/products/salwar-1.jpg',
        images: [],
        price: 1800,
        category: 'Salwar Kameez',
        description: 'Comfortable everyday salwar kameez',
        details: ['Breathable fabric', 'Easy care', 'All sizes available'],
        colors: ['#3B82F6', '#10B981', '#F97316'],
        stock: 60,
        status: ProductStatus.ACTIVE,
        rating: 4.0,
        reviewCount: 210,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Party Wear Gown',
        brand: 'Nigar Glam',
        image: '/images/products/gown-1.jpg',
        images: [],
        price: 6500,
        oldPrice: 7800,
        category: 'Gowns',
        description: 'Elegant party wear gown with sequin work',
        details: ['Georgette fabric', 'Sequin embellished', 'Floor length'],
        colors: ['#000000', '#1D4ED8'],
        stock: 15,
        tag: 'Trending',
        status: ProductStatus.ACTIVE,
        rating: 4.6,
        reviewCount: 62,
      },
    }),
  ]);

  // Orders
  let orderNum = 1000;
  for (const user of users.slice(0, 3)) {
    orderNum++;
    await prisma.order.create({
      data: {
        orderNumber: `NF-${orderNum}`,
        userId: user.id,
        total: products[0].price * 2,
        status: OrderStatus.DELIVERED,
        paymentStatus: PaymentStatus.PAID,
        shippingAddress: 'Dhaka, Bangladesh',
        phone: user.phone,
        items: {
          create: [
            { productId: products[0].id, name: products[0].name, quantity: 1, price: products[0].price },
            { productId: products[1].id, name: products[1].name, quantity: 1, price: products[1].price },
          ],
        },
      },
    });
  }

  // Settings
  await prisma.setting.upsert({ where: { key: 'store_name' }, update: {}, create: { key: 'store_name', value: 'Nigar Fashion World' } });
  await prisma.setting.upsert({ where: { key: 'store_email' }, update: {}, create: { key: 'store_email', value: 'contact@nigarfashion.com' } });
  await prisma.setting.upsert({ where: { key: 'currency' }, update: {}, create: { key: 'currency', value: 'BDT' } });

  console.log('✅ Seed complete');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
