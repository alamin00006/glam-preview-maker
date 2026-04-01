import { useState } from "react";
import { Search, Ban, CheckCircle, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockUsers } from "@/services/mockData";
import type { AppUser } from "@/services/api";

const roleColors: Record<string, string> = {
  admin: "bg-violet-100 text-violet-700 border-violet-200/60",
  moderator: "bg-blue-100 text-blue-700 border-blue-200/60",
  user: "bg-muted text-muted-foreground border-border",
};

const AdminCustomers = () => {
  const [users, setUsers] = useState<AppUser[]>(mockUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const toggleBlock = (id: string) => setUsers(users.map((u) => (u.id === id ? { ...u, isBlocked: !u.isBlocked } : u)));
  const changeRole = (id: string, role: AppUser["role"]) => setUsers(users.map((u) => (u.id === id ? { ...u, role } : u)));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-sans text-2xl font-bold text-foreground tracking-tight">Customers</h1>
        <p className="font-sans text-sm text-muted-foreground mt-1">{users.length} total users</p>
      </div>

      {/* Role tabs */}
      <div className="flex gap-2">
        {["All", "admin", "moderator", "user"].map((r) => (
          <button
            key={r}
            onClick={() => setRoleFilter(r)}
            className={cn(
              "px-4 py-2 rounded-xl font-sans text-sm transition-all capitalize",
              roleFilter === r ? "bg-primary text-primary-foreground font-medium shadow-md shadow-primary/20" : "bg-card border border-border/60 text-muted-foreground hover:border-primary/20"
            )}
          >
            {r === "All" ? "All Roles" : r}
          </button>
        ))}
      </div>

      <div className="relative max-w-[400px]">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="admin-input pl-10" />
      </div>

      {/* User cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((user, i) => (
          <div key={user.id} className={cn("admin-card p-5 animate-fade-in", user.isBlocked && "opacity-60")} style={{ animationDelay: `${i * 40}ms` }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary flex items-center justify-center font-sans font-bold text-sm">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="font-sans text-sm font-semibold text-foreground">{user.name}</p>
                  <p className="font-sans text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              {user.isBlocked
                ? <span className="px-2 py-0.5 rounded-lg text-[10px] font-sans font-semibold bg-red-50 text-red-600 border border-red-200/60">Blocked</span>
                : <span className="px-2 py-0.5 rounded-lg text-[10px] font-sans font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">Active</span>}
            </div>

            <div className="flex items-center gap-4 py-3 border-t border-border/40">
              <div className="flex-1">
                <p className="font-sans text-lg font-bold text-foreground">{user.ordersCount}</p>
                <p className="font-sans text-[10px] text-muted-foreground">Orders</p>
              </div>
              <div className="flex-1 border-l border-border/40 pl-4">
                <p className="font-sans text-lg font-bold text-foreground">৳{(user.totalSpent / 1000).toFixed(1)}K</p>
                <p className="font-sans text-[10px] text-muted-foreground">Spent</p>
              </div>
              <div className="flex-1 border-l border-border/40 pl-4">
                <select value={user.role} onChange={(e) => changeRole(user.id, e.target.value as AppUser["role"])} className="bg-transparent font-sans text-xs font-semibold text-foreground focus:outline-none cursor-pointer w-full">
                  {["user", "moderator", "admin"].map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
                <p className="font-sans text-[10px] text-muted-foreground">Role</p>
              </div>
            </div>

            <button
              onClick={() => toggleBlock(user.id)}
              className={cn(
                "w-full mt-3 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-sans font-medium transition-all",
                user.isBlocked
                  ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200/60"
                  : "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200/60"
              )}
            >
              {user.isBlocked ? <><CheckCircle className="w-3.5 h-3.5" /> Unblock User</> : <><Ban className="w-3.5 h-3.5" /> Block User</>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCustomers;
