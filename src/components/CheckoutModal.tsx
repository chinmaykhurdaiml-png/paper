import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  CheckCircle2, 
  ShoppingBag, 
  CreditCard, 
  Truck, 
  ShieldCheck,
  Smartphone,
  Banknote,
  QrCode,
  Copy,
  Check,
  Lock,
  ExternalLink
} from 'lucide-react';
import qrCodeImg from '../assets/upi-qr.png';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, total, subtotal, discountAmount, discountCode, applyDiscount, removeDiscount, shippingFee, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [upiRefId, setUpiRefId] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [showPromoField, setShowPromoField] = useState(false);

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

  const copyUpiId = () => {
    navigator.clipboard.writeText('ishanrn1@oksbi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    applyDiscount(promoInput);
    setPromoInput('');
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#FAF9F5] px-6 py-4 border-b border-[#EAE6DF] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#EBF3EE] text-[#2D5A43] flex items-center justify-center font-serif font-bold text-sm">
              PN
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                {step === 'form' ? 'Checkout & Payment' : 'Order Confirmed!'}
              </h3>
              <p className="text-xs text-stone-500">
                {step === 'form' ? 'Attach payment before placing order' : 'Thank you for supporting small craft'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handlePlaceOrder} className="p-6 overflow-y-auto space-y-5">
            {/* Cart Preview summary */}
            <div className="bg-[#FAF9F5] rounded-xl p-4 border border-stone-200/80">
              <div className="flex justify-between items-center text-xs text-stone-600 mb-2 font-medium">
                <span>Items in Order ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                <span className="font-bold text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between items-center text-xs text-emerald-700 mb-2">
                  <span className="font-semibold">
                    {discountCode === 'LIZARD' ? '🦎 Promo (Lizard - ₹1 Special)' : `Promo (${discountCode})`}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                    <button
                      type="button"
                      onClick={removeDiscount}
                      className="text-stone-400 hover:text-stone-600 text-[10px] underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
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

              {/* Promo Code Quick Apply in Checkout */}
              {!discountCode ? (
                <div className="mt-2.5 pt-2 border-t border-stone-200/60">
                  {!showPromoField ? (
                    <button
                      type="button"
                      onClick={() => setShowPromoField(true)}
                      className="text-[11px] font-semibold text-[#2D5A43] hover:underline cursor-pointer"
                    >
                      + Have a promo code? (Try Lizard for ₹1)
                    </button>
                  ) : (
                    <div className="flex gap-1.5 mt-1">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Enter promo (e.g. Lizard)"
                        className="flex-1 uppercase text-xs p-1.5 px-2.5 rounded-lg border border-stone-300 bg-white focus:outline-none focus:border-[#2D5A43]"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="bg-stone-800 hover:bg-stone-900 text-white text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            {/* Customer & Delivery Form */}
            <div>
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
                1. Delivery Address
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            </div>

            {/* Payment Method Selector */}
            <div>
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
                2. Payment Method
              </h4>

              <div className="grid grid-cols-3 gap-2.5 mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'border-[#2D5A43] bg-[#EBF3EE] text-[#2D5A43] font-semibold ring-1 ring-[#2D5A43]'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span className="text-[11px]">UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#2D5A43] bg-[#EBF3EE] text-[#2D5A43] font-semibold ring-1 ring-[#2D5A43]'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span className="text-[11px]">Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-[#2D5A43] bg-[#EBF3EE] text-[#2D5A43] font-semibold ring-1 ring-[#2D5A43]'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <Banknote className="w-4 h-4" />
                  <span className="text-[11px]">Pay on Delivery</span>
                </button>
              </div>

              {/* UPI QR Section */}
              {paymentMethod === 'upi' && (
                <div className="bg-[#FAF9F5] border-2 border-[#2D5A43]/25 rounded-2xl p-4 sm:p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-[#EBF3EE] text-[#2D5A43]">
                        <QrCode className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-stone-900">Scan & Pay via UPI QR</h5>
                        <p className="text-[11px] text-stone-500">Google Pay • PhonePe • Paytm • BHIM • Any UPI</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#2D5A43] bg-[#EBF3EE] px-2.5 py-1 rounded-full border border-[#2D5A43]/20">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* QR Image Box */}
                  <div className="flex flex-col items-center justify-center bg-white rounded-xl p-4 border border-stone-200/80 shadow-2xs">
                    <div className="relative group max-w-[240px]">
                      <img
                        src={qrCodeImg}
                        alt="UPI Payment QR Code for Ishan (ishanrn1@oksbi)"
                        className="w-full h-auto rounded-xl shadow-xs border border-stone-100"
                      />
                    </div>

                    <div className="mt-3 text-center space-y-2 w-full max-w-sm">
                      {/* Copyable UPI ID */}
                      <div className="flex items-center justify-between bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-lg text-xs">
                        <span className="text-stone-500 text-[11px]">UPI ID:</span>
                        <span className="font-mono font-bold text-stone-900">ishanrn1@oksbi</span>
                        <button
                          type="button"
                          onClick={copyUpiId}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2D5A43] hover:text-[#234735] bg-[#EBF3EE] hover:bg-[#dfeee3] px-2 py-0.5 rounded transition-colors cursor-pointer"
                        >
                          {copiedUpi ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="text-[11px] text-stone-600 flex items-center justify-center gap-1.5">
                        <span>Verified Merchant Name:</span>
                        <strong className="text-stone-900 font-semibold">Ishan</strong>
                      </div>

                      {/* Direct UPI Intent Link for Mobile Devices */}
                      <div className="pt-1">
                        <a
                          href={`upi://pay?pa=ishanrn1@oksbi&pn=Ishan&am=${total}&cu=INR`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2D5A43] hover:underline"
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                          <span>Tap to pay directly in UPI App</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* UTR / Ref Number Field */}
                  <div className="space-y-1.5 pt-1">
                    <label className="block text-[11px] font-semibold text-stone-700">
                      UPI Reference / UTR Number <span className="text-stone-400 font-normal">(12-digit number from payment confirmation)</span>
                    </label>
                    <input
                      type="text"
                      value={upiRefId}
                      onChange={(e) => setUpiRefId(e.target.value)}
                      placeholder="e.g. 423456789012 (Optional for demo)"
                      maxLength={18}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white font-mono focus:outline-none focus:border-[#2D5A43]"
                    />
                    <p className="text-[10px] text-stone-500">
                      ✓ Scan the QR code above with any UPI app, complete payment, then place order.
                    </p>
                  </div>
                </div>
              )}

              {/* Card Section */}
              {paymentMethod === 'card' && (
                <div className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                    <span>Card Information</span>
                    <span className="flex items-center gap-1 text-[11px] text-stone-400">
                      <Lock className="w-3 h-3 text-emerald-600" /> 256-bit Encrypted
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Card Number (e.g. 4532 •••• •••• 8892)"
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white focus:outline-none focus:border-[#2D5A43]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white focus:outline-none focus:border-[#2D5A43]"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      maxLength={4}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white focus:outline-none focus:border-[#2D5A43]"
                    />
                  </div>
                </div>
              )}

              {/* COD Section */}
              {paymentMethod === 'cod' && (
                <div className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-4 text-xs text-stone-600 flex items-start gap-2.5">
                  <Banknote className="w-5 h-5 text-[#2D5A43] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-stone-800">Cash / UPI on Delivery</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Pay ₹{total.toLocaleString('en-IN')} via cash or QR scan when our delivery executive arrives at your address.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Simulated demo store. Review order & QR payment before placing your order.</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full bg-[#2D5A43] hover:bg-[#234735] text-white py-3.5 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer active:scale-99"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying & Placing Order...</span>
                </div>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {paymentMethod === 'upi' ? 'Confirm Payment & Place Order' : 'Place Order'} • ₹{total.toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Confirmation Step */
          <div className="p-8 text-center overflow-y-auto">
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
                <span className="font-semibold text-stone-800">
                  {paymentMethod === 'upi' ? 'UPI (ishanrn1@oksbi)' : paymentMethod.toUpperCase()}
                </span>
              </div>
              {paymentMethod === 'upi' && upiRefId && (
                <div className="flex items-center justify-between text-stone-600">
                  <span>UPI Reference (UTR):</span>
                  <span className="font-mono text-stone-800 font-semibold">{upiRefId}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleFinish}
              className="bg-[#2D5A43] hover:bg-[#234735] text-white py-2.5 px-6 rounded-xl font-semibold text-sm transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
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
