import { useState } from "react";
import { Save, Globe, Bell, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const AdminSettings = () => {
  const [storeName, setStoreName] = useState("Nigar Fashion World");
  const [storeEmail, setStoreEmail] = useState("contact@nigarfashion.com");
  const [currency, setCurrency] = useState("BDT (৳)");
  const [orderNotif, setOrderNotif] = useState(true);
  const [stockNotif, setStockNotif] = useState(true);

  const handleSave = () => {
    // Will call NestJS API: PATCH /api/settings
    toast.success("Settings saved successfully!");
  };

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
          <div>
            <Label className="font-body">Store Name</Label>
            <Input value={storeName} onChange={(e) => setStoreName(e.target.value)} className="font-body mt-1" />
          </div>
          <div>
            <Label className="font-body">Contact Email</Label>
            <Input value={storeEmail} onChange={(e) => setStoreEmail(e.target.value)} className="font-body mt-1" />
          </div>
          <div>
            <Label className="font-body">Currency</Label>
            <Input value={currency} onChange={(e) => setCurrency(e.target.value)} className="font-body mt-1" />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="font-display text-lg font-semibold text-foreground">Notifications</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-body text-sm font-medium text-foreground">New Order Notifications</p>
              <p className="font-body text-xs text-muted-foreground">Get notified when a new order is placed</p>
            </div>
            <Switch checked={orderNotif} onCheckedChange={setOrderNotif} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-body text-sm font-medium text-foreground">Low Stock Alerts</p>
              <p className="font-body text-xs text-muted-foreground">Alert when product stock falls below 10</p>
            </div>
            <Switch checked={stockNotif} onCheckedChange={setStockNotif} />
          </div>
        </div>
      </div>

      {/* API Config */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <Palette className="w-5 h-5 text-primary" />
          <h2 className="font-display text-lg font-semibold text-foreground">API Configuration</h2>
        </div>
        <div>
          <Label className="font-body">Backend API URL</Label>
          <Input defaultValue="http://localhost:3001/api" className="font-body mt-1 font-mono text-xs" />
          <p className="font-body text-xs text-muted-foreground mt-1">Set via VITE_API_URL environment variable</p>
        </div>
      </div>

      <Button onClick={handleSave} className="bg-primary text-primary-foreground font-body gap-2">
        <Save className="w-4 h-4" /> Save Settings
      </Button>
    </div>
  );
};

export default AdminSettings;
