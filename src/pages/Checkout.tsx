import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  ArrowLeft,
  Truck,
  MapPin,
  Tag,
} from "lucide-react";
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from "@/store/cartSlice";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";

const Checkout = () => {
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shipping = subtotal > 3000 ? 0 : 120;
  const total = subtotal + shipping;

  const [step, setStep] = useState<"info" | "processing" | "success">("info");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    note: "",
  });
  const [coupon, setCoupon] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");
    setTimeout(() => {
      dispatch(clearCart());
      setStep("success");
    }, 2500);
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-2xl shadow-xl border border-border p-10 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="font-display text-2xl text-foreground mb-2">Order Placed Successfully!</h2>
          <p className="text-muted-foreground font-body text-sm mb-1">
            Order #NFW{Date.now().toString().slice(-6)}
          </p>
          <p className="text-muted-foreground font-body text-sm mb-6">
            We'll send you a confirmation email shortly.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to="/profile"
              className="w-full py-3 bg-pink text-primary-foreground font-body font-semibold text-sm rounded-xl hover:bg-hot-pink transition-colors"
            >
              View My Orders
            </Link>
            <Link
              to="/"
              className="w-full py-3 border border-border text-foreground font-body text-sm rounded-xl hover:bg-muted transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0 && step === "info") {
    return (
      <>
        <LandingNavbar />
        <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-20">
          <div className="text-center">
            <ShieldCheck className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
            <h2 className="font-display text-xl text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground font-body text-sm mb-6">
              Add some products before checking out.
            </p>
            <Link
              to="/products"
              className="px-8 py-3 bg-pink text-primary-foreground font-body font-semibold text-sm rounded-xl hover:bg-hot-pink transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <LandingNavbar />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Link to="/" className="text-muted-foreground font-body text-sm hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back to Shop
            </Link>
          </div>

          <h1 className="font-display text-3xl text-foreground mb-8">Checkout</h1>

          {step === "processing" ? (
            <div className="py-24 text-center">
              <div className="w-14 h-14 border-4 border-pink border-t-transparent rounded-full animate-spin mx-auto mb-6" />
              <p className="text-foreground font-display text-xl mb-2">Processing your order...</p>
              <p className="text-muted-foreground font-body text-sm">Please don't close this page</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left — Form */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Contact */}
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h3 className="font-display text-lg text-foreground mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-pink" /> Contact Information
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-body text-sm text-foreground mb-1.5 font-medium">First Name *</label>
                        <input required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                          className="w-full h-11 rounded-xl border border-border bg-background px-4 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-pink/40" />
                      </div>
                      <div>
                        <label className="block font-body text-sm text-foreground mb-1.5 font-medium">Last Name *</label>
                        <input required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                          className="w-full h-11 rounded-xl border border-border bg-background px-4 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-pink/40" />
                      </div>
                      <div>
                        <label className="block font-body text-sm text-foreground mb-1.5 font-medium">Email *</label>
                        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full h-11 rounded-xl border border-border bg-background px-4 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-pink/40" />
                      </div>
                      <div>
                        <label className="block font-body text-sm text-foreground mb-1.5 font-medium">Phone *</label>
                        <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full h-11 rounded-xl border border-border bg-background px-4 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-pink/40" placeholder="01XXXXXXXXX" />
                      </div>
                    </div>
                  </div>

                  {/* Shipping */}
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h3 className="font-display text-lg text-foreground mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-pink" /> Shipping Address
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block font-body text-sm text-foreground mb-1.5 font-medium">Address *</label>
                        <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                          className="w-full h-11 rounded-xl border border-border bg-background px-4 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-pink/40"
                          placeholder="House, Road, Area" />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-body text-sm text-foreground mb-1.5 font-medium">City *</label>
                          <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                            className="w-full h-11 rounded-xl border border-border bg-background px-4 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-pink/40" />
                        </div>
                        <div>
                          <label className="block font-body text-sm text-foreground mb-1.5 font-medium">ZIP Code</label>
                          <input value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })}
                            className="w-full h-11 rounded-xl border border-border bg-background px-4 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-pink/40" />
                        </div>
                      </div>
                      <div>
                        <label className="block font-body text-sm text-foreground mb-1.5 font-medium">Order Note (Optional)</label>
                        <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows={3}
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-pink/40 resize-none"
                          placeholder="Special instructions for delivery..." />
                      </div>
                    </div>
                  </div>

                  {/* Payment method */}
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h3 className="font-display text-lg text-foreground mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-pink" /> Payment Method
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-4 border border-pink rounded-xl bg-pink/5 cursor-pointer">
                        <input type="radio" name="payment" defaultChecked className="accent-pink" />
                        <div>
                          <p className="font-body text-sm font-medium text-foreground">Cash on Delivery</p>
                          <p className="font-body text-xs text-muted-foreground">Pay when you receive your order</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:border-pink/50 transition-colors">
                        <input type="radio" name="payment" className="accent-pink" />
                        <div>
                          <p className="font-body text-sm font-medium text-foreground">bKash / Nagad</p>
                          <p className="font-body text-xs text-muted-foreground">Mobile banking payment</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right — Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-card rounded-2xl border border-border p-6 sticky top-28">
                    <h3 className="font-display text-lg text-foreground mb-4">Order Summary</h3>

                    {/* Items */}
                    <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-body text-sm text-foreground truncate">{item.name}</p>
                            <p className="font-body text-xs text-muted-foreground">{item.brand} × {item.quantity}</p>
                          </div>
                          <span className="font-body text-sm font-medium text-foreground whitespace-nowrap">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Coupon */}
                    <div className="flex gap-2 mb-4">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                          placeholder="Coupon code"
                          className="w-full h-10 rounded-lg border border-border bg-background pl-9 pr-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-pink/40"
                        />
                      </div>
                      <button type="button" className="px-4 h-10 rounded-lg bg-muted text-foreground font-body text-sm font-medium hover:bg-muted-foreground/10 transition-colors">
                        Apply
                      </button>
                    </div>

                    <div className="border-t border-border pt-4 space-y-2">
                      <div className="flex justify-between font-body text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-foreground">৳{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-body text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Truck className="w-4 h-4" /> Shipping
                        </span>
                        <span className="text-foreground">{shipping === 0 ? "Free" : `৳${shipping}`}</span>
                      </div>
                      {shipping === 0 && (
                        <p className="font-body text-xs text-green-600">🎉 Free shipping on orders over ৳3,000</p>
                      )}
                      <div className="flex justify-between font-display text-lg pt-2 border-t border-border">
                        <span>Total</span>
                        <span>৳{total.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-6 py-3.5 bg-pink text-primary-foreground font-body font-semibold text-sm uppercase tracking-wider rounded-xl hover:bg-hot-pink transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Place Order — ৳{total.toLocaleString()}
                    </button>

                    <p className="text-center text-muted-foreground font-body text-xs mt-3 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Secure checkout
                    </p>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>
      <LandingFooter />
    </>
  );
};

export default Checkout;
