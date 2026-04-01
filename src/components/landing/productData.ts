import sprayImg from "@/assets/product-setting-spray.jpg";
import lipstickImg from "@/assets/product-lipstick.jpg";
import paletteImg from "@/assets/product-palette.jpg";
import foundationImg from "@/assets/product-foundation.jpg";
import mascaraImg from "@/assets/product-mascara.jpg";
import blushImg from "@/assets/product-blush.jpg";
import primerImg from "@/assets/product-primer.jpg";
import concealerImg from "@/assets/product-concealer.jpg";

export interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  tag?: string;
  colors?: string[];
  category: string;
  description?: string;
  details?: string[];
}

export const allProducts: Product[] = [
  {
    id: "spray-01",
    name: "Makeup Setting Spray Long Lasting",
    brand: "Nigar Beauty",
    image: sprayImg,
    price: 1299,
    oldPrice: 1899,
    rating: 4.5,
    reviews: 234,
    tag: "Best Seller",
    colors: ["#f5c6c6", "#e8a0a0", "#d4756b", "#c9544a"],
    category: "Face",
    description: "Lock your look in place all day with this lightweight, micro-fine mist. Keeps makeup fresh for up to 16 hours without caking or creasing.",
    details: ["16-hour wear", "Micro-fine mist", "Oil-free formula", "Suitable for all skin types"],
  },
  {
    id: "lip-01",
    name: "Velvet Matte Lipstick Waterproof",
    brand: "Nigar Cosmetics",
    image: lipstickImg,
    price: 699,
    oldPrice: 999,
    rating: 4.8,
    reviews: 512,
    tag: "Trending",
    colors: ["#c0392b", "#e74c3c", "#ff6b81", "#d63384", "#922b21", "#7b241c"],
    category: "Lips",
    description: "Get ready to shine with this cult-loved tinted gloss! This smoothie formula gives your lips a fuller, lip-hugging super lightweight and comfy — no stickiness. It glides the way. Its one-application is all you need.",
    details: ["Waterproof formula", "Matte finish", "Long lasting", "Cruelty free"],
  },
  {
    id: "pal-01",
    name: "Warm Tone Eyeshadow Palette 12 Shades",
    brand: "Nigar Eyes",
    image: paletteImg,
    price: 2499,
    oldPrice: 3499,
    rating: 4.7,
    reviews: 189,
    colors: ["#d4a574", "#c68642", "#8d6e63", "#5d4037"],
    category: "Eyes",
    description: "A curated palette of 12 warm-toned shades ranging from soft mattes to shimmering metallics. Perfect for creating day-to-night looks.",
    details: ["12 shades", "Mix of matte & shimmer", "Highly pigmented", "Blendable formula"],
  },
  {
    id: "fnd-01",
    name: "Flawless Full Coverage Foundation",
    brand: "Nigar Skin",
    image: foundationImg,
    price: 1599,
    oldPrice: 2199,
    rating: 4.6,
    reviews: 345,
    tag: "New",
    colors: ["#fce4c7", "#f5d0a9", "#e8b886", "#d4a06a", "#c08c5a", "#a0724a"],
    category: "Face",
    description: "Achieve a flawless, natural-looking finish with this full coverage foundation. Lightweight texture that blends seamlessly for an airbrushed appearance.",
    details: ["Full coverage", "Lightweight feel", "SPF 15", "Available in 6 shades"],
  },
  {
    id: "mas-01",
    name: "Volume & Length Mascara Blackest Black",
    brand: "Nigar Eyes",
    image: mascaraImg,
    price: 899,
    rating: 4.4,
    reviews: 156,
    colors: ["#1a1a1a", "#2c2c2c"],
    category: "Eyes",
    description: "Dramatic volume and length in one swipe. The precision brush separates and coats each lash for a bold, clump-free finish.",
    details: ["Clump-free", "Smudge-proof", "Easy to remove", "Ophthalmologist tested"],
  },
  {
    id: "blush-01",
    name: "Silk Finish Blush Natural Glow",
    brand: "Nigar Glow",
    image: blushImg,
    price: 999,
    oldPrice: 1499,
    rating: 4.9,
    reviews: 423,
    tag: "Hot",
    colors: ["#f8a4b8", "#e88da0", "#d4758a", "#cc6680"],
    category: "Face",
    description: "A silky-smooth powder blush that delivers a natural flush of colour. Buildable coverage for a subtle or dramatic look.",
    details: ["Silky texture", "Buildable colour", "Long-lasting wear", "Dermatologist tested"],
  },
  {
    id: "primer-01",
    name: "Glow Primer Pore Minimizing",
    brand: "Nigar Skin",
    image: primerImg,
    price: 1199,
    rating: 4.3,
    reviews: 98,
    category: "Face",
    description: "Create the perfect canvas for your makeup with this pore-minimizing primer. Smooths skin texture and extends the wear of your foundation.",
    details: ["Pore minimizing", "Smoothing formula", "Oil-free", "Extends makeup wear"],
  },
  {
    id: "conc-01",
    name: "HD Pro Concealer Full Coverage",
    brand: "Nigar Skin",
    image: concealerImg,
    price: 799,
    oldPrice: 1099,
    rating: 4.5,
    reviews: 267,
    tag: "Popular",
    colors: ["#fce4c7", "#f0d0a8", "#dbb88a", "#c49a6c", "#a87d54"],
    category: "Face",
    description: "High-definition concealer that covers dark circles, blemishes, and imperfections. Crease-proof formula lasts all day.",
    details: ["Full coverage", "Crease-proof", "Lightweight", "5 shades available"],
  },
  {
    id: "liner-01",
    name: "Precision Liquid Eyeliner Jet Black",
    brand: "Nigar Eyes",
    image: mascaraImg,
    price: 499,
    oldPrice: 699,
    rating: 4.6,
    reviews: 312,
    tag: "Best Seller",
    category: "Eyes",
    description: "Ultra-fine tip for precise lines every time. Waterproof and smudge-proof for all-day wear.",
    details: ["Ultra-fine tip", "Waterproof", "Quick-drying", "Intense pigmentation"],
  },
  {
    id: "gloss-01",
    name: "High Shine Lip Gloss Hydrating",
    brand: "Nigar Cosmetics",
    image: lipstickImg,
    price: 549,
    oldPrice: 799,
    rating: 4.7,
    reviews: 198,
    colors: ["#ff9a9e", "#fda085", "#f093fb", "#ff6b81"],
    category: "Lips",
    description: "A non-sticky, high-shine gloss infused with vitamin E for hydrated, glossy lips all day long.",
    details: ["Non-sticky", "Vitamin E infused", "High shine finish", "Hydrating formula"],
  },
  {
    id: "powder-01",
    name: "Translucent Finishing Powder Matte",
    brand: "Nigar Beauty",
    image: sprayImg,
    price: 899,
    oldPrice: 1199,
    rating: 4.5,
    reviews: 176,
    category: "Face",
    description: "Set your makeup to perfection with this ultra-fine translucent powder. Controls shine without adding weight.",
    details: ["Ultra-fine texture", "Oil control", "Invisible finish", "Suitable for all skin tones"],
  },
  {
    id: "brow-01",
    name: "Micro Brow Pencil Ultra Fine",
    brand: "Nigar Eyes",
    image: paletteImg,
    price: 399,
    rating: 4.3,
    reviews: 89,
    colors: ["#4a3728", "#6b4c3b", "#8d6e63"],
    category: "Eyes",
    description: "Define and fill your brows with hair-like strokes using this ultra-fine pencil. Built-in spoolie for blending.",
    details: ["Ultra-fine tip", "Built-in spoolie", "Natural finish", "Long-wearing"],
  },
];

export const categories = ["All", "Face", "Lips", "Eyes", "Nails", "Skin"];
export const brands = [...new Set(allProducts.map((p) => p.brand))];
