import { Link } from "react-router-dom";
import { Facebook, Phone, Mail, MapPin, Clock, Heart, ExternalLink } from "lucide-react";
import logoImg from "@/assets/logo-nigar.jpg";

const FooterSection = () => (
  <footer className="bg-dark pt-16 pb-8">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-10 pb-10 border-b border-primary-foreground/10">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img src={logoImg} alt="Nigar Fashion World Logo" className="w-12 h-12 rounded-full border-2 border-gold object-cover" />
            <div>
              <p className="font-display text-lg text-primary-foreground">
                <span className="text-gold">Nigar</span> Fashion World
              </p>
              <p className="text-primary-foreground/50 font-body text-xs tracking-wider">
                প্রফেশনাল মেকআপ কোর্স
              </p>
            </div>
          </div>
          <p className="text-primary-foreground/50 font-body text-sm leading-relaxed">
            বাংলাদেশের অন্যতম জনপ্রিয় মেকআপ ট্রেনিং একাডেমি। আমাদের সাথে শিখুন প্রফেশনাল মেকআপ আর্ট।
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-sm text-gold uppercase tracking-wider mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {[
              { label: "হোম", to: "/" },
              { label: "কোর্সের বিস্তারিত", to: "/details" },
              { label: "ভিডিও কোর্স", to: "/videos" },
              { label: "লগইন", to: "/login" },
              { label: "প্রোফাইল", to: "/profile" },
            ].map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-primary-foreground/60 hover:text-gold font-body text-sm transition-colors flex items-center gap-1.5">
                  <ChevronIcon />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Courses */}
        <div>
          <h4 className="font-display text-sm text-gold uppercase tracking-wider mb-4">Courses</h4>
          <ul className="space-y-2.5">
            <li>
              <Link to="/payment?course=recorded" className="text-primary-foreground/60 hover:text-gold font-body text-sm transition-colors flex items-center gap-1.5">
                <ChevronIcon />
                রেকর্ডেড ভিডিও কোর্স — ৳২,৯৯৯
              </Link>
            </li>
            <li>
              <Link to="/payment?course=physical" className="text-primary-foreground/60 hover:text-gold font-body text-sm transition-colors flex items-center gap-1.5">
                <ChevronIcon />
                ফিজিক্যাল কোর্স — ৳৭,৯৯৯
              </Link>
            </li>
          </ul>
          <div className="mt-6 p-3 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10">
            <p className="text-primary-foreground/50 font-body text-xs flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> সীমিত সময়ের অফার চলছে!
            </p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-sm text-gold uppercase tracking-wider mb-4">Contact</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-pink mt-0.5 shrink-0" />
              <span className="text-primary-foreground/60 font-body text-sm">Dhaka, Bangladesh</span>
            </li>
            <li>
              <a href="tel:+8801XXXXXXXXX" className="flex items-center gap-3 text-primary-foreground/60 hover:text-gold font-body text-sm transition-colors">
                <Phone className="w-4 h-4 text-pink shrink-0" />
                +880 1XXX-XXXXXX
              </a>
            </li>
            <li>
              <a href="mailto:info@nigarfashionworld.com" className="flex items-center gap-3 text-primary-foreground/60 hover:text-gold font-body text-sm transition-colors">
                <Mail className="w-4 h-4 text-pink shrink-0" />
                info@nigarfashionworld.com
              </a>
            </li>
          </ul>

          {/* Social */}
          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://www.facebook.com/NigarFashionWorld"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-pink flex items-center justify-center transition-colors group"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4 text-primary-foreground/60 group-hover:text-primary-foreground" />
            </a>
            <a
              href="https://www.facebook.com/NigarFashionWorld"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-primary-foreground/10 hover:bg-pink text-primary-foreground/60 hover:text-primary-foreground font-body text-xs transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Facebook Page
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-primary-foreground/40 font-body text-xs">
          © 2026 Nigar Fashion World. All rights reserved.
        </p>
        <p className="text-primary-foreground/30 font-body text-xs flex items-center gap-1">
          Made with <Heart className="w-3 h-3 text-pink" /> in Bangladesh
        </p>
      </div>
    </div>
  </footer>
);

const ChevronIcon = () => (
  <svg className="w-3 h-3 text-pink/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export default FooterSection;
