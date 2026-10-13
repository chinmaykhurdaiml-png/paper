import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories, sampleProducts } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CategoryCard } from '../components/CategoryCard';
import { ProductQuickViewModal } from '../components/ProductQuickViewModal';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  Feather, 
  BookOpen, 
  Award, 
  Copy, 
  Check,
  Star,
  ShieldCheck
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const { showToast } = useCart();

  // Pick top bestselling products
  const bestSellers = sampleProducts.filter(p => p.tag === 'Bestseller' || p.rating >= 4.9).slice(0, 4);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('NEST10');
    setCopiedCode(true);
    showToast('Coupon code "NEST10" copied to clipboard!', 'success');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="min-h-screen">
      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-[#EAE6DF] bg-gradient-to-b from-[#F7F5F0] via-[#FAF9F5] to-[#FAF9F5]">
        {/* Subtle decorative circles */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#EBF3EE]/60 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3EE] border border-[#2D5A43]/20 text-[#2D5A43] text-xs font-semibold uppercase tracking-wider shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#5B8266]" />
                <span>The Tactile Stationery Movement</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1F2421] leading-[1.15]">
                Where quiet thoughts find their home on{' '}
                <span className="italic font-normal text-[#2D5A43] underline decoration-[#C8DFD2] decoration-2 underline-offset-6">
                  paper.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Curated Belgian linen notebooks, precision brass pens, and cold-pressed artist supplies designed to slow down time and awaken creative focus.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2D5A43] hover:bg-[#234735] text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-md active:scale-98"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/about"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-50 text-stone-800 border border-[#D5CFBE] px-6 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-2xs"
                >
                  <BookOpen className="w-4 h-4 text-[#2D5A43]" />
                  <span>The PaperNest Story</span>
                </Link>
              </div>

              {/* Mini trust checklist */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-stone-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> 160 GSM Bleed-Proof
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> FSC Certified Sustainable
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> Plastic-Free Packaging
                </span>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100 aspect-4/5">
                  <img
                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80"
                    alt="PaperNest handcrafted journal and pen collection"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                  
                  {/* Bottom caption in image */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-[10px] tracking-widest uppercase font-bold text-emerald-300">
                      Hand-bound in Jaipur
                    </span>
                    <h3 className="font-serif text-lg font-bold">The Belgian Linen Hardcover</h3>
                    <p className="text-xs text-stone-200">160 GSM bamboo paper • Lay-flat binding</p>
                  </div>
                </div>

                {/* Floating highlight badge 1 */}
                <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-lg border border-[#EAE6DF] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF3EE] text-[#2D5A43] flex items-center justify-center">
                    <Feather className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-900">Zero Ghosting</p>
                    <p className="text-[11px] text-stone-500">Tested with fountain inks</p>
                  </div>
                </div>

                {/* Floating highlight badge 2 */}
                <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-lg border border-[#EAE6DF] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FDF9F0] text-amber-600 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="text-xs font-bold text-stone-900">4.9 / 5 Rating</span>
                    </div>
                    <p className="text-[11px] text-stone-500">From 1,200+ writers</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#5B8266] mb-1.5">
              <span>Curated Departments</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2421]">
              Explore by Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#2D5A43] hover:text-[#18392B] group"
          >
            <span>View all products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Best-Selling Products Section */}
      <section className="py-16 bg-[#F5F3EC]/60 border-y border-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#5B8266] mb-1.5">
                <span>Beloved by Journalers</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2421]">
                Best-Selling Products
              </h2>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#2D5A43] hover:text-[#18392B] group"
            >
              <span>See full catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setSelectedProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#24332B] via-[#2D5A43] to-[#1E3B2C] text-white p-8 sm:p-12 lg:p-16 shadow-xl">
          {/* Subtle textured overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent)] pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block bg-[#EBF3EE]/20 backdrop-blur-xs text-[#FAF9F5] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-white/20">
              Limited Seasonal Offer
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Bring mindfulness to your daily desk rituals.
            </h3>

            <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-xl">
              Enjoy <strong>10% off</strong> all writing tools and journals this month. Plus, complimentary handwritten wax-sealed notes on orders exceeding ₹999.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              {/* Copy Coupon Badge */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/25 rounded-xl px-4 py-2.5">
                <span className="text-xs text-stone-300">Code:</span>
                <span className="font-mono font-bold text-white tracking-widest text-base">NEST10</span>
                <button
                  onClick={handleCopyCode}
                  className="ml-2 p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
                  title="Copy coupon code"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <Link
                to="/shop"
                className="bg-[#FAF9F5] hover:bg-white text-[#2D5A43] font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-md active:scale-98"
              >
                Apply & Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tactile Values / Pillars Spotlight */}
      <section className="py-16 bg-[#FAF9F5] border-t border-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2421] mb-3">
              The PaperNest Promise
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              We reject cheap plastic disposables in favor of heirloom stationery you will cherish decades from now.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-7 rounded-2xl border border-[#EAE6DF] shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#EBF3EE] text-[#2D5A43] flex items-center justify-center mb-5">
                <Feather className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                Pure Archival Quality
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                From 160 GSM bamboo paper that absorbs wet inks without feathering to untreated brass pens that patina with your touch.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-[#EAE6DF] shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#EBF3EE] text-[#2D5A43] flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                Sustainable Forestry & Cotton
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                100% FSC-certified renewable pulps and upcycled textile cotton rags. Completely plastic-free packaging from factory to your desk.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-[#EAE6DF] shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#EBF3EE] text-[#2D5A43] flex items-center justify-center mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                Honest Artisan Craft
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Working directly with master bookbinders in Jaipur, glass blowers, and traditional ceramicists. No inflated markups.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
