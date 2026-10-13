import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  CheckCircle2, 
  ShoppingBag, 
  CreditCard, 
  Truck, 
  Sparkles, 
  ShieldCheck,
  Smartphone,
  Banknote
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, total, subtotal, discountAmount, shippingFee, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');

  const [formData, setFormData] = useState({
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    address: '42, Gulmohar Avenue, Bandra West',
    city: 'Mumbai',
    pincode: '400050',
    state: 'Maharashtra',
  });

  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `PN-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsSubmitting(false);
      setStep('success');
      clearCart();
    }, 1200);
  };

  const handleFinish = () => {
    onClose();
    navigate('/shop');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#FAF9F5] px-6 py-4 border-b border-[#EAE6DF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#EBF3EE] text-[#2D5A43] flex items-center justify-center font-serif font-bold text-sm">
              PN
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                {step === 'form' ? 'Demo Checkout' : 'Order Confirmed!'}
              </h3>
              <p className="text-xs text-stone-500">
                {step === 'form' ? 'Secure simulated transaction' : 'Thank you for supporting small craft'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handlePlaceOrder} className="p-6">
            {/* Cart Preview summary */}
            <div className="bg-[#FAF9F5] rounded-xl p-4 border border-stone-200/80 mb-6">
              <div className="flex justify-between items-center text-xs text-stone-600 mb-2 font-medium">
                <span>Items in Order ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                <span className="font-bold text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between items-center text-xs text-emerald-700 mb-2">
                  <span>Special Discount</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-xs text-stone-600 mb-2">
                <span>Shipping Fee</span>
                <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-sm font-bold text-[#1F2421]">
                <span>Total Payable</span>
                <span className="text-[#2D5A43] text-base">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Customer & Delivery Form */}
            <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
              1. Delivery Address
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#2D5A43]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#2D5A43]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#2D5A43]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#2D5A43]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">PIN Code</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#2D5A43]"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
              2. Payment Method
            </h4>

            <div className="grid grid-cols-3 gap-2.5 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'upi'
                    ? 'border-[#2D5A43] bg-[#EBF3EE] text-[#2D5A43] font-semibold'
                    : 'border-stone-200 text-stone-600 hover:border-stone-300'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span className="text-[11px]">UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'card'
                    ? 'border-[#2D5A43] bg-[#EBF3EE] text-[#2D5A43] font-semibold'
                    : 'border-stone-200 text-stone-600 hover:border-stone-300'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span className="text-[11px]">Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'cod'
                    ? 'border-[#2D5A43] bg-[#EBF3EE] text-[#2D5A43] font-semibold'
                    : 'border-stone-200 text-stone-600 hover:border-stone-300'
                }`}
              >
                <Banknote className="w-4 h-4" />
                <span className="text-[11px]">Pay on Delivery</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-5 bg-stone-50 p-2.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>This is a simulated demo store. No real funds or personal payment cards will be charged.</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full bg-[#2D5A43] hover:bg-[#234735] text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Order...</span>
                </div>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Complete Order • ₹{total.toLocaleString('en-IN')}</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Confirmation Step */
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="inline-block bg-[#EBF3EE] text-[#2D5A43] text-xs font-bold px-3 py-1 rounded-full mb-2">
              Order ID: {orderId}
            </span>

            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
              Order Placed Successfully!
            </h3>

            <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed mb-6">
              Thank you for shopping at PaperNest, <strong>{formData.name}</strong>! We are hand-packing your items with recycled tissue paper and biodegradable twine. A confirmation email has been dispatched to <em>{formData.email}</em>.
            </p>

            <div className="bg-[#FAF9F5] border border-[#EAE6DF] rounded-xl p-4 text-left text-xs mb-6 space-y-2">
              <div className="flex items-center justify-between text-stone-600">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-700" /> Estimated Delivery:
                </span>
                <span className="font-semibold text-stone-800">3 - 4 Business Days</span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span>Shipping Address:</span>
                <span className="font-medium text-stone-800">{formData.city}, {formData.pincode}</span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span>Payment Mode:</span>
                <span className="font-medium uppercase text-stone-800">{paymentMethod}</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="bg-[#2D5A43] hover:bg-[#234735] text-white py-2.5 px-6 rounded-xl font-semibold text-sm transition-all shadow-xs inline-flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
