import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { sampleProducts } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ProductQuickViewModal } from '../components/ProductQuickViewModal';
import { Product, ProductCategory } from '../types';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  RotateCcw,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Selected Category from query or default
  const categoryParam = searchParams.get('category');
  const queryParam = searchParams.get('q');

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(
    (categoryParam as ProductCategory) || 'All'
  );
  const [searchQuery, setSearchQuery] = useState<string>(queryParam || '');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Sync state if URL query params change
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam as ProductCategory);
    } else {
      setSelectedCategory('All');
    }
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [categoryParam, queryParam]);

  const categoriesList: ProductCategory[] = ['All', 'Pens', 'Notebooks', 'Art Supplies', 'Office Essentials'];

  // Filter and Sort logic
  const filteredProducts = useMemo(() => {
    return sampleProducts
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
          return false;
        }

        // Tag filter
        if (selectedTag === 'bestseller' && product.tag !== 'Bestseller') {
          return false;
        }
        if (selectedTag === 'eco' && product.tag !== 'Eco Friendly') {
          return false;
        }
        if (selectedTag === 'staff' && product.tag !== 'Staff Pick') {
          return false;
        }

        // Search Query filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchName = product.name.toLowerCase().includes(query);
          const matchDesc = product.description.toLowerCase().includes(query);
          const matchCat = product.category.toLowerCase().includes(query);
          const matchMat = product.specs.material?.toLowerCase().includes(query);
          if (!matchName && !matchDesc && !matchCat && !matchMat) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          return a.price - b.price;
        }
        if (sortBy === 'price-high') {
          return b.price - a.price;
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        // Default / featured: keep original order
        return 0;
      });
  }, [selectedCategory, searchQuery, sortBy, selectedTag]);

  const handleCategoryChange = (category: ProductCategory) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('featured');
    setSelectedTag('all');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] py-10 sm:py-14">
      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EE] text-[#2D5A43] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Catalog</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2421] mb-3">
            The Stationery Shop
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed">
            Explore our complete collection of archival notebooks, fountain pens, and timeless workspace accessories. All prices include taxes.
          </p>
        </div>

        {/* Filter & Search Bar Toolbar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#EAE6DF] shadow-xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, materials, pens..."
                className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-[#FAF9F5] border border-[#D5CFBE] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A43]/30 focus:border-[#2D5A43] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-stone-400 hover:text-stone-700"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort & Tag Dropdowns */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              {/* Tag quick filter */}
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="text-xs sm:text-sm bg-[#FAF9F5] border border-[#D5CFBE] text-stone-700 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D5A43]/30 cursor-pointer"
              >
                <option value="all">All Highlights</option>
                <option value="bestseller">Bestsellers Only</option>
                <option value="staff">Staff Picks</option>
                <option value="eco">Eco-Friendly</option>
              </select>

              {/* Price & Alphabetical Sort */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#2D5A43]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs sm:text-sm bg-[#FAF9F5] border border-[#D5CFBE] text-stone-700 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D5A43]/30 cursor-pointer font-medium"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Alphabetical (A-Z)</option>
                </select>
              </div>
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="pt-3 border-t border-stone-100 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categoriesList.map((category) => {
              const isSelected = selectedCategory === category;
              const count = category === 'All' 
                ? sampleProducts.length 
                : sampleProducts.filter(p => p.category === category).length;

              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#2D5A43] text-white shadow-xs'
                      : 'bg-[#FAF9F5] text-stone-600 hover:bg-[#EBF3EE] hover:text-[#2D5A43] border border-[#EAE6DF]'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter / Active Filters Summary */}
        <div className="flex items-center justify-between mb-6 text-xs text-stone-500">
          <div>
            Showing <strong className="text-stone-800">{filteredProducts.length}</strong> of{' '}
            {sampleProducts.length} stationery items
            {selectedCategory !== 'All' && <span> in <strong className="text-[#2D5A43]">{selectedCategory}</strong></span>}
            {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
          </div>

          {(selectedCategory !== 'All' || searchQuery || selectedTag !== 'all' || sortBy !== 'featured') && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[#2D5A43] hover:underline font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>

        {/* Product Grid (12-16 items) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="bg-white rounded-3xl border border-[#EAE6DF] p-12 text-center max-w-md mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-[#EBF3EE] text-[#2D5A43] flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
              No matching stationery found
            </h3>
            <p className="text-xs text-stone-500 mb-6 leading-relaxed">
              We couldn't find any items matching your selected criteria. Try adjusting your search keywords or resetting your filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="bg-[#2D5A43] hover:bg-[#234735] text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-all inline-flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
