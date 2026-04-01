import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, Search, ShoppingBag, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, toggleCart } from "@/store/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo-nigar.jpg";

const LandingNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-card shadow-md border-b border-border" : "bg-card/95 backdrop-blur-sm"
    }`}>
      {/* Marquee strip */}
      <div className="bg-dark text-primary-foreground overflow-hidden py-1.5">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap flex items-center gap-8"
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="font-body text-[10px] tracking-wider inline-flex items-center gap-6">
              <span>✦ Up to 50% Off + Surprise Gifts</span>
              <span>✦ First Order: Get Extra 10% Off on ৳700+</span>
              <span>✦ Free Shipping on ৳2,000+</span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src={logoImg} alt="Logo" className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-gold" />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-display text-sm md:text-base font-bold tracking-wide">
                <span className="text-pink">N</span>IGAR
              </span>
              <span className="font-body text-[8px] text-muted-foreground tracking-[0.2em] uppercase -mt-0.5">Fashion World</span>
            </div>
          </Link>

          {/* Search bar (desktop) */}
          <div className="hidden lg:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder='Search for "lipstick"'
                className="w-full h-10 pl-4 pr-10 rounded-full border border-border bg-background font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-pink/30 focus:border-pink transition-all"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 md:gap-2">
            <button className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
              <Search className="w-4 h-4 text-foreground" />
            </button>

            {user ? (
              <Link to="/profile" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
                <User className="w-4 h-4 text-foreground" />
              </Link>
            ) : (
              <Link to="/login" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
                <User className="w-4 h-4 text-foreground" />
              </Link>
            )}

            <button className="w-9 h-9 hidden md:flex items-center justify-center rounded-full hover:bg-muted transition-colors relative">
              <Heart className="w-4 h-4 text-foreground" />
            </button>

            <button
              onClick={() => dispatch(toggleCart())}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors relative"
            >
              <ShoppingBag className="w-4 h-4 text-foreground" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] bg-pink rounded-full text-[9px] text-primary-foreground flex items-center justify-center font-body font-bold"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center justify-center gap-6 pb-2 -mt-1">
          {[
            { label: "All Offers", id: "offers" },
            { label: "New Arrivals", id: "new-arrivals" },
            { label: "Best Sellers", id: "best-sellers" },
            { label: "Brands", id: "brands" },
          ].map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.id)}
              className="font-body text-xs tracking-wider text-foreground hover:text-pink transition-colors"
            >
              {link.label}
            </button>
          ))}
          <Link to="/details" className="font-body text-xs tracking-wider text-foreground hover:text-pink transition-colors">
            Courses
          </Link>
          <span className="font-body text-xs tracking-wider text-foreground hover:text-pink transition-colors cursor-pointer">
            Combos & Gift Sets
          </span>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-6 py-5 flex flex-col gap-3">
              {["All Offers", "New Arrivals", "Best Sellers", "Brands"].map((label) => (
                <button
                  key={label}
                  onClick={() => {
                    scrollTo(label.toLowerCase().replace(/ /g, "-"));
                    setMobileOpen(false);
                  }}
                  className="text-foreground font-body text-sm tracking-wider text-left hover:text-pink transition-colors py-1"
                >
                  {label}
                </button>
              ))}
              <Link to="/details" onClick={() => setMobileOpen(false)} className="text-foreground font-body text-sm tracking-wider hover:text-pink transition-colors py-1">
                Courses
              </Link>
              {!user && (
                <Link to="/login" onClick={() => setMobileOpen(false)} className="mt-2 text-center py-2.5 bg-dark text-primary-foreground font-body text-sm tracking-wider uppercase rounded-full">
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default LandingNavbar;
