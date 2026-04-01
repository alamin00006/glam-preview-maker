import { useState } from "react";
import { Save, Globe, Bell, Link2, Shield } from "lucide-react";
import { toast } from "sonner";

const AdminSettings = () => {
  const [storeName, setStoreName] = useState("Nigar Fashion World");
  const [storeEmail, setStoreEmail] = useState("contact@nigarfashion.com");
  const [currency, setCurrency] = useState("BDT (৳)");
  const [orderNotif, setOrderNotif] = useState(true);
  const [stockNotif, setStockNotif] = useState(true);

  const handleSave = () => toast.success("Settings saved successfully!");

  return (
    <div className="space-y-8 max-w-2xl animate-fade-in">
      <div>
        <h1 className="font-sans text-2xl font-bold text-foreground tracking-tight">Settings</h1>
        <p className="font-sans text-sm text-muted-foreground mt-1">Manage your store configuration</p>
      </div>

      {/* General */}
      <div className="admin-card p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center">
            <Globe className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="font-sans text-base font-semibold text-foreground">General</h2>
            <p className="font-sans text-xs text-muted-foreground">Basic store information</p>
          </div>
        </div>
        <div className="space-y-4 pt-2">
          {[
            { label: "Store Name", value: storeName, onChange: setStoreName },
            { label: "Contact Email", value: storeEmail, onChange: setStoreEmail },
            { label: "Currency", value: currency, onChange: setCurrency },
          ].map((field) => (
            <div key={field.label}>
              <label className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider">{field.label}</label>
              <input value={field.value} onChange={(e) => field.onChange(e.target.value)} className="admin-input mt-1.5" />
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="admin-card p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center">
            <Bell className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="font-sans text-base font-semibold text-foreground">Notifications</h2>
            <p className="font-sans text-xs text-muted-foreground">Manage alert preferences</p>
          </div>
        </div>
        <div className="space-y-4 pt-2">
          {[
            { label: "New Order Notifications", desc: "Get notified when a new order is placed", checked: orderNotif, onChange: setOrderNotif },
            { label: "Low Stock Alerts", desc: "Alert when product stock falls below 10", checked: stockNotif, onChange: setStockNotif },
          ].map((n) => (
            <div key={n.label} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
              <div>
                <p className="font-sans text-sm font-medium text-foreground">{n.label}</p>
                <p className="font-sans text-xs text-muted-foreground mt-0.5">{n.desc}</p>
              </div>
              <button onClick={() => n.onChange(!n.checked)} className={`w-12 h-7 rounded-full transition-all duration-300 relative ${n.checked ? "bg-primary shadow-md shadow-primary/20" : "bg-muted"}`}>
                <span className={`block w-5 h-5 rounded-full bg-primary-foreground shadow-sm absolute top-1 transition-transform duration-300 ${n.checked ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* API Config */}
      <div className="admin-card p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-violet-100 flex items-center justify-center">
            <Link2 className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <h2 className="font-sans text-base font-semibold text-foreground">API Configuration</h2>
            <p className="font-sans text-xs text-muted-foreground">Backend connection settings</p>
          </div>
        </div>
        <div className="pt-2">
          <label className="font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider">Backend API URL</label>
          <input defaultValue="http://localhost:3001/api" className="admin-input mt-1.5 font-mono text-xs" />
          <div className="flex items-center gap-2 mt-2 px-1">
            <Shield className="w-3 h-3 text-muted-foreground" />
            <p className="font-sans text-[11px] text-muted-foreground">Set via <code className="bg-muted px-1.5 py-0.5 rounded text-[10px] font-mono">VITE_API_URL</code> environment variable</p>
          </div>
        </div>
      </div>

      <button onClick={handleSave} className="admin-btn-primary">
        <Save className="w-4 h-4" /> Save Settings
      </button>
    </div>
  );
};

export default AdminSettings;
