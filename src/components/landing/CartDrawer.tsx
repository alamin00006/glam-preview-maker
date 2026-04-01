import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotal,
  selectIsCartOpen,
  closeCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/store/cartSlice";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const isOpen = useSelector(selectIsCartOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeCart())}
            className="fixed inset-0 bg-dark/50 z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-pink" />
                <h2 className="font-display text-lg text-foreground">
                  Your Cart <span className="text-muted-foreground font-body text-sm">({items.length})</span>
                </h2>
              </div>
              <button
                onClick={() => dispatch(closeCart())}
                className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-foreground" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground/20 mb-4" />
                  <p className="font-display text-lg text-foreground mb-1">Cart is Empty</p>
                  <p className="font-body text-sm text-muted-foreground mb-4">আপনার কার্ট খালি</p>
                  <button
                    onClick={() => dispatch(closeCart())}
                    className="px-6 py-2.5 bg-pink text-primary-foreground font-body text-xs uppercase tracking-wider rounded-full hover:bg-hot-pink transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="flex gap-3 bg-background rounded-xl p-3 border border-border"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">{item.brand}</p>
                        <h4 className="font-body text-sm text-foreground font-medium leading-tight truncate">{item.name}</h4>
                        {item.color && (
                          <div className="flex items-center gap-1.5 mt-1">
                            <span
                              className="w-4 h-4 rounded-full border border-border inline-block"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="font-body text-[10px] text-muted-foreground">{item.color}</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-0 border border-border rounded-lg overflow-hidden">
                            <button
                              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                              className="w-7 h-7 flex items-center justify-center hover:bg-muted transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 h-7 flex items-center justify-center font-body text-xs font-medium border-x border-border">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                              className="w-7 h-7 flex items-center justify-center hover:bg-muted transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-display text-sm text-foreground">
                              ৳{(item.price * item.quantity).toLocaleString()}
                            </span>
                            <button
                              onClick={() => dispatch(removeFromCart(item.id))}
                              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border px-5 py-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-muted-foreground">Subtotal</span>
                  <span className="font-display text-xl text-foreground">৳{total.toLocaleString()}</span>
                </div>
                <p className="font-body text-[10px] text-muted-foreground">
                  Shipping calculated at checkout
                </p>
                <Link
                  to="/checkout"
                  onClick={() => dispatch(closeCart())}
                  className="block w-full py-3 bg-pink text-primary-foreground font-body font-semibold text-sm uppercase tracking-wider rounded-xl text-center hover:bg-hot-pink transition-colors"
                >
                  Checkout — ৳{total.toLocaleString()}
                </Link>
                <button
                  onClick={() => dispatch(clearCart())}
                  className="w-full py-2 text-muted-foreground font-body text-xs uppercase tracking-wider hover:text-destructive transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
