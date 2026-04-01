// API Service Layer — connect to your NestJS backend
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem("admin_token");
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || "API Error");
  }
  return res.json();
}

// ---- Auth ----
export const authApi = {
  login: (email: string, password: string) =>
    request<{ token: string; user: AdminUser }>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
};

// ---- Products ----
export const productsApi = {
  getAll: (params?: { page?: number; limit?: number; category?: string; search?: string }) => {
    const q = new URLSearchParams();
    if (params?.page) q.set("page", String(params.page));
    if (params?.limit) q.set("limit", String(params.limit));
    if (params?.category) q.set("category", params.category);
    if (params?.search) q.set("search", params.search);
    return request<PaginatedResponse<Product>>(`/products?${q}`);
  },
  getById: (id: string) => request<Product>(`/products/${id}`),
  create: (data: ProductInput) => request<Product>("/products", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<ProductInput>) => request<Product>(`/products/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  delete: (id: string) => request<void>(`/products/${id}`, { method: "DELETE" }),
};

// ---- Orders ----
export const ordersApi = {
  getAll: (params?: { page?: number; status?: string }) => {
    const q = new URLSearchParams();
    if (params?.page) q.set("page", String(params.page));
    if (params?.status) q.set("status", params.status);
    return request<PaginatedResponse<Order>>(`/orders?${q}`);
  },
  getById: (id: string) => request<Order>(`/orders/${id}`),
  updateStatus: (id: string, status: string) => request<Order>(`/orders/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
};

// ---- Users ----
export const usersApi = {
  getAll: (params?: { page?: number; search?: string; role?: string }) => {
    const q = new URLSearchParams();
    if (params?.page) q.set("page", String(params.page));
    if (params?.search) q.set("search", params.search);
    if (params?.role) q.set("role", params.role);
    return request<PaginatedResponse<AppUser>>(`/users?${q}`);
  },
  updateRole: (id: string, role: string) => request<AppUser>(`/users/${id}/role`, { method: "PATCH", body: JSON.stringify({ role }) }),
  toggleBlock: (id: string) => request<AppUser>(`/users/${id}/toggle-block`, { method: "PATCH" }),
};

// ---- Dashboard ----
export const dashboardApi = {
  getStats: () => request<DashboardStats>("/dashboard/stats"),
  getRevenueChart: (period?: string) => request<RevenueChartData[]>(`/dashboard/revenue?period=${period || "7d"}`),
  getRecentOrders: () => request<Order[]>("/dashboard/recent-orders"),
  getTopProducts: () => request<TopProduct[]>("/dashboard/top-products"),
};

// ---- Settings ----
export const settingsApi = {
  getAll: () => request<Record<string, string>>("/settings"),
  update: (data: Record<string, string>) => request<Record<string, string>>("/settings", { method: "PATCH", body: JSON.stringify(data) }),
};

// ---- Types ----
export interface AdminUser { id: string; name: string; email: string; role: string; avatar?: string; }
export interface Product {
  id: string; name: string; brand: string; image: string; price: number; oldPrice?: number;
  rating: number; reviews: number; tag?: string; colors?: string[]; category: string;
  description?: string; details?: string[]; stock: number; status: "active" | "draft" | "archived"; createdAt: string;
}
export interface ProductInput {
  name: string; brand: string; image: string; price: number; oldPrice?: number; category: string;
  description?: string; details?: string[]; colors?: string[]; tag?: string; stock: number; status: "active" | "draft" | "archived";
}
export interface Order {
  id: string; orderNumber: string; customer: { name: string; email: string; phone: string };
  items: { productId: string; name: string; quantity: number; price: number }[];
  total: number; status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "paid" | "unpaid" | "refunded"; createdAt: string; shippingAddress: string;
}
export interface AppUser {
  id: string; name: string; email: string; phone: string; role: "user" | "admin" | "moderator";
  isBlocked: boolean; avatar?: string; ordersCount: number; totalSpent: number; createdAt: string;
}
export interface DashboardStats {
  totalRevenue: number; totalOrders: number; totalCustomers: number; totalProducts: number;
  revenueGrowth: number; ordersGrowth: number; customersGrowth: number;
}
export interface RevenueChartData { date: string; revenue: number; orders: number; }
export interface TopProduct { id: string; name: string; image: string; sales: number; revenue: number; }
export interface PaginatedResponse<T> { data: T[]; total: number; page: number; limit: number; totalPages: number; }
