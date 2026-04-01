import { cn } from "@/lib/utils";

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-yellow/20 text-yellow-dark border-yellow/30" },
  confirmed: { label: "Confirmed", className: "bg-blue-100 text-blue-700 border-blue-200" },
  shipped: { label: "Shipped", className: "bg-purple-100 text-purple-700 border-purple-200" },
  delivered: { label: "Delivered", className: "bg-green-100 text-green-700 border-green-200" },
  cancelled: { label: "Cancelled", className: "bg-red-100 text-red-700 border-red-200" },
  paid: { label: "Paid", className: "bg-green-100 text-green-700 border-green-200" },
  unpaid: { label: "Unpaid", className: "bg-yellow/20 text-yellow-dark border-yellow/30" },
  refunded: { label: "Refunded", className: "bg-gray-100 text-gray-600 border-gray-200" },
};

const OrderStatusBadge = ({ status }: { status: string }) => {
  const config = statusConfig[status] || { label: status, className: "bg-muted text-muted-foreground" };
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body font-medium border", config.className)}>
      {config.label}
    </span>
  );
};

export default OrderStatusBadge;
