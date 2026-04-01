import { motion } from "framer-motion";
import bridalImg from "@/assets/category-bridal.jpg";
import partyImg from "@/assets/category-party.jpg";
import eyeImg from "@/assets/category-eye.jpg";
import skincareImg from "@/assets/category-skincare.jpg";
import hairImg from "@/assets/category-hair.jpg";
import everydayImg from "@/assets/category-everyday.jpg";

const categories = [
  { name: "Bridal", nameBn: "ব্রাইডাল", image: bridalImg },
  { name: "Party", nameBn: "পার্টি", image: partyImg },
  { name: "Eye Makeup", nameBn: "আই মেকআপ", image: eyeImg },
  { name: "Skincare", nameBn: "স্কিনকেয়ার", image: skincareImg },
  { name: "Hair Style", nameBn: "হেয়ার স্টাইল", image: hairImg },
  { name: "Everyday", nameBn: "এভরিডে", image: everydayImg },
];

const ShopByCategory = () => (
  <section className="py-12 bg-background">
    <div className="container mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-lg md:text-xl font-display uppercase tracking-wider text-foreground mb-8"
      >
        Shop by <span className="text-pink">Category</span>
      </motion.h2>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="group text-center"
          >
            <div className="aspect-square rounded-2xl overflow-hidden border border-border group-hover:border-pink transition-all shadow-sm group-hover:shadow-md mb-2.5">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                width={200}
                height={200}
              />
            </div>
            <p className="font-body text-xs text-foreground font-medium">{cat.nameBn}</p>
            <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">{cat.name}</p>
          </motion.button>
        ))}
      </div>
    </div>
  </section>
);

export default ShopByCategory;
