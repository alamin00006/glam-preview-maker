import { motion } from "framer-motion";
import bridalImg from "@/assets/category-bridal.jpg";
import partyImg from "@/assets/category-party.jpg";
import everydayImg from "@/assets/category-everyday.jpg";
import eyeImg from "@/assets/category-eye.jpg";
import skincareImg from "@/assets/category-skincare.jpg";
import hairImg from "@/assets/category-hair.jpg";

const categories = [
  { name: "ব্রাইডাল", nameEn: "Bridal", image: bridalImg },
  { name: "পার্টি", nameEn: "Party", image: partyImg },
  { name: "এভরিডে", nameEn: "Everyday", image: everydayImg },
  { name: "আই মেকআপ", nameEn: "Eye Makeup", image: eyeImg },
  { name: "স্কিনকেয়ার", nameEn: "Skincare", image: skincareImg },
  { name: "হেয়ার", nameEn: "Hair Style", image: hairImg },
];

const CategorySection = () => (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <h2 className="text-2xl md:text-3xl font-display text-foreground uppercase tracking-wide">
          Shop by <em className="italic text-pink">Category</em>
        </h2>
      </motion.div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
        {categories.map((cat, i) => (
          <motion.a
            key={cat.nameEn}
            href="#services"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group text-center cursor-pointer"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full overflow-hidden border-2 border-pink-light group-hover:border-pink transition-colors shadow-md mb-3">
              <img
                src={cat.image}
                alt={cat.nameEn}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
                width={96}
                height={96}
              />
            </div>
            <p className="font-display text-sm text-foreground">{cat.name}</p>
            <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">{cat.nameEn}</p>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default CategorySection;
