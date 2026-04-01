import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import heroImg1 from "@/assets/hero-beauty-banner.jpg";
import heroImg2 from "@/assets/hero-slide-2.jpg";
import heroImg3 from "@/assets/hero-slide-3.jpg";
import heroImg4 from "@/assets/hero-slide-4.jpg";

const slides = [
  {
    image: heroImg1,
    tag: "Nigar Fashion World",
    title: "Blur. Set.",
    titleHighlight: "Go Bold.",
    subtitle: "Create flawless essentials.",
    cta: "Shop Now",
    href: "#best-sellers",
  },
  {
    image: heroImg2,
    tag: "New Arrivals",
    title: "Your glow-up",
    titleHighlight: "essentials arrived.",
    subtitle: "Tap into our new skincare range.",
    cta: "Explore",
    href: "#new-arrivals",
  },
  {
    image: heroImg3,
    tag: "Best Sellers",
    title: "Back on",
    titleHighlight: "Popular Demand.",
    subtitle: "Lip shades that won't quit on you.",
    cta: "Shop Lips",
    href: "#best-sellers",
  },
  {
    image: heroImg4,
    tag: "Trending Now",
    title: "Turn Up",
    titleHighlight: "the Glow.",
    subtitle: "Build, blend, and perfect with pro formulas.",
    cta: "Shop Eyes",
    href: "#best-sellers",
  },
];

const LandingHero = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section className="relative h-[60vh] md:h-[75vh] lg:h-[82vh] overflow-hidden bg-dark">
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            width={1920}
            height={900}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-lg"
            >
              <span className="inline-block px-3 py-1 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground/70 font-body text-[10px] uppercase tracking-[0.25em] rounded-full mb-4">
                {slide.tag}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-primary-foreground leading-[1.1] mb-3">
                {slide.title}
                <br />
                <span className="text-gold italic">{slide.titleHighlight}</span>
              </h1>
              <p className="text-primary-foreground/60 font-body text-sm md:text-base mb-6 max-w-sm">
                {slide.subtitle}
              </p>
              <a
                href={slide.href}
                className="inline-block px-8 py-3 bg-primary-foreground text-dark font-body text-xs tracking-[0.15em] uppercase font-semibold hover:bg-gold hover:text-dark transition-all duration-300"
              >
                {slide.cta}
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5 text-primary-foreground" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5 text-primary-foreground" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-gold" : "w-2 bg-primary-foreground/30 hover:bg-primary-foreground/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default LandingHero;
