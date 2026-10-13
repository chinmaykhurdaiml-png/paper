import React from 'react';
import { Link } from 'react-router-dom';
import { CategoryInfo } from '../types';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: CategoryInfo;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`/shop?category=${encodeURIComponent(category.name)}`}
      className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#EAE6DF] hover:border-[#2D5A43]/40 flex flex-col h-72 sm:h-80"
    >
      {/* Background Image with Zoom */}
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/40 to-transparent group-hover:from-stone-950/90 transition-colors" />

      {/* Top pill */}
      <div className="relative z-10 p-5 flex justify-between items-start">
        <span className="bg-white/90 backdrop-blur-xs text-[#2D5A43] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
          {category.itemCount} Curated Items
        </span>
      </div>

      {/* Content at Bottom */}
      <div className="relative z-10 mt-auto p-5 sm:p-6 text-white">
        <h3 className="font-serif text-2xl font-bold mb-1.5 group-hover:text-[#F3EBDD] transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-stone-200/90 line-clamp-2 leading-relaxed mb-3">
          {category.description}
        </p>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 group-hover:translate-x-1 transition-transform">
          <span>Explore Collection</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
};
