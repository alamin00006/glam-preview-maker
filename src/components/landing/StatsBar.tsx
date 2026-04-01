import { motion } from "framer-motion";

const stats = [
  { value: "2019", label: "প্রতিষ্ঠিত", labelEn: "Established" },
  { value: "2K+", label: "সন্তুষ্ট ক্লায়েন্ট", labelEn: "Happy Clients" },
  { value: "25+", label: "সার্ভিস", labelEn: "Services" },
  { value: "110+", label: "৫-স্টার রিভিউ", labelEn: "5★ Reviews" },
];

const StatsBar = () => (
  <section className="py-10 bg-dark">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.labelEn}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <p className="text-2xl md:text-3xl font-display text-gold">{s.value}</p>
            <p className="font-body text-xs text-primary-foreground/70 mt-0.5">{s.label}</p>
            <p className="font-body text-[9px] text-primary-foreground/30 uppercase tracking-wider">{s.labelEn}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsBar;
