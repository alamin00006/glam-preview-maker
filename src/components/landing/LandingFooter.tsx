import { Link } from "react-router-dom";
import { Facebook, Phone, Mail, MapPin, Heart, Instagram, ExternalLink } from "lucide-react";
import logoImg from "@/assets/logo-nigar.jpg";

const LandingFooter = () => (
  <footer className="bg-dark pt-12 pb-6">
    <div className="container mx-auto px-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-primary-foreground/10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={logoImg} alt="Logo" className="w-10 h-10 rounded-full border border-gold object-cover" />
            <div>
              <p className="font-display text-base text-primary-foreground">
                <span className="text-gold">Nigar</span> Fashion World
              </p>
              <p className="text-primary-foreground/40 font-body text-[9px] tracking-wider uppercase">Beauty & Cosmetics</p>
            </div>
          </div>
          <p className="text-primary-foreground/50 font-body text-xs leading-relaxed">
            বাংলাদেশের অন্যতম জনপ্রিয় বিউটি ব্র্যান্ড এবং মেকআপ একাডেমি।
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-xs text-gold uppercase tracking-wider mb-3">Quick Links</h4>
          <ul className="space-y-2">
            {[
              { label: "Home", to: "/" },
              { label: "All Products", to: "/details" },
              { label: "Courses", to: "/details" },
              { label: "Login", to: "/login" },
            ].map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-primary-foreground/50 hover:text-gold font-body text-xs transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-display text-xs text-gold uppercase tracking-wider mb-3">Categories</h4>
          <ul className="space-y-2">
            {["Face", "Eyes", "Lips", "Skincare", "Hair", "Brushes"].map((cat) => (
              <li key={cat}>
                <span className="text-primary-foreground/50 font-body text-xs cursor-pointer hover:text-gold transition-colors">
                  {cat}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-xs text-gold uppercase tracking-wider mb-3">Contact</h4>
          <ul className="space-y-2.5">
            <li className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-pink shrink-0" />
              <span className="text-primary-foreground/50 font-body text-xs">Dhaka, Bangladesh</span>
            </li>
            <li>
              <a href="tel:+8801XXXXXXXXX" className="flex items-center gap-2 text-primary-foreground/50 hover:text-gold font-body text-xs transition-colors">
                <Phone className="w-3.5 h-3.5 text-pink shrink-0" />
                +880 1XXX-XXXXXX
              </a>
            </li>
            <li>
              <a href="mailto:info@nigarfashion.com" className="flex items-center gap-2 text-primary-foreground/50 hover:text-gold font-body text-xs transition-colors">
                <Mail className="w-3.5 h-3.5 text-pink shrink-0" />
                info@nigarfashion.com
              </a>
            </li>
          </ul>
          <div className="mt-4 flex items-center gap-2">
            <a href="#" className="w-8 h-8 rounded-full bg-primary-foreground/10 hover:bg-pink flex items-center justify-center transition-colors">
              <Facebook className="w-3.5 h-3.5 text-primary-foreground/60" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-primary-foreground/10 hover:bg-pink flex items-center justify-center transition-colors">
              <Instagram className="w-3.5 h-3.5 text-primary-foreground/60" />
            </a>
            <a href="#" className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary-foreground/10 hover:bg-pink transition-colors">
              <ExternalLink className="w-3 h-3 text-primary-foreground/60" />
              <span className="text-primary-foreground/60 font-body text-[10px]">Facebook</span>
            </a>
          </div>
        </div>
      </div>

      <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-primary-foreground/30 font-body text-[10px]">
          © 2026 Nigar Fashion World. All rights reserved.
        </p>
        <p className="text-primary-foreground/20 font-body text-[10px] flex items-center gap-1">
          Made with <Heart className="w-2.5 h-2.5 text-pink" /> in Bangladesh
        </p>
      </div>
    </div>
  </footer>
);

export default LandingFooter;
