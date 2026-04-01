import { useState } from "react";
import { Search, Ban, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockUsers } from "@/services/mockData";
import type { AppUser } from "@/services/api";

const roleColors: Record<string, string> = {
  admin: "bg-purple-100 text-purple-700",
  moderator: "bg-blue-100 text-blue-700",
  user: "bg-muted text-muted-foreground",
};

const Customers = () => {
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
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Customers</h1>
        <p className="font-body text-sm text-muted-foreground mt-1">{users.length} total users</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring">
          {["All", "admin", "moderator", "user"].map((r) => <option key={r} value={r}>{r === "All" ? "All Roles" : r}</option>)}
        </select>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              {["User", "Phone", "Role", "Orders", "Total Spent", "Status", "Actions"].map((h) => (
                <th key={h} className={cn("px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground uppercase tracking-wider", h === "Actions" && "text-right")}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id} className={cn("border-b border-border hover:bg-muted/30 transition-colors", user.isBlocked && "opacity-60")}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-body font-bold text-sm">{user.name.charAt(0)}</div>
                    <div>
                      <p className="font-body text-sm font-medium text-foreground">{user.name}</p>
                      <p className="font-body text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 font-body text-sm text-muted-foreground">{user.phone}</td>
                <td className="px-4 py-3">
                  <select value={user.role} onChange={(e) => changeRole(user.id, e.target.value as AppUser["role"])} className="bg-transparent border-0 font-body text-xs focus:outline-none cursor-pointer">
                    {["user", "moderator", "admin"].map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3 font-body text-sm">{user.ordersCount}</td>
                <td className="px-4 py-3 font-body text-sm font-semibold">৳{user.totalSpent.toLocaleString()}</td>
                <td className="px-4 py-3">
                  {user.isBlocked
                    ? <span className="px-2.5 py-0.5 rounded-full text-xs font-body font-medium bg-red-100 text-red-700">Blocked</span>
                    : <span className="px-2.5 py-0.5 rounded-full text-xs font-body font-medium bg-green-100 text-green-700">Active</span>}
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => toggleBlock(user.id)} className={cn("flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-body ml-auto transition-colors", user.isBlocked ? "text-green-600 hover:bg-green-50" : "text-destructive hover:bg-destructive/10")}>
                    {user.isBlocked ? <><CheckCircle className="w-3.5 h-3.5" /> Unblock</> : <><Ban className="w-3.5 h-3.5" /> Block</>}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
