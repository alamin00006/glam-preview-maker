import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  value: string;
  change?: number;
  icon: LucideIcon;
  iconBg?: string;
  gradient?: string;
}

const StatCard = ({ title, value, change, icon: Icon, iconBg = "bg-primary/10 text-primary", gradient }: Props) => (
  <div className={cn(
    "admin-card p-5 group relative overflow-hidden",
    gradient && "border-0"
  )} style={gradient ? { background: gradient } : undefined}>
    {/* Subtle decorative circle */}
    <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />
    
    <div className="flex items-start justify-between relative z-10">
      <div>
        <p className={cn("text-xs font-sans font-medium uppercase tracking-wider", gradient ? "text-primary-foreground/70" : "text-muted-foreground")}>{title}</p>
        <p className={cn("text-3xl font-sans font-bold mt-2 tracking-tight", gradient ? "text-primary-foreground" : "text-foreground")}>{value}</p>
        {change !== undefined && (
          <div className={cn(
            "inline-flex items-center gap-1.5 mt-3 px-2 py-0.5 rounded-full text-xs font-sans font-semibold",
            change >= 0
              ? "bg-green-500/10 text-green-600"
              : "bg-destructive/10 text-destructive"
          )}>
            {change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <div className={cn("p-3 rounded-2xl", iconBg)}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  </div>
);

export default StatCard;
