import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { cn } from "@/lib/utils";
import { Bell, Search } from "lucide-react";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <main className={cn("transition-all duration-300 min-h-screen", collapsed ? "ml-[72px]" : "ml-[260px]")}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/40 px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between max-w-[1400px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Search anything..."
                className="admin-input pl-10 w-[300px] bg-muted/50"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2.5 rounded-xl hover:bg-muted transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-pulse" />
              </button>
              <div className="flex items-center gap-3 pl-3 border-l border-border">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-pink-dark flex items-center justify-center text-primary-foreground font-sans font-semibold text-sm">
                  A
                </div>
                <div className="hidden sm:block">
                  <p className="font-sans text-sm font-medium text-foreground">Admin</p>
                  <p className="font-sans text-xs text-muted-foreground">admin@nigar.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="p-6 lg:p-8 max-w-[1400px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
