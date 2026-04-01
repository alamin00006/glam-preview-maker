import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import type { Product } from "./productData";

export type { Product };
export { allProducts } from "./productData";

interface ProductGridProps {
  id?: string;
  title: string;
  subtitle?: string;
  products: Product[];
  bgClass?: string;
}

const ProductGrid = ({ id, title, subtitle, products, bgClass = "bg-background" }: ProductGridProps) => (
  <section id={id} className={`py-12 md:py-16 ${bgClass}`}>
    <div className="container mx-auto px-6">
      <div className="flex items-end justify-between mb-8">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-lg md:text-xl font-display uppercase tracking-wider text-foreground">
            {title}
          </h2>
          {subtitle && (
            <p className="font-body text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </motion.div>
        <Link to="/products" className="font-body text-xs text-pink hover:text-hot-pink font-medium uppercase tracking-wider transition-colors">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default ProductGrid;
