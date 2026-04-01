import {
  LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, ChevronLeft, Sparkles,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { title: "Products", icon: Package, path: "/admin/products" },
  { title: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  { title: "Customers", icon: Users, path: "/admin/customers" },
  { title: "Settings", icon: Settings, path: "/admin/settings" },
];

interface Props { collapsed: boolean; onToggle: () => void; }

const AdminSidebar = ({ collapsed, onToggle }: Props) => {
  const { pathname } = useLocation();

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen bg-admin-sidebar transition-all duration-300 flex flex-col",
      collapsed ? "w-[72px]" : "w-[260px]"
    )}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-pink-dark flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <span className="font-display text-base font-bold text-primary-foreground tracking-tight">
              Nigar<span className="text-gold"> Admin</span>
            </span>
            <p className="text-[10px] text-admin-sidebar-foreground font-sans mt-0.5">Fashion Dashboard</p>
          </div>
        )}
        <button onClick={onToggle} className={cn("ml-auto p-2 rounded-xl hover:bg-admin-sidebar-hover transition-colors", collapsed && "ml-0")}>
          <ChevronLeft className={cn("w-4 h-4 text-admin-sidebar-foreground transition-transform duration-300", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* Nav label */}
      {!collapsed && (
        <p className="px-5 pt-2 pb-2 text-[10px] uppercase tracking-[0.15em] font-sans font-semibold text-admin-sidebar-foreground/50">
          Menu
        </p>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.path || (item.path !== "/admin" && pathname.startsWith(item.path));
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-sans transition-all duration-200 relative",
                active
                  ? "bg-gradient-to-r from-primary/20 to-primary/5 text-primary-foreground font-medium"
                  : "text-admin-sidebar-foreground hover:bg-admin-sidebar-hover hover:text-primary-foreground"
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-primary" />
              )}
              <item.icon className={cn("w-[18px] h-[18px] shrink-0 transition-colors", active ? "text-primary" : "text-admin-sidebar-foreground group-hover:text-primary")} />
              {!collapsed && <span className="truncate">{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 space-y-1">
        {!collapsed && (
          <div className="mx-2 mb-3 p-3 rounded-xl bg-gradient-to-br from-primary/15 to-pink-dark/10 border border-primary/10">
            <p className="text-xs font-sans font-medium text-primary-foreground">Need help?</p>
            <p className="text-[10px] text-admin-sidebar-foreground mt-0.5">Check our documentation</p>
          </div>
        )}
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-sans text-red-400 hover:bg-red-500/10 transition-all w-full">
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
