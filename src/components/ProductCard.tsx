import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Eye, Heart, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const isFavorited = wishlist.includes(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleCardClick = () => {
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl border border-[#EAE6DF] hover:border-[#C8DFD2] overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-4/3 sm:aspect-square bg-[#F7F5F0] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.tag && (
            <span className="bg-[#2D5A43] text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-xs">
              {product.tag}
            </span>
          )}
        </div>

        {/* Wishlist Toggle Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 ${
            isFavorited
              ? 'bg-rose-50 text-rose-500 shadow-sm'
              : 'bg-white/80 backdrop-blur-xs text-stone-500 hover:text-rose-500 hover:bg-white'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Quick View Floating Button on Desktop */}
        {onQuickView && (
          <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="pointer-events-auto bg-white/95 hover:bg-white text-stone-800 text-xs font-semibold px-3.5 py-2 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 hover:scale-105"
            >
              <Eye className="w-3.5 h-3.5 text-[#2D5A43]" /> Quick View
            </button>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="font-semibold text-[#5B8266] uppercase tracking-wider text-[11px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-medium text-stone-700">{product.rating}</span>
              <span className="text-stone-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-[#2D5A43] transition-colors line-clamp-1 mb-1.5">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Cart button */}
        <div className="pt-3 border-t border-[#F0ECE1] flex items-center justify-between gap-2 mt-auto">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-[#1F2421]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {product.specs.paperWeight && (
              <span className="text-[10px] text-emerald-700 font-medium">
                {product.specs.paperWeight}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shadow-xs ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#2D5A43] hover:bg-[#234735] text-white active:scale-95'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
