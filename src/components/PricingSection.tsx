import { motion } from "framer-motion";
import { Check, Video, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    icon: Video,
    tag: "Online",
    name: "রেকর্ডেড ভিডিও কোর্স",
    nameEn: "Recorded Video Course",
    price: "২,৯৯৯",
    priceEn: "BDT 2,999",
    oldPrice: "৫,৯৯৯",
    items: [
      "৫০+ HD ভিডিও লেসন",
      "লাইফটাইম এক্সেস",
      "ডাউনলোডেবল গাইড",
      "ফেসবুক কমিউনিটি",
      "প্রোডাক্ট লিস্ট",
      "সার্টিফিকেট",
    ],
    featured: false,
  },
  {
    icon: MapPin,
    tag: "In-Person",
    name: "ফিজিক্যাল কোর্স",
    nameEn: "Physical Course",
    price: "৭,৯৯৯",
    priceEn: "BDT 7,999",
    oldPrice: "১৪,৯৯৯",
    items: [
      "হাতে-কলমে ট্রেনিং",
      "পার্সোনাল গাইডেন্স",
      "প্র্যাকটিস মেটেরিয়াল সরবরাহ",
      "রেকর্ডেড ভিডিও এক্সেস (ফ্রি)",
      "স্মল ব্যাচ সাইজ",
      "সার্টিফিকেট",
      "জব প্লেসমেন্ট সাপোর্ট",
    ],
    featured: true,
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-24 bg-blush">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-pink font-body text-sm tracking-[0.3em] uppercase mb-3 font-medium">Pricing</p>
        <h2 className="text-3xl md:text-5xl font-display text-foreground mb-2">
          কোর্সের <em className="italic text-pink">মূল্য</em>
        </h2>
        <p className="text-muted-foreground font-body">এককালীন পেমেন্ট। কোনো হিডেন চার্জ নেই।</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={`rounded-2xl p-8 border ${
              plan.featured
                ? "bg-pink text-primary-foreground border-pink shadow-2xl relative"
                : "bg-card border-pink-light shadow-lg"
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-dark font-body text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                ✦ Most Popular
              </span>
            )}
            <div className="flex items-center gap-2 mb-4">
              <plan.icon className={`w-5 h-5 ${plan.featured ? 'text-primary-foreground' : 'text-pink'}`} />
              <span className={`font-body text-xs uppercase tracking-wider font-semibold ${plan.featured ? 'text-primary-foreground/80' : 'text-pink'}`}>
                {plan.tag}
              </span>
            </div>

            <h3 className={`font-display text-xl mb-0 ${plan.featured ? 'text-primary-foreground' : 'text-foreground'}`}>{plan.name}</h3>
            <p className={`font-body text-xs mb-4 ${plan.featured ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{plan.nameEn}</p>

            <div className="mb-6">
              <span className={`font-body text-sm line-through ${plan.featured ? 'text-primary-foreground/50' : 'text-muted-foreground'}`}>৳{plan.oldPrice}</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className={`text-4xl font-display ${plan.featured ? 'text-primary-foreground' : 'text-foreground'}`}>৳{plan.price}</span>
              </div>
              <p className={`font-body text-xs mt-1 ${plan.featured ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{plan.priceEn}</p>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.featured ? 'text-gold' : 'text-pink'}`} />
                  <span className={`font-body text-sm ${plan.featured ? 'text-primary-foreground/90' : 'text-foreground'}`}>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              to={`/payment?course=${plan.featured ? 'physical' : 'recorded'}`}
              className={`block w-full py-3.5 font-body font-semibold text-sm tracking-wider uppercase rounded-full text-center transition-colors ${
                plan.featured
                  ? "bg-primary-foreground text-pink hover:bg-primary-foreground/90"
                  : "bg-pink text-primary-foreground hover:bg-hot-pink"
              }`}
            >
              ভর্তি হোন — Enroll Now
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
