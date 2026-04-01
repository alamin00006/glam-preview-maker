import { useState } from "react";
import { Search, Shield, ShieldOff, Ban, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockUsers } from "@/services/mockData";
import type { AppUser } from "@/services/api";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const roleColors: Record<string, string> = {
  admin: "bg-purple-100 text-purple-700",
  moderator: "bg-blue-100 text-blue-700",
  user: "bg-muted text-muted-foreground",
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

  const toggleBlock = (id: string) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, isBlocked: !u.isBlocked } : u)));
  };

  const changeRole = (id: string, role: AppUser["role"]) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, role } : u)));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Customers</h1>
        <p className="font-body text-sm text-muted-foreground mt-1">{users.length} total users</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 font-body" />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[140px] font-body"><SelectValue /></SelectTrigger>
          <SelectContent>
            {["All", "admin", "moderator", "user"].map((r) => (
              <SelectItem key={r} value={r} className="font-body capitalize">{r === "All" ? "All Roles" : r}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-body">User</TableHead>
              <TableHead className="font-body">Phone</TableHead>
              <TableHead className="font-body">Role</TableHead>
              <TableHead className="font-body">Orders</TableHead>
              <TableHead className="font-body">Total Spent</TableHead>
              <TableHead className="font-body">Status</TableHead>
              <TableHead className="font-body text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((user) => (
              <TableRow key={user.id} className={cn("hover:bg-muted/30", user.isBlocked && "opacity-60")}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-body font-bold text-sm">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-body text-sm font-medium text-foreground">{user.name}</p>
                      <p className="font-body text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-body text-sm text-muted-foreground">{user.phone}</TableCell>
                <TableCell>
                  <Select value={user.role} onValueChange={(v) => changeRole(user.id, v as AppUser["role"])}>
                    <SelectTrigger className="w-[120px] h-8 border-0 bg-transparent p-0 font-body">
                      <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", roleColors[user.role])}>
                        {user.role}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      {["user", "moderator", "admin"].map((r) => (
                        <SelectItem key={r} value={r} className="font-body capitalize">{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="font-body text-sm">{user.ordersCount}</TableCell>
                <TableCell className="font-body text-sm font-semibold">৳{user.totalSpent.toLocaleString()}</TableCell>
                <TableCell>
                  {user.isBlocked ? (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-body font-medium bg-red-100 text-red-700">Blocked</span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-body font-medium bg-green-100 text-green-700">Active</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleBlock(user.id)}
                    className={cn("font-body text-xs gap-1", user.isBlocked ? "text-green-600 hover:text-green-700" : "text-destructive hover:text-destructive")}
                  >
                    {user.isBlocked ? <CheckCircle className="w-3.5 h-3.5" /> : <Ban className="w-3.5 h-3.5" />}
                    {user.isBlocked ? "Unblock" : "Block"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminCustomers;
