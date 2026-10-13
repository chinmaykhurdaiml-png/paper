import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Feather, Heart, Mail, CheckCircle2, ShieldCheck, Truck, RefreshCw, Leaf } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1A221E] text-stone-300 pt-16 pb-12 border-t border-[#2A352F]">
      {/* Guarantees Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-[#2A352F]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#24332B] flex items-center justify-center text-[#7BA68D] flex-shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">FSC Certified Paper</h4>
              <p className="text-xs text-stone-400">100% sustainable forestry</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#24332B] flex items-center justify-center text-[#7BA68D] flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Free Express Shipping</h4>
              <p className="text-xs text-stone-400">On all orders above ₹499</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#24332B] flex items-center justify-center text-[#7BA68D] flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Archival Grade Quality</h4>
              <p className="text-xs text-stone-400">Bleed-proof 120-160 GSM</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#24332B] flex items-center justify-center text-[#7BA68D] flex-shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Hassle-Free Returns</h4>
              <p className="text-xs text-stone-400">14-day exchange promise</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & Story */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group inline-flex">
              <div className="w-9 h-9 rounded-full bg-[#24332B] flex items-center justify-center text-[#7BA68D]">
                <Feather className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                PaperNest
              </span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm mb-6">
              A cozy sanctuary for tactile thinkers, journal keepers, and creators. We curate archival-grade paper, smooth writing instruments, and timeless desk companions.
            </p>
            
            {/* Newsletter */}
            <div className="bg-[#24332B]/60 p-4 rounded-xl border border-[#2F4238] max-w-sm">
              <h5 className="text-xs font-semibold text-stone-200 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#7BA68D]" /> Join The Nest Dispatch
              </h5>
              <p className="text-xs text-stone-400 mb-3">
                Receive weekly journaling prompts, stationery releases, and exclusive member discounts.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome to our inner circle! Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 bg-[#1A221E] border border-[#3A4E43] rounded-lg px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#7BA68D]"
                  />
                  <button
                    type="submit"
                    className="bg-[#2D5A43] hover:bg-[#386D52] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links: Shop */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link to="/shop?category=Pens" className="hover:text-white transition-colors">Fine Pens & Inks</Link>
              </li>
              <li>
                <Link to="/shop?category=Notebooks" className="hover:text-white transition-colors">Hardcover Journals</Link>
              </li>
              <li>
                <Link to="/shop?category=Art%20Supplies" className="hover:text-white transition-colors">Artisan Watercolors</Link>
              </li>
              <li>
                <Link to="/shop?category=Office%20Essentials" className="hover:text-white transition-colors">Desk Objects</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">All Products</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links: About & Guides */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">Our Story & Mission</Link>
              </li>
              <li>
                <Link to="/about#materials" className="hover:text-white transition-colors">Paper Weight Guide</Link>
              </li>
              <li>
                <Link to="/about#pillars" className="hover:text-white transition-colors">Artisan Values</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">View Cart</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links: Customer Care */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li><span className="cursor-pointer hover:text-white transition-colors">Shipping & Delivery</span></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">Order Tracking</span></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">Care Instructions</span></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">Contact Support</span></li>
              <li className="pt-2 text-xs text-stone-500">
                Email: care@papernest.store<br />
                Mon – Fri: 9:30 AM – 6:30 PM IST
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#2A352F] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} PaperNest Ltd. Crafted with reverence for ink and paper.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for stationery lovers across India (₹ INR)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
