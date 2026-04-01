import { motion } from "framer-motion";

const PromoBanner = () => (
  <section className="py-6 bg-background">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative bg-dark rounded-2xl overflow-hidden p-6 md:p-8 flex items-center justify-between min-h-[120px]"
        >
          <div>
            <p className="font-body text-[10px] text-primary-foreground/50 uppercase tracking-wider mb-1">Newly Launched</p>
            <h3 className="font-display text-xl md:text-2xl text-primary-foreground">
              Nigar <span className="text-gold italic">Classics</span>
            </h3>
            <p className="font-body text-xs text-primary-foreground/60 mt-1">Premium collection</p>
          </div>
          <div className="text-right">
            <p className="font-display text-3xl text-gold">7TH</p>
            <p className="font-body text-[10px] text-primary-foreground/50 uppercase">Anniversary</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative bg-pink-light rounded-2xl overflow-hidden p-6 md:p-8 flex items-center justify-between min-h-[120px]"
        >
          <div>
            <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Foundation</p>
            <h3 className="font-display text-xl md:text-2xl text-foreground">
              Make it <span className="text-pink italic">Last!</span>
            </h3>
            <p className="font-body text-xs text-muted-foreground mt-1">Setting spray collection</p>
          </div>
          <div className="text-right">
            <p className="font-body text-sm text-muted-foreground line-through">৳4,250</p>
            <p className="font-display text-3xl text-pink">৳2,199</p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default PromoBanner;
