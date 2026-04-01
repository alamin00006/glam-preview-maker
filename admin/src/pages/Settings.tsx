import { useState } from "react";
import { Save, Globe, Bell, Palette } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [storeName, setStoreName] = useState("Nigar Fashion World");
  const [storeEmail, setStoreEmail] = useState("contact@nigarfashion.com");
  const [currency, setCurrency] = useState("BDT (৳)");
  const [orderNotif, setOrderNotif] = useState(true);
  const [stockNotif, setStockNotif] = useState(true);

  const handleSave = () => toast.success("Settings saved successfully!");

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>
        <p className="font-body text-sm text-muted-foreground mt-1">Manage your store configuration</p>
      </div>

      {/* General */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <Globe className="w-5 h-5 text-primary" />
          <h2 className="font-display text-lg font-semibold text-foreground">General</h2>
        </div>
        <div className="space-y-4">
          {[
            { label: "Store Name", value: storeName, onChange: setStoreName },
            { label: "Contact Email", value: storeEmail, onChange: setStoreEmail },
            { label: "Currency", value: currency, onChange: setCurrency },
          ].map((field) => (
            <div key={field.label}>
              <label className="font-body text-sm text-muted-foreground">{field.label}</label>
              <input value={field.value} onChange={(e) => field.onChange(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="font-display text-lg font-semibold text-foreground">Notifications</h2>
        </div>
        <div className="space-y-4">
          {[
            { label: "New Order Notifications", desc: "Get notified when a new order is placed", checked: orderNotif, onChange: setOrderNotif },
            { label: "Low Stock Alerts", desc: "Alert when product stock falls below 10", checked: stockNotif, onChange: setStockNotif },
          ].map((n) => (
            <div key={n.label} className="flex items-center justify-between">
              <div>
                <p className="font-body text-sm font-medium text-foreground">{n.label}</p>
                <p className="font-body text-xs text-muted-foreground">{n.desc}</p>
              </div>
              <button onClick={() => n.onChange(!n.checked)} className={`w-11 h-6 rounded-full transition-colors relative ${n.checked ? "bg-primary" : "bg-muted"}`}>
                <span className={`block w-5 h-5 rounded-full bg-primary-foreground shadow absolute top-0.5 transition-transform ${n.checked ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* API Config */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <Palette className="w-5 h-5 text-primary" />
          <h2 className="font-display text-lg font-semibold text-foreground">API Configuration</h2>
        </div>
        <div>
          <label className="font-body text-sm text-muted-foreground">Backend API URL</label>
          <input defaultValue="http://localhost:3001/api" className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background font-mono text-xs focus:outline-none focus:ring-2 focus:ring-ring" />
          <p className="font-body text-xs text-muted-foreground mt-1">Set via VITE_API_URL environment variable</p>
        </div>
      </div>

      <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-body text-sm font-medium hover:opacity-90 transition-opacity">
        <Save className="w-4 h-4" /> Save Settings
      </button>
    </div>
  );
};

export default Settings;
