import { useState } from "react";
import { Plus, Search, Edit, Trash2, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockProducts } from "@/services/mockData";
import type { Product } from "@/services/api";

const statusColors: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  draft: "bg-amber-50 text-amber-700 border-amber-200/60",
  archived: "bg-muted text-muted-foreground border-border",
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
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sans text-2xl font-bold text-foreground tracking-tight">Products</h1>
          <p className="font-sans text-sm text-muted-foreground mt-1">{products.length} total products</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="admin-btn-primary"><Plus className="w-4 h-4" /> Add Product</button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-[400px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="admin-input pl-10" />
        </div>
        <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="admin-input w-[140px]">
          {["All", "Face", "Lips", "Eyes", "Nails", "Skin"].map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((p, i) => (
          <div key={p.id} className="admin-card p-5 animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center"><Package className="w-5 h-5 text-primary" /></div>
                <div className="min-w-0">
                  <p className="font-sans text-sm font-semibold text-foreground truncate">{p.name}</p>
                  <p className="font-sans text-xs text-muted-foreground">{p.brand}</p>
                </div>
              </div>
              <span className={cn("px-2 py-0.5 rounded-lg text-[10px] font-sans font-semibold border", statusColors[p.status])}>{p.status}</span>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/40">
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-sans text-lg font-bold text-foreground">৳{p.price}</p>
                  {p.oldPrice && <p className="font-sans text-xs text-muted-foreground line-through">৳{p.oldPrice}</p>}
                </div>
                <div className="pl-4 border-l border-border/40">
                  <p className={cn("font-sans text-sm font-semibold", p.stock === 0 ? "text-destructive" : "text-foreground")}>{p.stock === 0 ? "Out" : p.stock}</p>
                  <p className="font-sans text-[10px] text-muted-foreground">Stock</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setEditProduct(p)} className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(p.id)} className="p-2 rounded-xl hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(editProduct || showAdd) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={() => { setEditProduct(null); setShowAdd(false); }}>
          <div className="bg-card rounded-2xl border border-border/60 p-6 w-full max-w-lg shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-sans text-lg font-bold mb-4">{editProduct ? "Edit Product" : "Add Product"}</h2>
            <ProductForm product={editProduct} onSave={(p) => {
              if (editProduct) setProducts(products.map((pr) => pr.id === p.id ? p : pr));
              else setProducts([{ ...p, id: `prod-${Date.now()}`, createdAt: new Date().toISOString(), rating: 0, reviews: 0 }, ...products]);
              setEditProduct(null); setShowAdd(false);
            }} onCancel={() => { setEditProduct(null); setShowAdd(false); }} />
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
        <div><label className="font-sans text-xs text-muted-foreground">Name</label><input value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} className="admin-input mt-1" /></div>
        <div><label className="font-sans text-xs text-muted-foreground">Brand</label><input value={form.brand || ""} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="admin-input mt-1" /></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div><label className="font-sans text-xs text-muted-foreground">Price (৳)</label><input type="number" value={form.price || 0} onChange={(e) => setForm({ ...form, price: +e.target.value })} className="admin-input mt-1" /></div>
        <div><label className="font-sans text-xs text-muted-foreground">Old Price</label><input type="number" value={form.oldPrice || ""} onChange={(e) => setForm({ ...form, oldPrice: +e.target.value || undefined })} className="admin-input mt-1" /></div>
        <div><label className="font-sans text-xs text-muted-foreground">Stock</label><input type="number" value={form.stock || 0} onChange={(e) => setForm({ ...form, stock: +e.target.value })} className="admin-input mt-1" /></div>
      </div>
      <div><label className="font-sans text-xs text-muted-foreground">Description</label><textarea value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} className="admin-input mt-1 h-20 resize-none" /></div>
      <div className="flex justify-end gap-3 pt-2">
        <button onClick={onCancel} className="admin-btn-ghost">Cancel</button>
        <button onClick={() => onSave(form as Product)} className="admin-btn-primary">{product ? "Update" : "Create"}</button>
      </div>
    </div>
  );
}

export default Products;
