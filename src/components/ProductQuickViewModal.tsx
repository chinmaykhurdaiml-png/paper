import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { X, Star, ShoppingBag, Heart, Check, Sparkles, ShieldCheck } from 'lucide-react';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
}) => {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const isFavorited = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square bg-[#F7F5F0] overflow-hidden flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.tag && (
              <span className="absolute top-4 left-4 bg-[#2D5A43] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                {product.tag}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#5B8266] uppercase tracking-wider">
                  {product.category}
                </span>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-1.5 rounded-full transition-colors ${
                    isFavorited ? 'text-rose-500 bg-rose-50' : 'text-stone-400 hover:text-rose-500 hover:bg-stone-50'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-2 leading-snug">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-stone-600">
                  {product.rating} ({product.reviewsCount} reviews)
                </span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-bold text-[#1F2421]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Specs pill list */}
              <div className="bg-[#FAF9F5] p-3 rounded-xl border border-stone-200/80 mb-5 space-y-1 text-xs">
                {product.specs.material && (
                  <div className="flex justify-between text-stone-700">
                    <span className="text-stone-500">Material:</span>
                    <span className="font-medium">{product.specs.material}</span>
                  </div>
                )}
                {product.specs.paperWeight && (
                  <div className="flex justify-between text-stone-700">
                    <span className="text-stone-500">Paper Weight:</span>
                    <span className="font-medium text-emerald-700">{product.specs.paperWeight}</span>
                  </div>
                )}
                {product.specs.origin && (
                  <div className="flex justify-between text-stone-700">
                    <span className="text-stone-500">Craft Origin:</span>
                    <span className="font-medium">{product.specs.origin}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-stone-600 hover:text-stone-900 transition-colors font-medium"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-2 text-sm font-semibold text-stone-800 min-w-[24px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-stone-600 hover:text-stone-900 transition-colors font-medium"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all shadow-xs ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#2D5A43] hover:bg-[#234735] text-white active:scale-98'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Cart • ₹{(product.price * quantity).toLocaleString('en-IN')}
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-stone-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Plastic-Free Packaging
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> 100% Genuine Craft
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
