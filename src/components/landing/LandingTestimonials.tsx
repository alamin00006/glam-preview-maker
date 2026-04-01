import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "ফারহানা আক্তার",
    role: "Regular Customer",
    text: "Nigar Fashion World এর প্রোডাক্ট কোয়ালিটি অসাধারণ! ব্রাইডাল মেকআপে তারা সেরা।",
    rating: 5,
  },
  {
    name: "তাসনিম জাহান",
    role: "Loyal Client",
    text: "পার্টি মেকআপের জন্য সবসময় Nigar কে ট্রাস্ট করি। প্রোডাক্টও অনেক ভালো।",
    rating: 5,
  },
  {
    name: "মাহিয়া মিম",
    role: "Beauty Enthusiast",
    text: "এত ভালো কোয়ালিটির কসমেটিকস এই দামে আর কোথাও পাইনি। ডেলিভারিও দ্রুত।",
    rating: 5,
  },
  {
    name: "নুসরাত শারমিন",
    role: "Makeup Artist",
    text: "প্রফেশনাল কাজে Nigar এর প্রোডাক্ট ব্যবহার করি। ক্লায়েন্টরা খুবই খুশি হয়।",
    rating: 4,
  },
];

const LandingTestimonials = () => (
  <section className="py-16 bg-muted/50">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl md:text-3xl font-display text-foreground">
          Hear it from our <span className="text-pink italic">customers!</span>
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className={`w-3.5 h-3.5 ${j < t.rating ? "fill-gold text-gold" : "text-border"}`} />
              ))}
            </div>
            <p className="font-body text-sm text-foreground/80 leading-relaxed mb-4">"{t.text}"</p>
            <div className="border-t border-border pt-3">
              <p className="font-display text-sm text-foreground">{t.name}</p>
              <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default LandingTestimonials;
