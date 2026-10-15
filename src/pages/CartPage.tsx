import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { sampleProducts } from '../data/products';
import { CheckoutModal } from '../components/CheckoutModal';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Tag, 
  Truck, 
  ShieldCheck, 
  Sparkles,
  Check,
  RotateCcw
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    shippingFee,
    freeShippingThreshold,
    discountCode,
    discountAmount,
    applyDiscount,
    removeDiscount,
    total,
    addToCart,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Recommendations that are not currently in cart
  const recommendations = sampleProducts
    .filter((p) => !cart.some((item) => item.product.id === p.id))
    .slice(0, 3);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!inputCoupon.trim()) return;

    const res = applyDiscount(inputCoupon);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setInputCoupon('');
    }
  };

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="min-h-screen bg-[#FAF9F5] py-10 sm:py-16">
      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE6DF] pb-6">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2421]">
              Your Cart
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {cart.length === 0
                ? 'Your basket is currently empty'
                : `${cart.reduce((s, i) => s + i.quantity, 0)} items selected • Saved automatically in your browser`}
            </p>
          </div>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-rose-600 transition-colors font-medium self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Entire Cart</span>
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl border border-[#EAE6DF] p-12 sm:p-16 text-center max-w-lg mx-auto shadow-xs my-8">
            <div className="w-20 h-20 rounded-full bg-[#EBF3EE] text-[#2D5A43] flex items-center justify-center mx-auto mb-5 shadow-inner">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
              Your stationery basket is empty
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mb-8 max-w-sm mx-auto leading-relaxed">
              Looks like you haven't added any notebooks, pens, or desk items yet. Explore our curated shop to find something inspiring.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#2D5A43] hover:bg-[#234735] text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md active:scale-98"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Active Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Free Shipping Progress Card */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#EAE6DF] shadow-xs">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="flex items-center gap-1.5 text-stone-800">
                    <Truck className="w-4 h-4 text-[#2D5A43]" />
                    {subtotal >= freeShippingThreshold ? (
                      <span className="text-emerald-700 font-bold">You qualify for FREE doorstep delivery! 🎉</span>
                    ) : (
                      <span>
                        Add <strong className="text-[#2D5A43]">₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</strong> more to get Free Shipping
                      </span>
                    )}
                  </span>
                  <span className="text-stone-500 text-[11px]">Free above ₹{freeShippingThreshold}</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2D5A43] transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Card */}
              <div className="bg-white rounded-2xl border border-[#EAE6DF] shadow-xs overflow-hidden divide-y divide-[#EAE6DF]">
                {cart.map((item) => {
                  const { product, quantity } = item;
                  return (
                    <div
                      key={product.id}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#FAF9F5]/40 transition-colors"
                    >
                      {/* Product Thumbnail & Details */}
                      <div className="flex items-center gap-4 flex-1">
                        <Link
                          to={`/shop?q=${encodeURIComponent(product.name)}`}
                          className="w-20 h-20 rounded-xl bg-stone-100 overflow-hidden flex-shrink-0 border border-stone-200"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover object-center hover:scale-105 transition-transform"
                          />
                        </Link>

                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-[#5B8266] tracking-wider">
                            {product.category}
                          </span>
                          <h3 className="font-serif text-base font-bold text-stone-900 leading-snug">
                            {product.name}
                          </h3>
                          {product.specs.paperWeight && (
                            <p className="text-[11px] text-stone-500">
                              Weight: {product.specs.paperWeight}
                            </p>
                          )}
                          <p className="text-xs font-semibold text-[#1F2421] sm:hidden">
                            ₹{product.price.toLocaleString('en-IN')} each
                          </p>
                        </div>
                      </div>

                      {/* Quantity & Price Controls */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                        {/* Quantity Modifier */}
                        <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-stone-800">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Item Total Price */}
                        <div className="text-right min-w-[80px]">
                          <p className="text-sm sm:text-base font-bold text-[#1F2421]">
                            ₹{(product.price * quantity).toLocaleString('en-IN')}
                          </p>
                          <p className="text-[10px] text-stone-400 hidden sm:block">
                            ₹{product.price.toLocaleString('en-IN')} each
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="p-2 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Remove item"
                          aria-label={`Remove ${product.name} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Continue Shopping Link */}
              <div className="pt-2 flex justify-between items-center text-xs">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-1.5 text-[#2D5A43] hover:underline font-semibold"
                >
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  <span>Continue Shopping</span>
                </Link>
                <span className="text-stone-400 text-[11px]">
                  All prices in Indian National Rupee (₹)
                </span>
              </div>
            </div>

            {/* Right Column: Order Summary Card */}
            <div className="lg:col-span-4 space-y-5">
              <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 shadow-xs space-y-5">
                <h2 className="font-serif text-xl font-bold text-stone-900 pb-3 border-b border-stone-100">
                  Order Summary
                </h2>

                {/* Subtotal calculation */}
                <div className="space-y-2.5 text-xs text-stone-600">
                  <div className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span className="font-semibold text-stone-900 text-sm">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between items-center text-emerald-700">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" /> Coupon ({discountCode})
                      </span>
                      <span className="font-semibold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-stone-900">
                      {shippingFee === 0 ? (
                        <span className="text-emerald-700 font-bold uppercase tracking-wider text-[11px]">
                          Free
                        </span>
                      ) : (
                        `₹${shippingFee}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-stone-400 text-[11px]">
                    <span>Taxes & GST</span>
                    <span>Included in price</span>
                  </div>
                </div>

                {/* Coupon Code Input */}
                <div className="pt-3 border-t border-stone-100">
                  {discountCode ? (
                    <div className="bg-[#EBF3EE] p-3 rounded-xl flex items-center justify-between text-xs text-[#2D5A43] font-medium border border-[#2D5A43]/20">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Code <strong>{discountCode}</strong> applied</span>
                      </div>
                      <button
                        onClick={removeDiscount}
                        className="text-stone-500 hover:text-stone-800 text-[11px] underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={inputCoupon}
                          onChange={(e) => setInputCoupon(e.target.value)}
                          placeholder="Coupon (e.g. NEST10)"
                          className="flex-1 uppercase text-xs p-2.5 bg-[#FAF9F5] border border-stone-300 rounded-xl focus:outline-none focus:border-[#2D5A43]"
                        />
                        <button
                          type="submit"
                          className="bg-stone-800 hover:bg-stone-900 text-white text-xs px-3.5 py-2 rounded-xl font-semibold transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-[11px] text-rose-600">{couponError}</p>
                      )}
                      <p className="text-[10px] text-stone-400">
                        Tip: Try <strong>Lizard</strong> for ₹1 special cart or <strong>NEST10</strong> for 10% off
                      </p>
                    </form>
                  )}
                </div>

                {/* Grand Total */}
                <div className="pt-4 border-t border-stone-100 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-stone-900 block">Total Amount</span>
                    <span className="text-[10px] text-stone-500">Includes all applicable duties</span>
                  </div>
                  <span className="font-serif text-2xl font-bold text-[#2D5A43]">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Proceed to Checkout Button */}
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full bg-[#2D5A43] hover:bg-[#234735] text-white py-3.5 px-4 rounded-xl font-semibold text-sm transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Proceed to Checkout</span>
                </button>

                <div className="pt-2 text-[11px] text-stone-400 space-y-1.5 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Secure encrypted demo checkout</span>
                  </div>
                  <p>14-day replacement guarantee on defective craft</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* You Might Also Like Add-ons Section */}
        {recommendations.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#EAE6DF]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#5B8266]">
                  Pairs Well With Your Order
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1F2421]">
                  Stationery Add-ons
                </h3>
              </div>
              <Link
                to="/shop"
                className="text-xs font-semibold text-[#2D5A43] hover:underline"
              >
                Browse all
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {recommendations.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-[#EAE6DF] p-4 flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 rounded-xl object-cover border border-stone-200"
                    />
                    <div>
                      <h4 className="font-serif text-xs font-bold text-stone-900 line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#2D5A43] mt-0.5">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(product, 1)}
                    className="p-2 rounded-xl bg-[#EBF3EE] text-[#2D5A43] hover:bg-[#2D5A43] hover:text-white transition-colors"
                    title="Quick add to cart"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
