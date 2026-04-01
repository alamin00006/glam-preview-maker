import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "ফারহানা আক্তার",
    role: "রেকর্ডেড কোর্স স্টুডেন্ট",
    text: "ঘরে বসে এত সুন্দরভাবে মেকআপ শিখতে পারব ভাবতেই পারিনি! ভিডিওগুলো অনেক সহজ এবং বোঝা যায়।",
  },
  {
    name: "তাসনিম জাহান",
    role: "ফিজিক্যাল কোর্স স্টুডেন্ট",
    text: "ফিজিক্যাল ক্লাসে হাতে-কলমে শেখার অভিজ্ঞতা অসাধারণ ছিল। নিগার আপু খুব ধৈর্য ধরে সবকিছু শেখান।",
  },
  {
    name: "মাহিয়া মিম",
    role: "রেকর্ডেড কোর্স স্টুডেন্ট",
    text: "বাজেট ফ্রেন্ডলি প্রোডাক্ট দিয়ে এত সুন্দর মেকআপ করা যায় — এটা এই কোর্স থেকেই শিখেছি!",
  },
];

const TestimonialsSection = () => (
  <section id="testimonials" className="py-24 bg-dark">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-3 font-medium">Testimonials</p>
        <h2 className="text-3xl md:text-5xl font-display text-primary-foreground">
          আমাদের <em className="italic text-gold">স্টুডেন্টরা</em> কি বলছে
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="text-primary-foreground/80 font-body text-sm leading-relaxed mb-6">
              "{t.text}"
            </p>
            <div>
              <p className="text-primary-foreground font-display text-base">{t.name}</p>
              <p className="text-hot-pink/70 font-body text-xs tracking-wider">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
