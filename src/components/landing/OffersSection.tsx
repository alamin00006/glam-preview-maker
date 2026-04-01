import { motion } from "framer-motion";

const offers = [
  { title: "Every Day", subtitle: "BUY ANY 2", price: "৳1,499", bg: "bg-gradient-to-br from-gold/20 to-gold/5", textColor: "text-gold-dark" },
  { title: "BUY ANY 3", subtitle: "Combo Pack", price: "৳10,999", bg: "bg-gradient-to-br from-pink/15 to-pink/5", textColor: "text-pink" },
  { title: "Saving Store", subtitle: "UPTO 40% OFF", price: "", bg: "bg-gradient-to-br from-hot-pink/15 to-hot-pink/5", textColor: "text-hot-pink" },
];

const OffersSection = () => (
  <section id="offers" className="py-12 bg-background">
    <div className="container mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-lg md:text-xl font-display uppercase tracking-wider text-foreground mb-8"
      >
        You <span className="text-pink">Can't Miss!</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {offers.map((offer, i) => (
          <motion.div
            key={offer.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`${offer.bg} rounded-2xl p-6 md:p-8 border border-border hover:shadow-lg transition-all cursor-pointer min-h-[180px] flex flex-col justify-between`}
          >
            <div>
              <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{offer.subtitle}</p>
              <h3 className={`font-display text-2xl md:text-3xl ${offer.textColor}`}>{offer.title}</h3>
            </div>
            {offer.price && (
              <p className={`font-display text-3xl md:text-4xl ${offer.textColor} mt-3`}>{offer.price}</p>
            )}
            <button className="mt-4 self-start font-body text-xs text-foreground uppercase tracking-wider hover:text-pink transition-colors">
              Shop Now →
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default OffersSection;
