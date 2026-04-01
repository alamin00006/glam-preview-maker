import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo-nigar.jpg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Courses", action: () => scrollTo("courses") },
    { label: "Features", action: () => scrollTo("features") },
    { label: "Testimonials", action: () => scrollTo("testimonials") },
    { label: "Pricing", action: () => scrollTo("pricing") },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-lg py-3 border-b border-pink-light"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoImg} alt="Nigar Fashion World Logo" className="w-10 h-10 rounded-full object-cover border-2 border-gold" />
          <span className="font-display text-xl font-bold text-gold">Nigar</span>
          <span className={`font-display text-xl ${scrolled ? 'text-foreground' : 'text-primary-foreground'}`}>Fashion World</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              className={`font-body text-xs tracking-[0.15em] uppercase transition-colors ${
                scrolled ? 'text-muted-foreground hover:text-pink' : 'text-primary-foreground/80 hover:text-primary-foreground'
              }`}
            >
              {link.label}
            </button>
          ))}
          <Link
            to="/details"
            className={`font-body text-xs tracking-[0.15em] uppercase transition-colors ${
              scrolled ? 'text-muted-foreground hover:text-pink' : 'text-primary-foreground/80 hover:text-primary-foreground'
            }`}
          >
            Details
          </Link>
          {user ? (
            <Link
              to="/profile"
              className={`flex items-center gap-1.5 font-body text-xs tracking-[0.15em] uppercase transition-colors ${
                scrolled ? 'text-muted-foreground hover:text-pink' : 'text-primary-foreground/80 hover:text-primary-foreground'
              }`}
            >
              <User className="w-4 h-4" />
              Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className={`font-body text-xs tracking-[0.15em] uppercase transition-colors ${
                scrolled ? 'text-muted-foreground hover:text-pink' : 'text-primary-foreground/80 hover:text-primary-foreground'
              }`}
            >
              Login
            </Link>
          )}
          <Link
            to="/payment?course=recorded"
            className="px-5 py-2.5 bg-pink text-primary-foreground font-body font-semibold text-xs tracking-wider uppercase rounded-full hover:bg-hot-pink transition-colors shadow-md"
          >
            Enroll Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden ${scrolled ? 'text-foreground' : 'text-primary-foreground'}`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card/98 backdrop-blur-md overflow-hidden border-b border-pink-light"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="text-muted-foreground hover:text-pink font-body text-sm tracking-wider uppercase text-left transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <Link
                to="/details"
                onClick={() => setMobileOpen(false)}
                className="text-muted-foreground hover:text-pink font-body text-sm tracking-wider uppercase transition-colors"
              >
                Details
              </Link>
              {user ? (
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="text-muted-foreground hover:text-pink font-body text-sm tracking-wider uppercase transition-colors flex items-center gap-2"
                >
                  <User className="w-4 h-4" /> Profile
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-muted-foreground hover:text-pink font-body text-sm tracking-wider uppercase transition-colors"
                >
                  Login
                </Link>
              )}
              <Link
                to="/payment?course=recorded"
                onClick={() => setMobileOpen(false)}
                className="mt-2 text-center px-5 py-3 bg-pink text-primary-foreground font-body font-semibold text-sm tracking-wider uppercase rounded-full"
              >
                Enroll Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
