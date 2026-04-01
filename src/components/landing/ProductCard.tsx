import { motion } from "framer-motion";
import { Heart, Star, ShoppingBag, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartItems } from "@/store/cartSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "./productData";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const inCart = cartItems.some((i) => i.id === product.id);
  const [justAdded, setJustAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  const handleAdd = () => {
    const colorValue = product.colors && product.colors.length > 0 ? product.colors[selectedColor] : undefined;
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        brand: product.brand,
        image: product.image,
        price: product.price,
        oldPrice: product.oldPrice,
        color: colorValue,
      })
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* Image area */}
      <Link to={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden bg-muted block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          width={300}
          height={400}
        />

        {/* Tag badge */}
        {product.tag && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-pink text-primary-foreground font-body text-[10px] font-bold uppercase tracking-wider rounded-md">
            {product.tag}
          </span>
        )}

        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-destructive text-primary-foreground font-body text-[10px] font-bold rounded-md">
            -{discount}%
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className={`absolute top-3 ${discount > 0 ? "right-16" : "right-3"} w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            wishlisted
              ? "bg-pink text-primary-foreground"
              : "bg-card/80 backdrop-blur-sm text-foreground hover:bg-pink hover:text-primary-foreground"
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Hover add to cart overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleAdd}
            className={`w-full py-2.5 rounded-xl font-body text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-all shadow-lg ${
              justAdded
                ? "bg-green-500 text-primary-foreground"
                : inCart
                ? "bg-foreground text-card hover:bg-foreground/90"
                : "bg-pink text-primary-foreground hover:bg-hot-pink"
            }`}
          >
            {justAdded ? (
              <><Check className="w-3.5 h-3.5" /> Added!</>
            ) : inCart ? (
              <><ShoppingBag className="w-3.5 h-3.5" /> Add More</>
            ) : (
              <><ShoppingBag className="w-3.5 h-3.5" /> Add to Cart</>
            )}
          </button>
        </div>
      </Link>

      {/* Info area */}
      <div className="p-4">
        {/* Color swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mb-2.5">
            {product.colors.map((color, i) => (
              <button
                key={i}
                onClick={() => setSelectedColor(i)}
                className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === i
                    ? "border-foreground scale-110"
                    : "border-border hover:border-muted-foreground"
                }`}
                style={{ backgroundColor: color }}
                title={`Color ${i + 1}`}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="font-body text-[10px] text-muted-foreground ml-0.5">
                +{product.colors.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Brand */}
        <p className="font-body text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
          {product.brand}
        </p>

        {/* Name */}
        <h4 className="font-body text-sm text-foreground font-medium leading-snug mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h4>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, j) => (
              <Star
                key={j}
                className={`w-3 h-3 ${
                  j < Math.floor(product.rating)
                    ? "fill-gold text-gold"
                    : j < product.rating
                    ? "fill-gold/50 text-gold"
                    : "text-border"
                }`}
              />
            ))}
          </div>
          <span className="font-body text-[10px] text-muted-foreground">
            ({product.reviews})
          </span>
        </div>

        {/* Price + Cart button */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-bold text-foreground">
              ৳{product.price.toLocaleString()}
            </span>
            {product.oldPrice && (
              <span className="font-body text-xs text-muted-foreground line-through">
                ৳{product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
              justAdded
                ? "bg-green-500 text-primary-foreground scale-110"
                : inCart
                ? "bg-foreground text-card hover:bg-foreground/80"
                : "bg-pink-light text-pink hover:bg-pink hover:text-primary-foreground"
            }`}
          >
            {justAdded ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
