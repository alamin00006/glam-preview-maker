import { motion } from "framer-motion";
import heroImg from "@/assets/hero-nigar.jpg";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img
        src={heroImg}
        alt="Nigar Fashion World Makeup Studio"
        className="w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/85 via-pink-dark/60 to-transparent" />
    </div>

    <div className="relative z-10 container mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl"
      >
        <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-4 font-medium">
          ✦ Nigar Fashion World ✦
        </p>
        <h1 className="text-5xl md:text-7xl font-display text-primary-foreground leading-[1.1] mb-6">
          Master the Art of <em className="italic text-gold">Beauty</em>
        </h1>
        <p className="text-primary-foreground/80 font-body text-lg md:text-xl leading-relaxed mb-4 max-w-lg">
          প্রফেশনাল মেকআপ শিখুন আমাদের এক্সপার্ট ট্রেইনারদের কাছ থেকে। 
          রেকর্ডেড ভিডিও অথবা ফিজিক্যাল ক্লাসে ভর্তি হোন আজই!
        </p>
        <p className="text-primary-foreground/60 font-body text-base leading-relaxed mb-10 max-w-lg">
          Learn professional makeup from expert trainers. Choose between recorded video course or hands-on physical classes!
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#courses"
            className="inline-flex items-center justify-center px-8 py-4 bg-gold text-dark font-body font-semibold text-sm tracking-wider uppercase rounded-full hover:bg-yellow transition-colors duration-300 shadow-lg"
          >
            View Courses
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center px-8 py-4 border border-primary-foreground/30 text-primary-foreground font-body text-sm tracking-wider uppercase rounded-full hover:bg-primary-foreground/10 transition-colors duration-300"
          >
            See Pricing
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
