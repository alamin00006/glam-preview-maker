import { DollarSign, ShoppingCart, Users, Package, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import StatCard from "@/components/StatCard";
import OrderStatusBadge from "@/components/OrderStatusBadge";
import { mockStats, mockRevenueChart, mockOrders, mockTopProducts } from "@/services/mockData";

const Dashboard = () => {
  const stats = mockStats;
  const chart = mockRevenueChart;
  const recentOrders = mockOrders.slice(0, 5);
  const topProducts = mockTopProducts;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-sans text-2xl font-bold text-foreground tracking-tight">Dashboard</h1>
        <p className="font-sans text-sm text-muted-foreground mt-1">Welcome back! Here's your store overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Revenue" value={`৳${(stats.totalRevenue / 1000).toFixed(0)}K`} change={stats.revenueGrowth} icon={DollarSign} gradient="linear-gradient(135deg, hsl(330 70% 50%), hsl(330 65% 35%))" iconBg="bg-primary-foreground/20 text-primary-foreground" />
        <StatCard title="Orders" value={stats.totalOrders.toLocaleString()} change={stats.ordersGrowth} icon={ShoppingCart} iconBg="bg-blue-100 text-blue-600" />
        <StatCard title="Customers" value={stats.totalCustomers.toLocaleString()} change={stats.customersGrowth} icon={Users} iconBg="bg-violet-100 text-violet-600" />
        <StatCard title="Products" value={String(stats.totalProducts)} icon={Package} iconBg="bg-amber-100 text-amber-600" />
      </div>

      <div className="admin-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-sans text-lg font-semibold text-foreground">Revenue Overview</h2>
            <p className="font-sans text-xs text-muted-foreground mt-0.5">Last 7 days performance</p>
          </div>
          <div className="flex gap-1.5 bg-muted/60 rounded-xl p-1">
            {["7D", "30D", "90D"].map((p, i) => (
              <button key={p} className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all ${i === 0 ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>{p}</button>
            ))}
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chart}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(330, 70%, 50%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(330, 70%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(340, 20%, 92%)" vertical={false} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "hsl(340,10%,55%)", fontSize: 12, fontFamily: "Inter" }} dy={8} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(340,10%,55%)", fontSize: 12, fontFamily: "Inter" }} tickFormatter={(v) => `৳${v / 1000}K`} dx={-8} />
              <Tooltip contentStyle={{ background: "hsl(0,0%,100%)", border: "1px solid hsl(340,20%,92%)", borderRadius: "12px", fontFamily: "Inter", fontSize: "13px", boxShadow: "0 8px 30px -4px rgba(0,0,0,0.1)", padding: "12px 16px" }} formatter={(value: number) => [`৳${value.toLocaleString()}`, "Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(330, 70%, 50%)" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: "hsl(330, 70%, 50%)", stroke: "#fff", strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="admin-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-sans text-base font-semibold text-foreground">Recent Orders</h2>
            <button className="flex items-center gap-1 text-xs font-sans font-medium text-primary hover:text-pink-dark transition-colors">View all <ArrowUpRight className="w-3 h-3" /></button>
          </div>
          {recentOrders.map((order, i) => (
            <div key={order.id} className="flex items-center justify-between py-3.5 border-b border-border/40 last:border-0 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center font-sans text-xs font-bold text-muted-foreground">{order.customer.name.charAt(0)}</div>
                <div>
                  <p className="font-sans text-sm font-medium text-foreground">{order.orderNumber}</p>
                  <p className="font-sans text-xs text-muted-foreground">{order.customer.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <OrderStatusBadge status={order.status} />
                <span className="font-sans text-sm font-bold text-foreground min-w-[60px] text-right">৳{order.total}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="admin-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-sans text-base font-semibold text-foreground">Top Products</h2>
            <button className="flex items-center gap-1 text-xs font-sans font-medium text-primary hover:text-pink-dark transition-colors">View all <ArrowUpRight className="w-3 h-3" /></button>
          </div>
          {topProducts.map((product, i) => (
            <div key={product.id} className="flex items-center gap-4 py-3.5 border-b border-border/40 last:border-0 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary flex items-center justify-center text-xs font-sans font-bold">#{i + 1}</div>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-sm font-medium text-foreground truncate">{product.name}</p>
                <p className="font-sans text-xs text-muted-foreground">{product.sales} sales</p>
              </div>
              <span className="font-sans text-sm font-bold text-foreground">৳{(product.revenue / 1000).toFixed(0)}K</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
