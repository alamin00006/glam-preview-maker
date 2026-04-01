import { useState } from "react";
import { Plus, Search, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockProducts } from "@/services/mockData";
import type { Product } from "@/services/api";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  draft: "bg-yellow/20 text-yellow-dark",
  archived: "bg-muted text-muted-foreground",
};

const AdminProducts = () => {
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

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Products</h1>
          <p className="font-body text-sm text-muted-foreground mt-1">{products.length} total products</p>
        </div>
        <Button onClick={() => setShowAdd(true)} className="bg-primary text-primary-foreground font-body gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 font-body"
          />
        </div>
        <Select value={catFilter} onValueChange={setCatFilter}>
          <SelectTrigger className="w-[140px] font-body">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["All", "Face", "Lips", "Eyes"].map((c) => (
              <SelectItem key={c} value={c} className="font-body">{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-body">Product</TableHead>
              <TableHead className="font-body">Category</TableHead>
              <TableHead className="font-body">Price</TableHead>
              <TableHead className="font-body">Stock</TableHead>
              <TableHead className="font-body">Status</TableHead>
              <TableHead className="font-body text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id} className="hover:bg-muted/30">
                <TableCell>
                  <div>
                    <p className="font-body text-sm font-medium text-foreground">{p.name}</p>
                    <p className="font-body text-xs text-muted-foreground">{p.brand}</p>
                  </div>
                </TableCell>
                <TableCell className="font-body text-sm">{p.category}</TableCell>
                <TableCell>
                  <div className="font-body text-sm">
                    <span className="font-semibold">৳{p.price}</span>
                    {p.oldPrice && <span className="text-muted-foreground line-through ml-2 text-xs">৳{p.oldPrice}</span>}
                  </div>
                </TableCell>
                <TableCell>
                  <span className={cn("font-body text-sm font-medium", p.stock === 0 ? "text-destructive" : "text-foreground")}>
                    {p.stock === 0 ? "Out of stock" : p.stock}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-body font-medium", statusColors[p.status])}>
                    {p.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => setEditProduct(p)} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <ProductDialog
        open={!!editProduct}
        onClose={() => setEditProduct(null)}
        product={editProduct}
        onSave={(updated) => {
          setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
          setEditProduct(null);
        }}
      />

      {/* Add Dialog */}
      <ProductDialog
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onSave={(newP) => {
          setProducts([{ ...newP, id: `prod-${Date.now()}`, createdAt: new Date().toISOString(), rating: 0, reviews: 0 }, ...products]);
          setShowAdd(false);
        }}
      />
    </div>
  );
};

function ProductDialog({ open, onClose, product, onSave }: {
  open: boolean;
  onClose: () => void;
  product?: Product | null;
  onSave: (p: Product) => void;
}) {
  const [form, setForm] = useState<Partial<Product>>(
    product || { name: "", brand: "", price: 0, category: "Face", stock: 0, status: "draft" as const, description: "" }
  );

  const handleSubmit = () => {
    onSave(form as Product);
  };

  // Reset form when product changes
  if (product && form.id !== product.id) {
    setForm(product);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">{product ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-body">Name</Label>
              <Input value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} className="font-body" />
            </div>
            <div>
              <Label className="font-body">Brand</Label>
              <Input value={form.brand || ""} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="font-body" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="font-body">Price (৳)</Label>
              <Input type="number" value={form.price || 0} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="font-body" />
            </div>
            <div>
              <Label className="font-body">Old Price</Label>
              <Input type="number" value={form.oldPrice || ""} onChange={(e) => setForm({ ...form, oldPrice: Number(e.target.value) || undefined })} className="font-body" />
            </div>
            <div>
              <Label className="font-body">Stock</Label>
              <Input type="number" value={form.stock || 0} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} className="font-body" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-body">Category</Label>
              <Select value={form.category || "Face"} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger className="font-body"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Face", "Lips", "Eyes", "Nails", "Skin"].map((c) => (
                    <SelectItem key={c} value={c} className="font-body">{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="font-body">Status</Label>
              <Select value={form.status || "draft"} onValueChange={(v) => setForm({ ...form, status: v as Product["status"] })}>
                <SelectTrigger className="font-body"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["active", "draft", "archived"].map((s) => (
                    <SelectItem key={s} value={s} className="font-body capitalize">{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="font-body">Description</Label>
            <textarea
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full h-20 rounded-lg border border-input bg-background px-3 py-2 font-body text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="font-body">Cancel</Button>
          <Button onClick={handleSubmit} className="bg-primary text-primary-foreground font-body">
            {product ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AdminProducts;
