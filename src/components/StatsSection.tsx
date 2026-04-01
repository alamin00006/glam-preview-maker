import { motion } from "framer-motion";

const stats = [
  { value: "2019", label: "থেকে যাত্রা", labelEn: "Since" },
  { value: "2K+", label: "সন্তুষ্ট ক্লায়েন্ট", labelEn: "Happy Clients" },
  { value: "25+", label: "সার্ভিস", labelEn: "Services" },
  { value: "110+", label: "রিভিউ", labelEn: "5★ Reviews" },
];

const StatsSection = () => (
  <section className="py-14 bg-dark">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.labelEn}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <p className="text-3xl md:text-4xl font-display text-gold mb-1">{s.value}</p>
            <p className="text-primary-foreground/80 font-body text-sm">{s.label}</p>
            <p className="text-primary-foreground/40 font-body text-[10px] uppercase tracking-wider">{s.labelEn}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
