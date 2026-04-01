import { motion } from "framer-motion";
import trendImg from "@/assets/trending-lipstick.jpg";

const TrendsBanner = () => (
  <section className="py-12 bg-card">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <h2 className="text-lg md:text-xl font-display uppercase tracking-wider text-foreground">
          Trends <span className="text-pink">You Can't Miss</span>
        </h2>
        <p className="font-body text-xs text-muted-foreground mt-0.5">মিস করবেন না এই ট্রেন্ড</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-2xl overflow-hidden group cursor-pointer"
      >
        <img
          src={trendImg}
          alt="Trending Lipstick Collection"
          className="w-full h-48 md:h-80 object-cover group-hover:scale-[1.02] transition-transform duration-700"
          loading="lazy"
          width={1200}
          height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/60 to-transparent flex items-center">
          <div className="p-6 md:p-10">
            <h3 className="font-display text-3xl md:text-5xl text-primary-foreground leading-tight">
              SMOOTH GLIDE
              <br />
              <span className="font-bold">APPLICATION</span>
            </h3>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default TrendsBanner;
