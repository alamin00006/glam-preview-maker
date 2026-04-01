import {
  LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, ChevronLeft,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Products", icon: Package, path: "/products" },
  { title: "Orders", icon: ShoppingCart, path: "/orders" },
  { title: "Customers", icon: Users, path: "/customers" },
  { title: "Settings", icon: Settings, path: "/settings" },
];

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

const AdminSidebar = ({ collapsed, onToggle }: Props) => {
  const { pathname } = useLocation();

  return (
    <aside className={cn("fixed left-0 top-0 z-40 h-screen border-r border-border bg-card transition-all duration-300 flex flex-col", collapsed ? "w-[68px]" : "w-[250px]")}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border">
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-sm shrink-0">N</div>
        {!collapsed && (
          <span className="font-display text-base font-semibold text-foreground truncate">
            <span className="text-gold">Nigar</span> Admin
          </span>
        )}
        <button onClick={onToggle} className={cn("ml-auto p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground", collapsed && "ml-0")}>
          <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-all",
                active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="truncate">{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-2">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body text-destructive hover:bg-destructive/10 transition-all w-full">
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
