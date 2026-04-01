import { motion } from "framer-motion";

const brands = [
  { name: "Focallure", style: "font-bold tracking-wider" },
  { name: "JESSUP", style: "font-bold tracking-[0.3em]" },
  { name: "Revolution", style: "italic font-medium" },
  { name: "MILANI", style: "font-bold tracking-[0.2em]" },
  { name: "L.A Girl", style: "font-medium" },
  { name: "NYX", style: "font-bold tracking-wider" },
];

const BrandsOnBoard = () => (
  <section id="brands" className="py-10 bg-card border-y border-border">
    <div className="container mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-lg md:text-xl font-display uppercase tracking-wider text-foreground mb-8"
      >
        Brands <span className="text-pink">On Board</span>
      </motion.h2>

      <div className="flex items-center justify-between gap-6 overflow-x-auto pb-2">
        {brands.map((brand, i) => (
          <motion.div
            key={brand.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex-shrink-0 px-6 py-4 border border-border rounded-xl hover:border-pink/30 hover:shadow-sm transition-all cursor-pointer min-w-[130px] text-center"
          >
            <span className={`font-display text-base md:text-lg text-foreground ${brand.style}`}>
              {brand.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BrandsOnBoard;
