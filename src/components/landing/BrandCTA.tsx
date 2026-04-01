import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logoImg from "@/assets/logo-nigar.jpg";

const BrandCTA = () => (
  <section className="py-14 bg-card border-t border-border">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Brands logos */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-6"
        >
          {["L.A Girl", "Focallure", "Revolution", "NYX", "MILANI", "JESSUP"].map((brand) => (
            <span key={brand} className="font-display text-lg md:text-xl text-muted-foreground/40 hover:text-foreground transition-colors cursor-pointer">
              {brand}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-right"
        >
          <div className="flex items-center justify-end gap-3 mb-3">
            <img src={logoImg} alt="Logo" className="w-10 h-10 rounded-full border border-gold object-cover" />
            <span className="font-display text-2xl text-foreground">
              <span className="text-pink">Nigar</span> Beauty
            </span>
          </div>
          <h3 className="font-display text-xl md:text-2xl text-foreground mb-2 italic">
            Straight From The Source!
          </h3>
          <p className="font-body text-xs text-muted-foreground mb-4 max-w-sm ml-auto">
            We bring you authentic beauty products direct from brands — for professionals, salons, retailers & academies.
          </p>
          <div className="flex flex-wrap gap-2 justify-end mb-5">
            {["Individuals", "Salons", "Retailers", "Academies"].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-muted rounded-full font-body text-[10px] text-foreground uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
          <Link
            to="/details"
            className="inline-block px-8 py-3 border-2 border-dark text-foreground font-body text-xs uppercase tracking-[0.15em] hover:bg-dark hover:text-primary-foreground transition-all duration-300"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

export default BrandCTA;
