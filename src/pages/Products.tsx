import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronDown, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { allProducts, categories, brands } from "@/components/landing/productData";
import ProductCard from "@/components/landing/ProductCard";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";
import StatsBar from "@/components/landing/StatsBar";

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating", value: "rating" },
  { label: "Newest", value: "newest" },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter sections open state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    brand: true,
    price: false,
  });

  const toggleSection = (section: string) =>
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));

  const toggleBrand = (brand: string) =>
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.tag === "New" ? 1 : 0) - (a.tag === "New" ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategory, selectedBrands, sortBy]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedBrands([]);
    setSortBy("featured");
  };

  const hasActiveFilters = selectedCategory !== "All" || selectedBrands.length > 0;

  const FilterSidebar = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-body text-sm font-semibold text-foreground uppercase tracking-wider">Filters</h3>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="font-body text-[10px] text-pink hover:text-hot-pink uppercase tracking-wider">
            Clear All
          </button>
        )}
      </div>

      {/* Category */}
      <div className="border-b border-border pb-4">
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full py-1"
        >
          <span className="font-body text-sm font-medium text-foreground">Category</span>
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${openSections.category ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {openSections.category && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-2 space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSearchParams(cat === "All" ? {} : { category: cat });
                    }}
                    className={`block w-full text-left font-body text-sm py-1 px-2 rounded transition-colors ${
                      selectedCategory === cat
                        ? "text-pink font-medium bg-pink-light"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Brand */}
      <div className="border-b border-border pb-4">
        <button
          onClick={() => toggleSection("brand")}
          className="flex items-center justify-between w-full py-1"
        >
          <span className="font-body text-sm font-medium text-foreground">Brand</span>
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${openSections.brand ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {openSections.brand && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-2 space-y-1.5">
                {brands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-2 cursor-pointer font-body text-sm text-muted-foreground hover:text-foreground py-0.5"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="w-4 h-4 rounded border-border text-pink focus:ring-pink accent-pink"
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <main>
      <LandingNavbar />
      <div className="h-[105px] lg:h-[120px]" />

      <div className="container mx-auto px-6 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 font-body text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-pink transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">
            {selectedCategory === "All" ? "All Products" : selectedCategory}
          </span>
        </div>

        <h1 className="font-display text-2xl md:text-3xl uppercase tracking-wider text-foreground mb-6">
          {selectedCategory === "All" ? "All Products" : selectedCategory}
        </h1>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Top bar: count + sort + mobile filter */}
            <div className="flex items-center justify-between mb-6">
              <p className="font-body text-sm text-muted-foreground">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
              </p>

              <div className="flex items-center gap-3">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 border border-border rounded-lg font-body text-xs text-foreground hover:bg-muted transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </button>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-card border border-border rounded-lg px-3 py-2 pr-8 font-body text-xs text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink/20"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        Sort by: {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 flex-wrap mb-5">
                {selectedCategory !== "All" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-pink-light text-pink font-body text-[10px] font-medium uppercase tracking-wider rounded-full">
                    {selectedCategory}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => {
                        setSelectedCategory("All");
                        setSearchParams({});
                      }}
                    />
                  </span>
                )}
                {selectedBrands.map((b) => (
                  <span key={b} className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted text-foreground font-body text-[10px] font-medium uppercase tracking-wider rounded-full">
                    {b}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => toggleBrand(b)} />
                  </span>
                ))}
              </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {filteredProducts.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-body text-lg text-muted-foreground mb-3">No products found</p>
                <button
                  onClick={clearFilters}
                  className="font-body text-sm text-pink hover:text-hot-pink"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-dark/50"
              onClick={() => setMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-card p-6 overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-body text-sm font-semibold text-foreground uppercase tracking-wider">Filters</h3>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>
              <FilterSidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <StatsBar />
      <LandingFooter />
    </main>
  );
};

export default Products;
