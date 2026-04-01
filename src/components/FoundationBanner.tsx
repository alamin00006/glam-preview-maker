import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bannerImg from "@/assets/banner-foundation.jpg";

const FoundationBanner = () => (
  <section className="py-16 bg-pink-light">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden"
      >
        <img
          src={bannerImg}
          alt="Foundation Matching"
          className="w-full h-56 md:h-72 object-cover"
          loading="lazy"
          width={1200}
          height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 to-dark/30 flex items-center">
          <div className="p-8 md:p-14 max-w-lg">
            <h3 className="font-display text-2xl md:text-4xl text-primary-foreground mb-2">
              Foundation Matching{" "}
              <span className="text-gold italic">Solved!</span>
            </h3>
            <p className="text-primary-foreground/70 font-body text-sm mb-5">
              আপনার স্কিন টোনের সাথে পারফেক্ট ম্যাচ খুঁজে নিন
            </p>
            <Link
              to="/details"
              className="inline-block px-6 py-3 bg-pink text-primary-foreground font-body font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-hot-pink transition-colors"
            >
              Let's Match →
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FoundationBanner;
