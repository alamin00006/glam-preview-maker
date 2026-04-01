import { useState } from "react";
import { Search, Eye, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockOrders } from "@/services/mockData";
import type { Order } from "@/services/api";
import OrderStatusBadge from "@/components/OrderStatusBadge";

const statuses = ["All", "pending", "confirmed", "shipped", "delivered", "cancelled"];

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  const filtered = orders.filter((o) => {
    const matchSearch = o.orderNumber.toLowerCase().includes(search.toLowerCase()) || o.customer.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, status: Order["status"]) => setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));

  const statusCounts = {
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-sans text-2xl font-bold text-foreground tracking-tight">Orders</h1>
        <p className="font-sans text-sm text-muted-foreground mt-1">{orders.length} total orders</p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button key={status} onClick={() => setStatusFilter(statusFilter === status ? "All" : status)} className={cn("flex items-center gap-2 px-4 py-2 rounded-xl border font-sans text-sm transition-all shrink-0", statusFilter === status ? "bg-primary/10 border-primary/30 text-primary font-medium" : "bg-card border-border/60 text-muted-foreground hover:border-primary/20")}>
            <span className="capitalize">{status}</span>
            <span className={cn("px-1.5 py-0.5 rounded-md text-xs font-bold", statusFilter === status ? "bg-primary/20" : "bg-muted")}>{count}</span>
          </button>
        ))}
      </div>

      <div className="relative max-w-[400px]">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)} className="admin-input pl-10" />
      </div>

      <div className="space-y-3">
        {filtered.map((order, i) => (
          <div key={order.id} className="admin-card p-5 animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center"><ShoppingCart className="w-5 h-5 text-primary" /></div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-sans text-sm font-bold text-foreground">{order.orderNumber}</p>
                    <OrderStatusBadge status={order.paymentStatus} />
                  </div>
                  <p className="font-sans text-xs text-muted-foreground mt-0.5">{order.customer.name} · {order.items.length} items · {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value as Order["status"])} className="admin-input w-[130px] text-xs py-1.5">
                  {statuses.filter((s) => s !== "All").map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <p className="font-sans text-base font-bold text-foreground min-w-[70px] text-right">৳{order.total}</p>
                <button onClick={() => setViewOrder(order)} className="p-2.5 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"><Eye className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {viewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={() => setViewOrder(null)}>
          <div className="bg-card rounded-2xl border border-border/60 p-6 w-full max-w-lg shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-sans text-lg font-bold mb-4">Order {viewOrder.orderNumber}</h2>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted/40">
                  <p className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Customer</p>
                  <p className="font-sans text-sm font-semibold mt-1">{viewOrder.customer.name}</p>
                  <p className="font-sans text-xs text-muted-foreground">{viewOrder.customer.email}</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/40">
                  <p className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Shipping</p>
                  <p className="font-sans text-sm mt-1">{viewOrder.shippingAddress}</p>
                </div>
              </div>
              <div>
                {viewOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between py-2.5 border-b border-border/40 last:border-0 font-sans text-sm">
                    <span>{item.name} <span className="text-muted-foreground">× {item.quantity}</span></span>
                    <span className="font-semibold">৳{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="flex justify-between py-3 mt-2 bg-muted/40 rounded-xl px-4 font-sans text-base font-bold"><span>Total</span><span>৳{viewOrder.total}</span></div>
              </div>
            </div>
            <button onClick={() => setViewOrder(null)} className="admin-btn-ghost w-full mt-4 justify-center">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
