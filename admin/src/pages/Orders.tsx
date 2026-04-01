import { useState } from "react";
import { Search, Eye } from "lucide-react";
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

  const updateStatus = (id: string, status: Order["status"]) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Orders</h1>
        <p className="font-body text-sm text-muted-foreground mt-1">{orders.length} total orders</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring">
          {statuses.map((s) => <option key={s} value={s}>{s === "All" ? "All Status" : s}</option>)}
        </select>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              {["Order", "Customer", "Items", "Total", "Status", "Payment", "Date", ""].map((h, i) => (
                <th key={i} className={cn("px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground uppercase tracking-wider", i === 7 && "text-right")}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-body text-sm font-medium">{order.orderNumber}</td>
                <td className="px-4 py-3">
                  <p className="font-body text-sm text-foreground">{order.customer.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{order.customer.phone}</p>
                </td>
                <td className="px-4 py-3 font-body text-sm">{order.items.length} items</td>
                <td className="px-4 py-3 font-body text-sm font-semibold">৳{order.total}</td>
                <td className="px-4 py-3">
                  <select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value as Order["status"])} className="bg-transparent border-0 font-body text-xs focus:outline-none cursor-pointer">
                    {statuses.filter((s) => s !== "All").map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3"><OrderStatusBadge status={order.paymentStatus} /></td>
                <td className="px-4 py-3 font-body text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setViewOrder(order)} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"><Eye className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={() => setViewOrder(null)}>
          <div className="bg-card rounded-xl border border-border p-6 w-full max-w-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-lg font-semibold mb-4">Order {viewOrder.orderNumber}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-body text-xs text-muted-foreground">Customer</p>
                  <p className="font-body text-sm font-medium">{viewOrder.customer.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{viewOrder.customer.email}</p>
                  <p className="font-body text-xs text-muted-foreground">{viewOrder.customer.phone}</p>
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground">Shipping</p>
                  <p className="font-body text-sm">{viewOrder.shippingAddress}</p>
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <p className="font-body text-sm font-medium mb-2">Items</p>
                {viewOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between py-1.5 font-body text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span className="font-semibold">৳{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="flex justify-between py-2 border-t border-border mt-2 font-body text-base font-bold">
                  <span>Total</span><span>৳{viewOrder.total}</span>
                </div>
              </div>
            </div>
            <button onClick={() => setViewOrder(null)} className="mt-4 w-full py-2 rounded-lg border border-border font-body text-sm hover:bg-muted transition-colors">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
