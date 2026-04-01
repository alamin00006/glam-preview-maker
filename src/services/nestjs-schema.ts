// =====================================================
// Prisma Schema for NestJS Backend
// File: prisma/schema.prisma (in your NestJS project)
// =====================================================
//
// generator client {
//   provider = "prisma-client-js"
// }
//
// datasource db {
//   provider = "postgresql"
//   url      = env("DATABASE_URL")
// }
//
// model User {
//   id          String    @id @default(uuid())
//   name        String
//   email       String    @unique
//   phone       String?
//   password    String    // bcrypt hashed
//   role        Role      @default(USER)
//   isBlocked   Boolean   @default(false)
//   avatar      String?
//   createdAt   DateTime  @default(now())
//   updatedAt   DateTime  @updatedAt
//   orders      Order[]
//   reviews     Review[]
// }
//
// enum Role {
//   USER
//   MODERATOR
//   ADMIN
// }
//
// model Product {
//   id          String        @id @default(uuid())
//   name        String
//   brand       String
//   image       String
//   price       Float
//   oldPrice    Float?
//   rating      Float         @default(0)
//   reviews     Int           @default(0)
//   tag         String?
//   colors      String[]      // PostgreSQL array
//   category    String
//   description String?
//   details     String[]
//   stock       Int           @default(0)
//   status      ProductStatus @default(DRAFT)
//   createdAt   DateTime      @default(now())
//   updatedAt   DateTime      @updatedAt
//   orderItems  OrderItem[]
//   reviewList  Review[]
// }
//
// enum ProductStatus {
//   ACTIVE
//   DRAFT
//   ARCHIVED
// }
//
// model Order {
//   id              String        @id @default(uuid())
//   orderNumber     String        @unique
//   userId          String
//   user            User          @relation(fields: [userId], references: [id])
//   items           OrderItem[]
//   total           Float
//   status          OrderStatus   @default(PENDING)
//   paymentStatus   PaymentStatus @default(UNPAID)
//   shippingAddress String
//   createdAt       DateTime      @default(now())
//   updatedAt       DateTime      @updatedAt
// }
//
// enum OrderStatus {
//   PENDING
//   CONFIRMED
//   SHIPPED
//   DELIVERED
//   CANCELLED
// }
//
// enum PaymentStatus {
//   PAID
//   UNPAID
//   REFUNDED
// }
//
// model OrderItem {
//   id        String  @id @default(uuid())
//   orderId   String
//   order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
//   productId String
//   product   Product @relation(fields: [productId], references: [id])
//   name      String
//   quantity  Int
//   price     Float
// }
//
// model Review {
//   id        String   @id @default(uuid())
//   userId    String
//   user      User     @relation(fields: [userId], references: [id])
//   productId String
//   product   Product  @relation(fields: [productId], references: [id])
//   rating    Int      // 1-5
//   comment   String?
//   createdAt DateTime @default(now())
// }
//
// =====================================================
// NestJS API Endpoints to implement:
// =====================================================
//
// AUTH:
//   POST   /api/auth/login          { email, password } → { token, user }
//   POST   /api/auth/register       { name, email, phone, password }
//
// PRODUCTS:
//   GET    /api/products            ?page=&limit=&category=&search=
//   GET    /api/products/:id
//   POST   /api/products            (admin)
//   PATCH  /api/products/:id        (admin)
//   DELETE /api/products/:id        (admin)
//
// ORDERS:
//   GET    /api/orders              ?page=&status=  (admin: all, user: own)
//   GET    /api/orders/:id
//   POST   /api/orders              (authenticated)
//   PATCH  /api/orders/:id/status   (admin)
//
// USERS:
//   GET    /api/users               ?page=&search=&role=  (admin)
//   GET    /api/users/:id           (admin)
//   PATCH  /api/users/:id/role      (admin)
//   PATCH  /api/users/:id/toggle-block  (admin)
//
// DASHBOARD:
//   GET    /api/dashboard/stats
//   GET    /api/dashboard/revenue   ?period=7d|30d|90d
//   GET    /api/dashboard/recent-orders
//   GET    /api/dashboard/top-products
//
// SETTINGS:
//   GET    /api/settings
//   PATCH  /api/settings            (admin)

export {};
