// Mock data for development — remove when NestJS backend is connected
import type {
  DashboardStats,
  RevenueChartData,
  Order,
  TopProduct,
  AppUser,
  Product,
} from "./api";

export const mockStats: DashboardStats = {
  totalRevenue: 847500,
  totalOrders: 1284,
  totalCustomers: 3567,
  totalProducts: 48,
  revenueGrowth: 12.5,
  ordersGrowth: 8.3,
  customersGrowth: 15.2,
};

export const mockRevenueChart: RevenueChartData[] = [
  { date: "Mar 25", revenue: 85000, orders: 142 },
  { date: "Mar 26", revenue: 92000, orders: 158 },
  { date: "Mar 27", revenue: 78000, orders: 131 },
  { date: "Mar 28", revenue: 110000, orders: 189 },
  { date: "Mar 29", revenue: 95000, orders: 164 },
  { date: "Mar 30", revenue: 125000, orders: 210 },
  { date: "Mar 31", revenue: 118000, orders: 195 },
];

export const mockOrders: Order[] = [
  {
    id: "ord-001",
    orderNumber: "NFW-2026-001",
    customer: { name: "Ayesha Rahman", email: "ayesha@email.com", phone: "+880 1711-111111" },
    items: [
      { productId: "lip-01", name: "Velvet Matte Lipstick", quantity: 2, price: 699 },
      { productId: "spray-01", name: "Setting Spray", quantity: 1, price: 1299 },
    ],
    total: 2697,
    status: "confirmed",
    paymentStatus: "paid",
    createdAt: "2026-03-31T10:30:00Z",
    shippingAddress: "House 12, Road 5, Dhanmondi, Dhaka",
  },
  {
    id: "ord-002",
    orderNumber: "NFW-2026-002",
    customer: { name: "Nadia Hossain", email: "nadia@email.com", phone: "+880 1722-222222" },
    items: [
      { productId: "pal-01", name: "Eyeshadow Palette", quantity: 1, price: 2499 },
    ],
    total: 2499,
    status: "pending",
    paymentStatus: "unpaid",
    createdAt: "2026-03-31T09:15:00Z",
    shippingAddress: "Flat 4B, Uttara Sector 7, Dhaka",
  },
  {
    id: "ord-003",
    orderNumber: "NFW-2026-003",
    customer: { name: "Sabrina Karim", email: "sabrina@email.com", phone: "+880 1733-333333" },
    items: [
      { productId: "fnd-01", name: "Full Coverage Foundation", quantity: 1, price: 1599 },
      { productId: "conc-01", name: "HD Pro Concealer", quantity: 1, price: 799 },
      { productId: "blush-01", name: "Silk Finish Blush", quantity: 1, price: 999 },
    ],
    total: 3397,
    status: "shipped",
    paymentStatus: "paid",
    createdAt: "2026-03-30T14:20:00Z",
    shippingAddress: "House 8, Gulshan 2, Dhaka",
  },
  {
    id: "ord-004",
    orderNumber: "NFW-2026-004",
    customer: { name: "Tasnim Akter", email: "tasnim@email.com", phone: "+880 1744-444444" },
    items: [
      { productId: "mas-01", name: "Volume Mascara", quantity: 2, price: 899 },
    ],
    total: 1798,
    status: "delivered",
    paymentStatus: "paid",
    createdAt: "2026-03-29T11:45:00Z",
    shippingAddress: "Mirpur 10, Dhaka",
  },
  {
    id: "ord-005",
    orderNumber: "NFW-2026-005",
    customer: { name: "Raisa Begum", email: "raisa@email.com", phone: "+880 1755-555555" },
    items: [
      { productId: "lip-01", name: "Velvet Matte Lipstick", quantity: 1, price: 699 },
    ],
    total: 699,
    status: "cancelled",
    paymentStatus: "refunded",
    createdAt: "2026-03-28T16:00:00Z",
    shippingAddress: "Bashundhara R/A, Dhaka",
  },
];

export const mockTopProducts: TopProduct[] = [
  { id: "lip-01", name: "Velvet Matte Lipstick", image: "", sales: 512, revenue: 357888 },
  { id: "blush-01", name: "Silk Finish Blush", image: "", sales: 423, revenue: 422577 },
  { id: "fnd-01", name: "Full Coverage Foundation", image: "", sales: 345, revenue: 551655 },
  { id: "spray-01", name: "Setting Spray", image: "", sales: 234, revenue: 303966 },
  { id: "conc-01", name: "HD Pro Concealer", image: "", sales: 267, revenue: 213333 },
];

export const mockUsers: AppUser[] = [
  {
    id: "usr-001", name: "Ayesha Rahman", email: "ayesha@email.com", phone: "+880 1711-111111",
    role: "user", isBlocked: false, ordersCount: 12, totalSpent: 24500, createdAt: "2025-06-15T00:00:00Z",
  },
  {
    id: "usr-002", name: "Nadia Hossain", email: "nadia@email.com", phone: "+880 1722-222222",
    role: "user", isBlocked: false, ordersCount: 8, totalSpent: 18200, createdAt: "2025-08-20T00:00:00Z",
  },
  {
    id: "usr-003", name: "Sabrina Karim", email: "sabrina@email.com", phone: "+880 1733-333333",
    role: "moderator", isBlocked: false, ordersCount: 25, totalSpent: 65000, createdAt: "2025-03-10T00:00:00Z",
  },
  {
    id: "usr-004", name: "Tasnim Akter", email: "tasnim@email.com", phone: "+880 1744-444444",
    role: "user", isBlocked: true, ordersCount: 2, totalSpent: 3500, createdAt: "2026-01-05T00:00:00Z",
  },
  {
    id: "usr-005", name: "Raisa Begum", email: "raisa@email.com", phone: "+880 1755-555555",
    role: "admin", isBlocked: false, ordersCount: 0, totalSpent: 0, createdAt: "2025-01-01T00:00:00Z",
  },
];

export const mockProducts: Product[] = [
  {
    id: "spray-01", name: "Makeup Setting Spray Long Lasting", brand: "Nigar Beauty",
    image: "", price: 1299, oldPrice: 1899, rating: 4.5, reviews: 234, tag: "Best Seller",
    category: "Face", stock: 150, status: "active", createdAt: "2025-10-01T00:00:00Z",
    description: "Lock your look in place all day.",
  },
  {
    id: "lip-01", name: "Velvet Matte Lipstick Waterproof", brand: "Nigar Cosmetics",
    image: "", price: 699, oldPrice: 999, rating: 4.8, reviews: 512, tag: "Trending",
    category: "Lips", stock: 320, status: "active", createdAt: "2025-09-15T00:00:00Z",
    description: "Cult-loved matte lipstick.",
  },
  {
    id: "pal-01", name: "Warm Tone Eyeshadow Palette", brand: "Nigar Eyes",
    image: "", price: 2499, oldPrice: 3499, rating: 4.7, reviews: 189,
    category: "Eyes", stock: 85, status: "active", createdAt: "2025-11-01T00:00:00Z",
    description: "12 warm-toned shades.",
  },
  {
    id: "fnd-01", name: "Flawless Full Coverage Foundation", brand: "Nigar Skin",
    image: "", price: 1599, oldPrice: 2199, rating: 4.6, reviews: 345, tag: "New",
    category: "Face", stock: 200, status: "active", createdAt: "2026-01-01T00:00:00Z",
    description: "Flawless natural-looking finish.",
  },
  {
    id: "mas-01", name: "Volume & Length Mascara", brand: "Nigar Eyes",
    image: "", price: 899, rating: 4.4, reviews: 156,
    category: "Eyes", stock: 0, status: "draft", createdAt: "2026-02-01T00:00:00Z",
    description: "Dramatic volume and length.",
  },
  {
    id: "blush-01", name: "Silk Finish Blush Natural Glow", brand: "Nigar Glow",
    image: "", price: 999, oldPrice: 1499, rating: 4.9, reviews: 423, tag: "Hot",
    category: "Face", stock: 180, status: "active", createdAt: "2025-08-01T00:00:00Z",
    description: "Silky-smooth powder blush.",
  },
];
