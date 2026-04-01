import { useState } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockProducts } from "@/services/mockData";
import type { Product } from "@/services/api";

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  draft: "bg-yellow-100 text-yellow-700",
  archived: "bg-muted text-muted-foreground",
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "All" || p.category === catFilter;
    return matchSearch && matchCat;
  });

  const handleDelete = (id: string) => setProducts(products.filter((p) => p.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Products</h1>
          <p className="font-body text-sm text-muted-foreground mt-1">{products.length} total products</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-body text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring">
          {["All", "Face", "Lips", "Eyes", "Nails", "Skin"].map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              {["Product", "Category", "Price", "Stock", "Status", "Actions"].map((h) => (
                <th key={h} className={cn("px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground uppercase tracking-wider", h === "Actions" && "text-right")}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-body text-sm font-medium text-foreground">{p.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{p.brand}</p>
                </td>
                <td className="px-4 py-3 font-body text-sm">{p.category}</td>
                <td className="px-4 py-3">
                  <span className="font-body text-sm font-semibold">৳{p.price}</span>
                  {p.oldPrice && <span className="font-body text-xs text-muted-foreground line-through ml-2">৳{p.oldPrice}</span>}
                </td>
                <td className="px-4 py-3">
                  <span className={cn("font-body text-sm font-medium", p.stock === 0 ? "text-destructive" : "text-foreground")}>{p.stock === 0 ? "Out of stock" : p.stock}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-body font-medium", statusColors[p.status])}>{p.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => setEditProduct(p)} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit/Add Dialog */}
      {(editProduct || showAdd) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={() => { setEditProduct(null); setShowAdd(false); }}>
          <div className="bg-card rounded-xl border border-border p-6 w-full max-w-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-lg font-semibold mb-4">{editProduct ? "Edit Product" : "Add Product"}</h2>
            <ProductForm
              product={editProduct}
              onSave={(p) => {
                if (editProduct) {
                  setProducts(products.map((pr) => pr.id === p.id ? p : pr));
                } else {
                  setProducts([{ ...p, id: `prod-${Date.now()}`, createdAt: new Date().toISOString(), rating: 0, reviews: 0 }, ...products]);
                }
                setEditProduct(null); setShowAdd(false);
              }}
              onCancel={() => { setEditProduct(null); setShowAdd(false); }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

function ProductForm({ product, onSave, onCancel }: { product?: Product | null; onSave: (p: Product) => void; onCancel: () => void }) {
  const [form, setForm] = useState<Partial<Product>>(product || { name: "", brand: "", price: 0, category: "Face", stock: 0, status: "draft", description: "" });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-body text-sm text-muted-foreground">Name</label>
          <input value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="font-body text-sm text-muted-foreground">Brand</label>
          <input value={form.brand || ""} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="font-body text-sm text-muted-foreground">Price (৳)</label>
          <input type="number" value={form.price || 0} onChange={(e) => setForm({ ...form, price: +e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="font-body text-sm text-muted-foreground">Old Price</label>
          <input type="number" value={form.oldPrice || ""} onChange={(e) => setForm({ ...form, oldPrice: +e.target.value || undefined })} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="font-body text-sm text-muted-foreground">Stock</label>
          <input type="number" value={form.stock || 0} onChange={(e) => setForm({ ...form, stock: +e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>
      <div>
        <label className="font-body text-sm text-muted-foreground">Description</label>
        <textarea value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full mt-1 h-20 px-3 py-2 rounded-lg border border-input bg-background font-body text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-border font-body text-sm hover:bg-muted transition-colors">Cancel</button>
        <button onClick={() => onSave(form as Product)} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-body text-sm hover:opacity-90 transition-opacity">{product ? "Update" : "Create"}</button>
      </div>
    </div>
  );
}

export default Products;
