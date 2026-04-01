# Nigar Fashion World — Backend API

NestJS + Prisma + PostgreSQL

## Setup

```bash
cd backend
npm install

# Configure database
cp .env.example .env
# Edit .env with your PostgreSQL connection string

# Generate Prisma client & run migrations
npx prisma generate
npx prisma migrate dev --name init

# Seed demo data
npm run prisma:seed

# Start dev server
npm run start:dev
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | — | Login |
| POST | `/api/auth/register` | — | Register |
| GET | `/api/products` | — | List products |
| GET | `/api/products/:id` | — | Product detail |
| POST | `/api/products` | Admin | Create product |
| PATCH | `/api/products/:id` | Admin | Update product |
| DELETE | `/api/products/:id` | Admin | Delete product |
| GET | `/api/orders` | Admin | List orders |
| GET | `/api/orders/:id` | Auth | Order detail |
| POST | `/api/orders` | Auth | Create order |
| PATCH | `/api/orders/:id/status` | Admin | Update status |
| GET | `/api/users` | Admin | List users |
| PATCH | `/api/users/:id/role` | Admin | Change role |
| PATCH | `/api/users/:id/toggle-block` | Admin | Block/unblock |
| GET | `/api/dashboard/stats` | Admin | Dashboard stats |
| GET | `/api/dashboard/revenue` | Admin | Revenue chart |
| GET | `/api/dashboard/recent-orders` | Admin | Recent orders |
| GET | `/api/dashboard/top-products` | Admin | Top products |
| GET | `/api/settings` | Admin | Get settings |
| PATCH | `/api/settings` | Admin | Update settings |

## Swagger Docs

Visit `http://localhost:3001/api/docs` after starting the server.

## Admin Login

- Email: `admin@nigarfashion.com`
- Password: `admin123`
