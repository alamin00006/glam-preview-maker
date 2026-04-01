import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  LogOut,
  PlayCircle,
  MapPin,
  ShoppingBag,
  Calendar,
  Mail,
  Phone,
  Package,
  Heart,
  Settings,
  LayoutDashboard,
  GraduationCap,
  ChevronRight,
  Eye,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";

const courseInfo: Record<string, { name: string; nameEn: string; icon: typeof PlayCircle; link: string; linkLabel: string }> = {
  recorded: { name: "Recorded Video Course", nameEn: "Recorded Video Course", icon: PlayCircle, link: "/videos", linkLabel: "Watch Videos" },
  physical: { name: "Physical Course", nameEn: "Physical / Hands-on Course", icon: MapPin, link: "/details", linkLabel: "View Details" },
};

type Tab = "dashboard" | "orders" | "courses" | "wishlist" | "settings";

const sidebarItems: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "orders", label: "My Orders", icon: Package },
  { id: "courses", label: "My Courses", icon: GraduationCap },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "settings", label: "Account Settings", icon: Settings },
];

// Demo orders data
const demoOrders = [
  { id: "NFW100234", date: "2026-03-28", status: "Delivered", total: 3450, items: 3, statusColor: "text-green-600 bg-green-50" },
  { id: "NFW100198", date: "2026-03-20", status: "Shipped", total: 1890, items: 2, statusColor: "text-blue-600 bg-blue-50" },
  { id: "NFW100145", date: "2026-03-10", status: "Processing", total: 5200, items: 4, statusColor: "text-amber-600 bg-amber-50" },
  { id: "NFW100099", date: "2026-02-25", status: "Delivered", total: 2100, items: 1, statusColor: "text-green-600 bg-green-50" },
];

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const activeTab = (params.get("tab") as Tab) || "dashboard";
  const [mobileSidebar, setMobileSidebar] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  const setTab = (tab: Tab) => {
    setParams({ tab });
    setMobileSidebar(false);
  };

  return (
    <>
      <LandingNavbar />
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex gap-8">
            {/* Sidebar — Desktop */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="bg-card rounded-2xl border border-border overflow-hidden sticky top-28">
                {/* User header */}
                <div className="bg-gradient-to-br from-pink to-hot-pink p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary-foreground/20 border-2 border-primary-foreground/40 flex items-center justify-center mx-auto mb-3">
                    <User className="w-9 h-9 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-lg text-primary-foreground">{user.name}</h3>
                  <p className="font-body text-xs text-primary-foreground/70 mt-1">{user.email}</p>
                </div>

                {/* Nav */}
                <nav className="p-3">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm transition-all mb-1 ${
                        activeTab === item.id
                          ? "bg-pink/10 text-pink font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                      {activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </button>
                  ))}

                  <div className="border-t border-border mt-2 pt-2">
                    <button
                      onClick={() => { logout(); navigate("/"); }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm text-destructive hover:bg-destructive/10 transition-all"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                </nav>
              </div>
            </aside>

            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setMobileSidebar(true)}
              className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-pink text-primary-foreground rounded-full shadow-lg flex items-center justify-center"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Mobile sidebar overlay */}
            {mobileSidebar && (
              <div className="lg:hidden fixed inset-0 z-[80]">
                <div className="absolute inset-0 bg-dark/50" onClick={() => setMobileSidebar(false)} />
                <motion.div
                  initial={{ x: -300 }}
                  animate={{ x: 0 }}
                  className="absolute left-0 top-0 bottom-0 w-80 bg-card shadow-2xl"
                >
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <span className="font-display text-lg text-foreground">My Account</span>
                    <button onClick={() => setMobileSidebar(false)} className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="bg-gradient-to-br from-pink to-hot-pink p-5 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary-foreground/20 border-2 border-primary-foreground/40 flex items-center justify-center mx-auto mb-2">
                      <User className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-display text-base text-primary-foreground">{user.name}</h3>
                  </div>
                  <nav className="p-3">
                    {sidebarItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm transition-all mb-1 ${
                          activeTab === item.id ? "bg-pink/10 text-pink font-medium" : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </button>
                    ))}
                    <div className="border-t border-border mt-2 pt-2">
                      <button onClick={() => { logout(); navigate("/"); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm text-destructive hover:bg-destructive/10">
                        <LogOut className="w-5 h-5" /> Logout
                      </button>
                    </div>
                  </nav>
                </motion.div>
              </div>
            )}

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {activeTab === "dashboard" && <DashboardTab user={user} setTab={setTab} />}
              {activeTab === "orders" && <OrdersTab />}
              {activeTab === "courses" && <CoursesTab user={user} />}
              {activeTab === "wishlist" && <WishlistTab />}
              {activeTab === "settings" && <SettingsTab user={user} />}
            </div>
          </div>
        </div>
      </main>
      <LandingFooter />
    </>
  );
};

/* ─── Dashboard Tab ─── */
const DashboardTab = ({ user, setTab }: { user: any; setTab: (t: Tab) => void }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
    <h2 className="font-display text-2xl text-foreground">Welcome back, {user.name.split(" ")[0]}!</h2>

    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "Total Orders", value: "4", icon: Package, color: "text-blue-600 bg-blue-50" },
        { label: "Courses", value: String(user.purchasedCourses.length), icon: GraduationCap, color: "text-purple-600 bg-purple-50" },
        { label: "Wishlist", value: "6", icon: Heart, color: "text-pink bg-pink/10" },
        { label: "Member Since", value: new Date(user.joinDate).toLocaleDateString("en", { month: "short", year: "numeric" }), icon: Calendar, color: "text-amber-600 bg-amber-50" },
      ].map((s) => (
        <div key={s.label} className="bg-card rounded-2xl border border-border p-5">
          <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
            <s.icon className="w-5 h-5" />
          </div>
          <p className="font-display text-xl text-foreground">{s.value}</p>
          <p className="font-body text-xs text-muted-foreground mt-1">{s.label}</p>
        </div>
      ))}
    </div>

    {/* Recent orders */}
    <div className="bg-card rounded-2xl border border-border">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h3 className="font-display text-lg text-foreground">Recent Orders</h3>
        <button onClick={() => setTab("orders")} className="text-pink font-body text-sm font-medium hover:underline">
          View All
        </button>
      </div>
      <div className="divide-y divide-border">
        {demoOrders.slice(0, 3).map((order) => (
          <div key={order.id} className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="font-body text-sm font-medium text-foreground">#{order.id}</p>
              <p className="font-body text-xs text-muted-foreground">{order.date} · {order.items} items</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full font-body text-xs font-medium ${order.statusColor}`}>
                {order.status}
              </span>
              <span className="font-body text-sm font-medium text-foreground">৳{order.total.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

/* ─── Orders Tab ─── */
const OrdersTab = () => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
    <h2 className="font-display text-2xl text-foreground">My Orders</h2>
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-6 py-3 font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider">Order ID</th>
              <th className="text-left px-6 py-3 font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
              <th className="text-left px-6 py-3 font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-3 font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider">Items</th>
              <th className="text-right px-6 py-3 font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total</th>
              <th className="text-right px-6 py-3 font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {demoOrders.map((order) => (
              <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-body text-sm font-medium text-foreground">#{order.id}</td>
                <td className="px-6 py-4 font-body text-sm text-muted-foreground">{order.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full font-body text-xs font-medium ${order.statusColor}`}>{order.status}</span>
                </td>
                <td className="px-6 py-4 font-body text-sm text-muted-foreground">{order.items} items</td>
                <td className="px-6 py-4 font-body text-sm font-medium text-foreground text-right">৳{order.total.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-pink font-body text-sm hover:underline flex items-center gap-1 ml-auto">
                    <Eye className="w-4 h-4" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-border">
        {demoOrders.map((order) => (
          <div key={order.id} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-body text-sm font-medium text-foreground">#{order.id}</span>
              <span className={`px-3 py-1 rounded-full font-body text-xs font-medium ${order.statusColor}`}>{order.status}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-body text-xs text-muted-foreground">{order.date} · {order.items} items</span>
              <span className="font-body text-sm font-medium text-foreground">৳{order.total.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

/* ─── Courses Tab ─── */
const CoursesTab = ({ user }: { user: any }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
    <h2 className="font-display text-2xl text-foreground">My Courses</h2>

    {user.purchasedCourses.length === 0 ? (
      <div className="bg-card rounded-2xl border border-border p-12 text-center">
        <GraduationCap className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
        <p className="font-display text-lg text-foreground mb-2">No Courses Yet</p>
        <p className="text-muted-foreground font-body text-sm mb-6">You haven't purchased any courses yet.</p>
        <Link to="/#pricing" className="inline-flex px-8 py-3 bg-pink text-primary-foreground font-body font-semibold text-sm rounded-xl hover:bg-hot-pink transition-colors">
          Browse Courses
        </Link>
      </div>
    ) : (
      <div className="grid md:grid-cols-2 gap-6">
        {user.purchasedCourses.map((id: string) => {
          const c = courseInfo[id];
          if (!c) return null;
          return (
            <div key={id} className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-pink/10 flex items-center justify-center">
                  <c.icon className="w-6 h-6 text-pink" />
                </div>
                <div>
                  <h3 className="font-display text-base text-foreground">{c.name}</h3>
                  <p className="text-muted-foreground font-body text-xs">{c.nameEn}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-body text-green-600 bg-green-50 px-3 py-1 rounded-full font-medium">✓ Active</span>
                <Link to={c.link} className="text-pink font-body text-sm font-medium hover:underline flex items-center gap-1">
                  {c.linkLabel} <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </motion.div>
);

/* ─── Wishlist Tab ─── */
const WishlistTab = () => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
    <h2 className="font-display text-2xl text-foreground">My Wishlist</h2>
    <div className="bg-card rounded-2xl border border-border p-12 text-center">
      <Heart className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
      <p className="font-display text-lg text-foreground mb-2">Your Wishlist is Empty</p>
      <p className="text-muted-foreground font-body text-sm mb-6">Save items you love for later.</p>
      <Link to="/products" className="inline-flex px-8 py-3 bg-pink text-primary-foreground font-body font-semibold text-sm rounded-xl hover:bg-hot-pink transition-colors">
        Browse Products
      </Link>
    </div>
  </motion.div>
);

/* ─── Settings Tab ─── */
const SettingsTab = ({ user }: { user: any }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
    <h2 className="font-display text-2xl text-foreground">Account Settings</h2>

    <div className="bg-card rounded-2xl border border-border p-6">
      <h3 className="font-display text-lg text-foreground mb-4">Personal Information</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-body text-sm text-muted-foreground mb-1.5">Full Name</label>
          <input defaultValue={user.name}
            className="w-full h-11 rounded-xl border border-border bg-background px-4 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-pink/40" />
        </div>
        <div>
          <label className="block font-body text-sm text-muted-foreground mb-1.5">Email</label>
          <input defaultValue={user.email} type="email"
            className="w-full h-11 rounded-xl border border-border bg-background px-4 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-pink/40" />
        </div>
        <div>
          <label className="block font-body text-sm text-muted-foreground mb-1.5">Phone</label>
          <input defaultValue={user.phone}
            className="w-full h-11 rounded-xl border border-border bg-background px-4 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-pink/40" />
        </div>
        <div>
          <label className="block font-body text-sm text-muted-foreground mb-1.5">Member Since</label>
          <input value={new Date(user.joinDate).toLocaleDateString("en")} disabled
            className="w-full h-11 rounded-xl border border-border bg-muted px-4 font-body text-sm text-muted-foreground" />
        </div>
      </div>
      <button className="mt-6 px-8 py-3 bg-pink text-primary-foreground font-body font-semibold text-sm rounded-xl hover:bg-hot-pink transition-colors">
        Save Changes
      </button>
    </div>

    <div className="bg-card rounded-2xl border border-border p-6">
      <h3 className="font-display text-lg text-foreground mb-4">Change Password</h3>
      <div className="space-y-4 max-w-md">
        <div>
          <label className="block font-body text-sm text-muted-foreground mb-1.5">Current Password</label>
          <input type="password" className="w-full h-11 rounded-xl border border-border bg-background px-4 font-body text-sm focus:outline-none focus:ring-2 focus:ring-pink/40" />
        </div>
        <div>
          <label className="block font-body text-sm text-muted-foreground mb-1.5">New Password</label>
          <input type="password" className="w-full h-11 rounded-xl border border-border bg-background px-4 font-body text-sm focus:outline-none focus:ring-2 focus:ring-pink/40" />
        </div>
        <div>
          <label className="block font-body text-sm text-muted-foreground mb-1.5">Confirm New Password</label>
          <input type="password" className="w-full h-11 rounded-xl border border-border bg-background px-4 font-body text-sm focus:outline-none focus:ring-2 focus:ring-pink/40" />
        </div>
      </div>
      <button className="mt-6 px-8 py-3 bg-foreground text-background font-body font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity">
        Update Password
      </button>
    </div>
  </motion.div>
);

export default Profile;
