# Nigar Fashion World — Admin Dashboard

Standalone React admin dashboard for managing your store.

## Setup

```bash
cd admin
npm install
npm run dev
```

The admin dashboard runs on `http://localhost:5174` by default.

## Connect to Backend

Set the API URL in a `.env` file:

```
VITE_API_URL=http://localhost:3001/api
```

## Features

- 📊 **Dashboard** — Revenue charts, stats, recent orders, top products
- 📦 **Products** — Full CRUD with search, filters, add/edit dialogs
- 🛒 **Orders** — Status management, payment tracking, order detail views
- 👥 **Customers** — Role management, block/unblock users
- ⚙️ **Settings** — Store config, notifications, API URL

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Recharts
- React Router
- Sonner (toasts)
