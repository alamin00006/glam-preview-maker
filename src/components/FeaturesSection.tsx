import { motion } from "framer-motion";
import { Sparkles, Video, Award, Users, BookOpen, Heart } from "lucide-react";

const features = [
  { icon: Video, title: "HD ভিডিও লেসন", titleEn: "HD Video Lessons", desc: "প্রতিটি স্টেপ পরিষ্কারভাবে বোঝানো হয়েছে প্রফেশনাল ভিডিওতে।" },
  { icon: Sparkles, title: "প্রোডাক্ট গাইড", titleEn: "Product Guide", desc: "বাজেট ফ্রেন্ডলি থেকে হাই-এন্ড প্রোডাক্ট — সব কিছুর গাইড।" },
  { icon: Users, title: "কমিউনিটি সাপোর্ট", titleEn: "Community Support", desc: "ফেসবুক গ্রুপে অন্যান্য স্টুডেন্টদের সাথে যুক্ত থাকুন।" },
  { icon: Award, title: "সার্টিফিকেট", titleEn: "Certificate", desc: "কোর্স শেষে সার্টিফিকেট পাবেন যা আপনার ক্যারিয়ার শুরু করতে সাহায্য করবে।" },
  { icon: BookOpen, title: "স্টেপ বাই স্টেপ", titleEn: "Step by Step", desc: "বিগিনার ফ্রেন্ডলি — একদম শূন্য থেকে প্রফেশনাল লেভেল পর্যন্ত।" },
  { icon: Heart, title: "পার্সোনাল কেয়ার", titleEn: "Personal Care", desc: "প্রতিটি স্টুডেন্টকে আলাদাভাবে গাইড করা হয়।" },
];

const FeaturesSection = () => (
  <section id="features" className="py-24 bg-card">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-pink font-body text-sm tracking-[0.3em] uppercase mb-3 font-medium">Why Choose Us</p>
        <h2 className="text-3xl md:text-5xl font-display text-foreground">
          কেন <em className="italic text-pink">Nigar Fashion World?</em>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="text-center p-8 rounded-2xl bg-blush hover:shadow-lg transition-all duration-300 border border-pink-light hover:border-pink/30 group"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-pink-light group-hover:bg-pink group-hover:text-primary-foreground mb-5 transition-colors">
              <f.icon className="w-6 h-6 text-pink group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="font-display text-lg mb-1 text-foreground">{f.title}</h3>
            <p className="text-pink font-body text-xs mb-3">{f.titleEn}</p>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
