import { motion } from "framer-motion";
import bridalImg from "@/assets/category-bridal.jpg";
import partyImg from "@/assets/category-party.jpg";
import eyeImg from "@/assets/category-eye.jpg";
import skincareImg from "@/assets/category-skincare.jpg";
import hairImg from "@/assets/category-hair.jpg";
import everydayImg from "@/assets/category-everyday.jpg";

const quickCats = [
  { label: "Face", image: skincareImg },
  { label: "Eyes", image: eyeImg },
  { label: "Lips", image: partyImg },
  { label: "Cheeks", image: bridalImg },
  { label: "Brushes", image: everydayImg },
  { label: "Hair", image: hairImg },
];

const QuickCategories = () => (
  <section className="py-8 bg-card border-b border-border">
    <div className="container mx-auto px-6">
      <div className="flex items-center justify-center gap-8 md:gap-14 overflow-x-auto pb-2 scrollbar-hide">
        {quickCats.map((cat, i) => (
          <motion.button
            key={cat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex flex-col items-center gap-2 min-w-[60px] group"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-pink-light group-hover:border-pink transition-colors">
              <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" loading="lazy" width={64} height={64} />
            </div>
            <span className="font-body text-[10px] md:text-xs text-foreground uppercase tracking-wider font-medium">{cat.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  </section>
);

export default QuickCategories;
