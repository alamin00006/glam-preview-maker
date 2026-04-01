import { useState } from "react";
import { Search, Eye, ChevronDown } from "lucide-react";
import { mockOrders } from "@/services/mockData";
import type { Order } from "@/services/api";
import OrderStatusBadge from "@/components/admin/OrderStatusBadge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const statuses = ["All", "pending", "confirmed", "shipped", "delivered", "cancelled"];

const AdminOrders = () => {
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
          <Input placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 font-body" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px] font-body"><SelectValue /></SelectTrigger>
          <SelectContent>
            {statuses.map((s) => (
              <SelectItem key={s} value={s} className="font-body capitalize">{s === "All" ? "All Status" : s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-body">Order</TableHead>
              <TableHead className="font-body">Customer</TableHead>
              <TableHead className="font-body">Items</TableHead>
              <TableHead className="font-body">Total</TableHead>
              <TableHead className="font-body">Status</TableHead>
              <TableHead className="font-body">Payment</TableHead>
              <TableHead className="font-body">Date</TableHead>
              <TableHead className="font-body text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((order) => (
              <TableRow key={order.id} className="hover:bg-muted/30">
                <TableCell className="font-body text-sm font-medium">{order.orderNumber}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-body text-sm text-foreground">{order.customer.name}</p>
                    <p className="font-body text-xs text-muted-foreground">{order.customer.phone}</p>
                  </div>
                </TableCell>
                <TableCell className="font-body text-sm">{order.items.length} items</TableCell>
                <TableCell className="font-body text-sm font-semibold">৳{order.total}</TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onValueChange={(v) => updateStatus(order.id, v as Order["status"])}
                  >
                    <SelectTrigger className="w-[130px] h-8 font-body text-xs border-0 bg-transparent p-0">
                      <OrderStatusBadge status={order.status} />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.filter((s) => s !== "All").map((s) => (
                        <SelectItem key={s} value={s} className="font-body capitalize">{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell><OrderStatusBadge status={order.paymentStatus} /></TableCell>
                <TableCell className="font-body text-xs text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <button onClick={() => setViewOrder(order)} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                    <Eye className="w-4 h-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Order Detail Dialog */}
      <Dialog open={!!viewOrder} onOpenChange={() => setViewOrder(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">Order {viewOrder?.orderNumber}</DialogTitle>
          </DialogHeader>
          {viewOrder && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-body text-xs text-muted-foreground">Customer</p>
                  <p className="font-body text-sm font-medium">{viewOrder.customer.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{viewOrder.customer.email}</p>
                  <p className="font-body text-xs text-muted-foreground">{viewOrder.customer.phone}</p>
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground">Shipping Address</p>
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
                  <span>Total</span>
                  <span>৳{viewOrder.total}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
