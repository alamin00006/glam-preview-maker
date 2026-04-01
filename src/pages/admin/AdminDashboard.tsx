import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import StatCard from "@/components/admin/StatCard";
import OrderStatusBadge from "@/components/admin/OrderStatusBadge";
import { mockStats, mockRevenueChart, mockOrders, mockTopProducts } from "@/services/mockData";

const AdminDashboard = () => {
  const stats = mockStats;
  const chart = mockRevenueChart;
  const recentOrders = mockOrders.slice(0, 5);
  const topProducts = mockTopProducts;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="font-body text-sm text-muted-foreground mt-1">Welcome back! Here's your store overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value={`৳${(stats.totalRevenue / 1000).toFixed(0)}K`} change={stats.revenueGrowth} icon={DollarSign} iconBg="bg-green-100 text-green-600" />
        <StatCard title="Total Orders" value={stats.totalOrders.toLocaleString()} change={stats.ordersGrowth} icon={ShoppingCart} iconBg="bg-blue-100 text-blue-600" />
        <StatCard title="Customers" value={stats.totalCustomers.toLocaleString()} change={stats.customersGrowth} icon={Users} iconBg="bg-purple-100 text-purple-600" />
        <StatCard title="Products" value={String(stats.totalProducts)} icon={Package} iconBg="bg-primary/10 text-primary" />
      </div>

      {/* Revenue chart */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">Revenue Overview</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chart}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(330, 70%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(330, 70%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="date" className="font-body text-xs" tick={{ fill: "hsl(340,10%,45%)" }} />
              <YAxis className="font-body text-xs" tick={{ fill: "hsl(340,10%,45%)" }} tickFormatter={(v) => `৳${v / 1000}K`} />
              <Tooltip
                contentStyle={{ background: "hsl(0,0%,100%)", border: "1px solid hsl(340,20%,90%)", borderRadius: "0.5rem", fontFamily: "Poppins" }}
                formatter={(value: number) => [`৳${value.toLocaleString()}`, "Revenue"]}
              />
              <Area type="monotone" dataKey="revenue" stroke="hsl(330, 70%, 50%)" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                <div>
                  <p className="font-body text-sm font-medium text-foreground">{order.orderNumber}</p>
                  <p className="font-body text-xs text-muted-foreground">{order.customer.name}</p>
                </div>
                <div className="text-right flex items-center gap-3">
                  <OrderStatusBadge status={order.status} />
                  <span className="font-body text-sm font-semibold text-foreground">৳{order.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Top Products</h2>
          <div className="space-y-3">
            {topProducts.map((product, i) => (
              <div key={product.id} className="flex items-center gap-4 py-2.5 border-b border-border last:border-0">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-body font-bold">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-medium text-foreground truncate">{product.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{product.sales} sales</p>
                </div>
                <span className="font-body text-sm font-semibold text-foreground">৳{(product.revenue / 1000).toFixed(0)}K</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
