import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Heart, Crown, Palette, Scissors, Star } from "lucide-react";

const services = [
  {
    icon: Crown,
    title: "ব্রাইডাল মেকআপ",
    titleEn: "Bridal Makeup",
    price: "৳১৫,০০০",
    desc: "আপনার বিশেষ দিনে সবচেয়ে সুন্দর দেখাবেন",
    tag: "Best Seller",
  },
  {
    icon: Sparkles,
    title: "পার্টি মেকআপ",
    titleEn: "Party Makeup",
    price: "৳৫,০০০",
    desc: "যেকোনো অনুষ্ঠানে গ্ল্যামারাস লুক",
    tag: "Popular",
  },
  {
    icon: Palette,
    title: "ফটোশুট মেকআপ",
    titleEn: "Photoshoot Makeup",
    price: "৳৮,০০০",
    desc: "ক্যামেরা-রেডি প্রফেশনাল মেকআপ",
    tag: null,
  },
  {
    icon: Heart,
    title: "এনগেজমেন্ট মেকআপ",
    titleEn: "Engagement Makeup",
    price: "৳১০,০০০",
    desc: "রোমান্টিক এবং এলিগ্যান্ট লুক",
    tag: "New",
  },
  {
    icon: Scissors,
    title: "হেয়ার স্টাইলিং",
    titleEn: "Hair Styling",
    price: "৳৩,০০০",
    desc: "ট্রেন্ডি আপডু এবং হেয়ার ডিজাইন",
    tag: null,
  },
  {
    icon: Star,
    title: "স্কিনকেয়ার ট্রিটমেন্ট",
    titleEn: "Skincare Treatment",
    price: "৳৪,০০০",
    desc: "গ্লোয়িং স্কিনের জন্য প্রিমিয়াম ট্রিটমেন্ট",
    tag: "Trending",
  },
];

const ServicesGrid = () => (
  <section id="services" className="py-20 bg-card">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-pink font-body text-xs tracking-[0.3em] uppercase mb-3 font-medium">Best Sellers</p>
        <h2 className="text-3xl md:text-5xl font-display text-foreground">
          আমাদের <em className="italic text-pink">জনপ্রিয়</em> সার্ভিস
        </h2>
        <p className="text-muted-foreground font-body text-sm mt-2">Our most popular services</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.titleEn}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="relative bg-background rounded-2xl p-6 border border-pink-light hover:border-pink/40 hover:shadow-xl transition-all duration-300 group"
          >
            {s.tag && (
              <span className="absolute top-4 right-4 px-2.5 py-1 bg-gold/15 text-gold-dark font-body text-[10px] font-bold uppercase tracking-wider rounded-full border border-gold/30">
                {s.tag}
              </span>
            )}
            <div className="w-12 h-12 rounded-xl bg-pink-light group-hover:bg-pink flex items-center justify-center mb-4 transition-colors">
              <s.icon className="w-5 h-5 text-pink group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="font-display text-lg text-foreground mb-0.5">{s.title}</h3>
            <p className="text-muted-foreground font-body text-xs mb-2">{s.titleEn}</p>
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">{s.desc}</p>
            <div className="flex items-center justify-between">
              <span className="font-display text-xl text-foreground">{s.price}</span>
              <Link
                to="/details"
                className="text-pink font-body text-xs font-semibold uppercase tracking-wider hover:text-hot-pink transition-colors"
              >
                Details →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesGrid;
