import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, CreditCard, CheckCircle2, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logoImg from "@/assets/logo-nigar.jpg";

const courses: Record<string, { name: string; nameEn: string; price: number; priceDisplay: string }> = {
  recorded: { name: "রেকর্ডেড ভিডিও কোর্স", nameEn: "Recorded Video Course", price: 2999, priceDisplay: "৳২,৯৯৯" },
  physical: { name: "ফিজিক্যাল কোর্স", nameEn: "Physical Course", price: 7999, priceDisplay: "৳৭,৯৯৯" },
};

const Payment = () => {
  const [params] = useSearchParams();
  const courseId = params.get("course") || "recorded";
  const course = courses[courseId] || courses.recorded;
  const { user, purchaseCourse } = useAuth();
  
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [formData, setFormData] = useState({ name: user?.name || "", phone: "", trxId: "" });

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");
    setTimeout(() => {
      purchaseCourse(courseId);
      setStep("success");
    }, 2500);
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-3xl shadow-2xl border border-pink-light/50 p-10 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="font-display text-2xl text-foreground mb-2">পেমেন্ট সফল!</h2>
          <p className="text-muted-foreground font-body text-sm mb-2">Payment Successful</p>
          <p className="text-muted-foreground font-body text-sm mb-6">
            {course.name} — {course.priceDisplay}
          </p>
          <div className="flex flex-col gap-3">
            {courseId === "recorded" && (
              <Link
                to="/videos"
                className="w-full py-3 bg-pink text-primary-foreground font-body font-semibold text-sm rounded-xl hover:bg-hot-pink transition-colors"
              >
                ভিডিও দেখুন — Watch Videos
              </Link>
            )}
            <Link
              to="/profile"
              className="w-full py-3 border border-pink-light text-foreground font-body text-sm rounded-xl hover:bg-pink-light transition-colors"
            >
              প্রোফাইলে যান — Go to Profile
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-10 right-20 w-80 h-80 bg-pink/15 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-20 w-60 h-60 bg-gold/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="bg-card/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-pink-light/50 p-8 md:p-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-body text-sm">Back</span>
            </Link>
            <img src={logoImg} alt="Logo" className="w-10 h-10 rounded-full border-2 border-gold object-cover" />
          </div>

          {/* Course summary */}
          <div className="bg-blush rounded-2xl p-5 mb-6 border border-pink-light">
            <p className="font-body text-xs text-pink uppercase tracking-wider font-semibold mb-1">Order Summary</p>
            <h3 className="font-display text-lg text-foreground">{course.name}</h3>
            <p className="text-muted-foreground font-body text-xs mb-3">{course.nameEn}</p>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-display text-foreground">{course.priceDisplay}</span>
              <span className="text-muted-foreground font-body text-xs">BDT {course.price.toLocaleString()}</span>
            </div>
          </div>

          {/* SurjoPay badge */}
          <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-gold/10 border border-gold/30">
            <ShieldCheck className="w-6 h-6 text-gold shrink-0" />
            <div>
              <p className="text-foreground font-body text-sm font-semibold">SurjoPay</p>
              <p className="text-muted-foreground font-body text-xs">Secure Payment Gateway — Demo Mode</p>
            </div>
          </div>

          {step === "processing" ? (
            <div className="py-16 text-center">
              <div className="w-12 h-12 border-4 border-pink border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-foreground font-body font-medium">পেমেন্ট প্রসেসিং...</p>
              <p className="text-muted-foreground font-body text-sm">Processing payment via SurjoPay</p>
            </div>
          ) : (
            <form onSubmit={handlePay} className="space-y-4">
              <div>
                <label className="block font-body text-sm text-foreground mb-1.5 font-medium">নাম / Name</label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 rounded-xl border border-pink-light bg-background px-4 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-pink/50"
                  placeholder="আপনার নাম"
                />
              </div>
              <div>
                <label className="block font-body text-sm text-foreground mb-1.5 font-medium">মোবাইল নম্বর</label>
                <input
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full h-11 rounded-xl border border-pink-light bg-background px-4 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-pink/50"
                  placeholder="01XXXXXXXXX"
                />
              </div>
              <div>
                <label className="block font-body text-sm text-foreground mb-1.5 font-medium">ট্রানজেকশন ID (Optional)</label>
                <input
                  value={formData.trxId}
                  onChange={(e) => setFormData({ ...formData, trxId: e.target.value })}
                  className="w-full h-11 rounded-xl border border-pink-light bg-background px-4 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-pink/50"
                  placeholder="TRX123456"
                />
              </div>

              {!user && (
                <p className="text-center font-body text-xs text-muted-foreground">
                  <Link to="/login" className="text-pink font-medium hover:underline">লগইন করুন</Link> পেমেন্ট ট্র্যাক করতে
                </p>
              )}

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-pink text-primary-foreground font-body font-semibold text-sm tracking-wider uppercase hover:bg-hot-pink transition-colors shadow-lg flex items-center justify-center gap-2 mt-2"
              >
                <CreditCard className="w-4 h-4" />
                পেমেন্ট করুন — Pay {course.priceDisplay}
              </button>

              <p className="text-center text-muted-foreground font-body text-xs flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Secure & encrypted payment
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Payment;
