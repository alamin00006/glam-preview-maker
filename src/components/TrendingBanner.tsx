import { motion } from "framer-motion";
import trendImg from "@/assets/trending-lipstick.jpg";

const TrendingBanner = () => (
  <section className="py-16 bg-blush">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <p className="text-pink font-body text-xs tracking-[0.3em] uppercase mb-2 font-medium">Trends You Can't Miss</p>
        <h2 className="text-2xl md:text-4xl font-display text-foreground">
          আমাদের <em className="italic text-pink">ট্রেন্ডিং</em> সার্ভিস
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden group cursor-pointer"
      >
        <img
          src={trendImg}
          alt="Trending Beauty Products"
          className="w-full h-64 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
          width={1200}
          height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent flex items-end">
          <div className="p-8 md:p-12">
            <h3 className="font-display text-3xl md:text-5xl text-primary-foreground mb-2">
              Smooth Glide<br />
              <span className="text-gold">Application</span>
            </h3>
            <p className="text-primary-foreground/70 font-body text-sm max-w-md">
              প্রিমিয়াম লিপস্টিক কালেকশন — আপনার স্টাইল, আপনার চয়েস
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default TrendingBanner;
