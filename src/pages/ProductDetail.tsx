import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Star, Heart, Minus, Plus, ChevronRight, Check, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { addToCart, selectCartItems, openCart } from "@/store/cartSlice";
import { allProducts } from "@/components/landing/productData";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";
import ProductCard from "@/components/landing/ProductCard";

const demoReviews = [
  { name: "Rachna Sharma", date: "14/03/2025", rating: 5, text: "A lovely product, the shade is pretty and it stays all day!" },
  { name: "Tinker", date: "20/04/2025", rating: 5, text: "Best product I've used so far. Smooth application and gorgeous finish." },
  { name: "Shikha Pradhan", date: "11/02/2025", rating: 4, text: "Very good quality! Worth every penny." },
  { name: "Alkerita", date: "07/05/2025", rating: 5, text: "I keep coming back to this one. It's my absolute go-to product." },
  { name: "Vanisha Dawei", date: "24/01/2025", rating: 5, text: "Stunning shade and great pigmentation. The application is smooth, lightweight and buttery. Absolutely a must-have." },
  { name: "Aparna Singh", date: "02/03/2025", rating: 4, text: "Fantastic scent and the color is divine." },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = allProducts.find((p) => p.id === id);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const inCart = cartItems.some((i) => i.id === product?.id);

  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "ingredients">("details");

  if (!product) {
    return (
      <main>
        <LandingNavbar />
        <div className="h-[105px] lg:h-[120px]" />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-display text-foreground mb-4">Product Not Found</h1>
          <Link to="/products" className="text-pink hover:text-hot-pink font-body text-sm">
            ← Back to Products
          </Link>
        </div>
        <LandingFooter />
      </main>
    );
  }

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAdd = () => {
    const colorValue = product.colors && product.colors.length > 0 ? product.colors[selectedColor] : undefined;
    for (let i = 0; i < quantity; i++) {
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
    }
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      dispatch(openCart());
    }, 800);
  };

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const avgRating = 4.8;

  return (
    <main>
      <LandingNavbar />
      <div className="h-[105px] lg:h-[120px]" />

      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-1.5 font-body text-xs text-muted-foreground">
          <Link to="/" className="hover:text-pink transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/products" className="hover:text-pink transition-colors">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Product section */}
      <section className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted border border-border">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                width={600}
                height={600}
              />
            </div>
            <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-pink hover:text-primary-foreground hover:border-pink transition-all">
              <Heart className="w-5 h-5" />
            </button>
            {product.tag && (
              <span className="absolute top-4 left-4 px-3 py-1.5 bg-pink text-primary-foreground font-body text-[10px] font-bold uppercase tracking-wider rounded-md">
                {product.tag}
              </span>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="font-display text-2xl md:text-3xl text-foreground leading-tight mb-2">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className={`w-4 h-4 ${
                      j < Math.floor(product.rating)
                        ? "fill-gold text-gold"
                        : "text-border"
                    }`}
                  />
                ))}
              </div>
              <span className="font-body text-sm text-muted-foreground">
                ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-display text-3xl font-bold text-foreground">
                ৳{product.price.toLocaleString()}
              </span>
              {product.oldPrice && (
                <>
                  <span className="font-body text-lg text-muted-foreground line-through">
                    ৳{product.oldPrice.toLocaleString()}
                  </span>
                  <span className="font-body text-sm font-semibold text-destructive">
                    {discount}% Off
                  </span>
                </>
              )}
            </div>
            <p className="font-body text-xs text-muted-foreground mb-5">Inclusive of all taxes</p>

            {/* Shade / Color selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <p className="font-body text-sm font-medium text-foreground mb-2.5">
                  Shade / Confidence
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                        selectedColor === i
                          ? "border-foreground scale-110 ring-2 ring-foreground/20"
                          : "border-border hover:border-muted-foreground"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Available Offers */}
            <div className="mb-6 p-4 bg-muted/50 rounded-xl border border-border">
              <p className="font-body text-sm font-semibold text-foreground mb-2">Available Offers</p>
              <ul className="space-y-1.5">
                <li className="font-body text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-pink mt-0.5">•</span>
                  Welcome Offer: Flat ৳100 off on orders above ৳500
                </li>
                <li className="font-body text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-pink mt-0.5">•</span>
                  Get a Surprise Gift on orders above ৳799
                </li>
                <li className="font-body text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-pink mt-0.5">•</span>
                  Get Free Surprise Gifts on orders above ৳1199
                </li>
              </ul>
            </div>

            <p className="font-body text-xs text-muted-foreground mb-6">
              Delivered in 3–5 working days · Free returns within 7 days
            </p>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 h-10 flex items-center justify-center font-body text-sm font-medium border-x border-border">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 py-3 rounded-lg font-body text-sm uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all ${
                  justAdded
                    ? "bg-green-500 text-primary-foreground"
                    : "bg-foreground text-card hover:bg-foreground/90"
                }`}
              >
                {justAdded ? (
                  <><Check className="w-4 h-4" /> Added to Bag!</>
                ) : (
                  <><ShoppingBag className="w-4 h-4" /> Add to Bag</>
                )}
              </button>
            </div>

            {/* Description */}
            {product.description && (
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Tabs: Details / How to Use / Reviews */}
      <section className="border-t border-border">
        <div className="container mx-auto px-6 py-10">
          <div className="flex items-center gap-6 border-b border-border mb-8">
            {(["details", "reviews", "ingredients"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 font-body text-sm capitalize tracking-wide transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-pink text-pink font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "details" ? "Details" : tab === "reviews" ? "Reviews" : "Ingredients"}
              </button>
            ))}
          </div>

          {activeTab === "details" && (
            <div className="max-w-2xl">
              {product.details && (
                <div className="mb-6">
                  <h3 className="font-body text-sm font-semibold text-foreground mb-3">Key Benefits</h3>
                  <ul className="space-y-2">
                    {product.details.map((d, i) => (
                      <li key={i} className="font-body text-sm text-muted-foreground flex items-center gap-2">
                        <Check className="w-4 h-4 text-pink flex-shrink-0" /> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="space-y-2 font-body text-xs text-muted-foreground">
                <p><span className="font-medium text-foreground">Brand:</span> {product.brand}</p>
                <p><span className="font-medium text-foreground">Category:</span> {product.category}</p>
                <p><span className="font-medium text-foreground">Shelf Life:</span> 36 Months</p>
              </div>
            </div>
          )}

          {activeTab === "ingredients" && (
            <div className="max-w-2xl">
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Aqua, Dimethicone, Isododecane, Cyclohexasiloxane, PEG-10 Dimethicone, Trimethylsiloxysilicate, Titanium Dioxide, Iron Oxides, Nylon-12, HDI/Trimethylol Hexyllactone Crosspolymer, Sodium Chloride, Phenoxyethanol, Hydrogen Dimethicone.
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left: Summary */}
              <div>
                <h3 className="font-body text-sm text-pink font-semibold mb-1">Reviews</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-display text-4xl font-bold text-foreground">{avgRating}</span>
                  <span className="font-body text-sm text-muted-foreground">/ 5 Reviews</span>
                </div>
                <div className="space-y-1.5 mb-4">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = demoReviews.filter((r) => r.rating === star).length;
                    const pct = demoReviews.length > 0 ? (count / demoReviews.length) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="font-body text-xs text-muted-foreground w-3">{star}</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-gold rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="font-body text-[10px] text-muted-foreground w-4">{count}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="font-body text-xs text-muted-foreground">Click to review</p>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-border cursor-pointer hover:text-gold transition-colors" />
                  ))}
                </div>
              </div>

              {/* Right: Review list */}
              <div className="lg:col-span-2 space-y-5">
                {demoReviews.map((review, i) => (
                  <div key={i} className="border-b border-border pb-5 last:border-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-body text-xs font-semibold text-muted-foreground">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-body text-sm font-medium text-foreground">{review.name}</p>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} className={`w-3 h-3 ${j < review.rating ? "fill-gold text-gold" : "text-border"}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="font-body text-[10px] text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="font-body text-sm text-muted-foreground mt-2">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-muted/30 border-t border-border py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-lg font-display uppercase tracking-wider text-foreground mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <LandingFooter />
    </main>
  );
};

export default ProductDetail;
