import { cn } from "@/lib/utils";

const statusConfig: Record<string, { label: string; className: string; dot: string }> = {
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700 border-amber-200/60", dot: "bg-amber-500" },
  confirmed: { label: "Confirmed", className: "bg-blue-50 text-blue-700 border-blue-200/60", dot: "bg-blue-500" },
  shipped: { label: "Shipped", className: "bg-violet-50 text-violet-700 border-violet-200/60", dot: "bg-violet-500" },
  delivered: { label: "Delivered", className: "bg-emerald-50 text-emerald-700 border-emerald-200/60", dot: "bg-emerald-500" },
  cancelled: { label: "Cancelled", className: "bg-red-50 text-red-700 border-red-200/60", dot: "bg-red-500" },
  paid: { label: "Paid", className: "bg-emerald-50 text-emerald-700 border-emerald-200/60", dot: "bg-emerald-500" },
  unpaid: { label: "Unpaid", className: "bg-amber-50 text-amber-700 border-amber-200/60", dot: "bg-amber-500" },
  refunded: { label: "Refunded", className: "bg-gray-50 text-gray-600 border-gray-200/60", dot: "bg-gray-400" },
};

const OrderStatusBadge = ({ status }: { status: string }) => {
  const config = statusConfig[status] || { label: status, className: "bg-muted text-muted-foreground", dot: "bg-muted-foreground" };
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-sans font-semibold border", config.className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
      {config.label}
    </span>
  );
};

export default OrderStatusBadge;
