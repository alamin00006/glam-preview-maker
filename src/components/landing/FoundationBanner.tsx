import { motion } from "framer-motion";
import bannerImg from "@/assets/banner-foundation.jpg";

const FoundationBanner = () => (
  <section className="py-10 bg-background">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-2xl overflow-hidden group"
      >
        <img
          src={bannerImg}
          alt="Foundation Matching"
          className="w-full h-48 md:h-64 object-cover"
          loading="lazy"
          width={1200}
          height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink/80 to-pink/40 flex items-center">
          <div className="p-6 md:p-10 max-w-md">
            <h3 className="font-display text-2xl md:text-4xl text-primary-foreground leading-tight mb-1">
              Foundation Matching
              <br />
              <span className="font-bold italic">Solved!</span>
            </h3>
            <p className="text-primary-foreground/80 font-body text-sm mb-4">
              Say bye to "Close Enough"
            </p>
            <button className="px-6 py-2.5 bg-dark text-primary-foreground font-body text-xs uppercase tracking-wider hover:bg-foreground transition-colors">
              Let's Match →
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FoundationBanner;
