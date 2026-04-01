import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logoImg from "@/assets/logo-nigar.jpg";

const Login = () => {
  const [email, setEmail] = useState("demo@nigar.com");
  const [password, setPassword] = useState("123456");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/profile");
    } else {
      setError("ভুল ইমেইল বা পাসওয়ার্ড! Demo: demo@nigar.com / 123456");
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-card/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-pink-light/50 p-8 md:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <img src={logoImg} alt="Logo" className="w-16 h-16 rounded-full border-2 border-gold mx-auto mb-4 object-cover" />
            </Link>
            <h1 className="font-display text-2xl text-foreground mb-1">
              <span className="text-gold">Nigar</span> Fashion World
            </h1>
            <p className="text-muted-foreground font-body text-sm">আপনার অ্যাকাউন্টে লগইন করুন</p>
          </div>

          {/* Demo badge */}
          <div className="mb-6 p-3 rounded-xl bg-gold/10 border border-gold/30 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-gold shrink-0" />
            <div>
              <p className="text-foreground font-body text-xs font-semibold">Demo Login</p>
              <p className="text-muted-foreground font-body text-xs">demo@nigar.com / 123456</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-body text-sm text-foreground mb-1.5 font-medium">ইমেইল</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 rounded-xl border border-pink-light bg-background px-4 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-pink/50 transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block font-body text-sm text-foreground mb-1.5 font-medium">পাসওয়ার্ড</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 rounded-xl border border-pink-light bg-background px-4 pr-12 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-pink/50 transition-all"
                  placeholder="••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-destructive font-body text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-pink text-primary-foreground font-body font-semibold text-sm tracking-wider uppercase hover:bg-hot-pink transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              লগইন করুন — Login
            </button>
          </form>

          <p className="text-center text-muted-foreground font-body text-xs mt-6">
            অ্যাকাউন্ট নেই?{" "}
            <span className="text-pink font-medium cursor-pointer">রেজিস্ট্রেশন শীঘ্রই আসছে</span>
          </p>
        </div>

        <p className="text-center text-primary-foreground/40 font-body text-xs mt-6">
          © 2026 Nigar Fashion World
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
