import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  value: string;
  change?: number;
  icon: LucideIcon;
  iconBg?: string;
}

const StatCard = ({ title, value, change, icon: Icon, iconBg = "bg-primary/10 text-primary" }: Props) => (
  <div className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-body text-muted-foreground">{title}</p>
        <p className="text-2xl font-display font-bold text-foreground mt-1">{value}</p>
        {change !== undefined && (
          <div className={cn("flex items-center gap-1 mt-2 text-xs font-body font-medium", change >= 0 ? "text-green-600" : "text-destructive")}>
            {change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{Math.abs(change)}%</span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        )}
      </div>
      <div className={cn("p-3 rounded-lg", iconBg)}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  </div>
);

export default StatCard;
