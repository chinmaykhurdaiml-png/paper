import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Feather, 
  Sparkles,
  Heart
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { totalItems, wishlist } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [navSearchQuery, setNavSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(navSearchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Cart', path: '/cart' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#EAE6DF] transition-all">
      {/* Top micro-announcement bar */}
      <div className="bg-[#2D5A43] text-stone-100 text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#F3EBDD]" />
        <span>Free doorstep shipping on orders above ₹499 • Use code <strong className="underline text-[#FAF9F5] font-semibold cursor-pointer">NEST10</strong> for 10% off</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-full bg-[#EBF3EE] border border-[#2D5A43]/20 flex items-center justify-center text-[#2D5A43] group-hover:bg-[#2D5A43] group-hover:text-white transition-all duration-300 shadow-sm">
              <Feather className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1F2421] block leading-none">
                PaperNest
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#5B8266] font-semibold mt-0.5 block">
                Artisanal Stationery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors duration-200 relative py-1 ${
                    isActive
                      ? 'text-[#2D5A43] font-semibold'
                      : 'text-stone-600 hover:text-[#1F2421]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2D5A43] rounded-full animate-fade-in" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Quick Search toggle */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <input
                    type="text"
                    value={navSearchQuery}
                    onChange={(e) => setNavSearchQuery(e.target.value)}
                    placeholder="Search pens, journals..."
                    autoFocus
                    className="w-44 sm:w-64 pl-9 pr-8 py-1.5 text-xs sm:text-sm bg-white border border-[#D5CFBE] rounded-full focus:outline-none focus:ring-2 focus:ring-[#2D5A43]/30 shadow-inner"
                  />
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-2.5 p-0.5 text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-stone-600 hover:text-[#2D5A43] hover:bg-[#EBF3EE] rounded-full transition-colors"
                  aria-label="Search items"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist quick badge */}
            <Link
              to="/shop"
              className="hidden sm:flex items-center p-2 text-stone-600 hover:text-[#2D5A43] hover:bg-[#EBF3EE] rounded-full transition-colors relative"
              title="Saved items"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#D96B43] rounded-full ring-2 ring-[#FAF9F5]"></span>
              )}
            </Link>

            {/* Cart Link with Badge */}
            <Link
              to="/cart"
              className="flex items-center gap-2 py-2 px-3.5 rounded-full bg-[#EBF3EE] hover:bg-[#DCEAE1] text-[#2D5A43] transition-all duration-200 border border-[#2D5A43]/20 shadow-xs group"
              aria-label="View shopping cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-[#2D5A43] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-semibold tracking-wider uppercase">
                Cart
              </span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-[#1F2421] rounded-lg hover:bg-stone-200/50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F5] border-b border-[#EAE6DF] px-6 py-5 shadow-lg animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="relative mb-5">
            <input
              type="text"
              value={navSearchQuery}
              onChange={(e) => setNavSearchQuery(e.target.value)}
              placeholder="Search journals, pens, inks..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#D5CFBE] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A43]/40"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
          </form>

          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-base font-medium flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-[#EBF3EE] text-[#2D5A43] font-semibold'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`
                }
              >
                <span>{link.name}</span>
                {link.name === 'Cart' && totalItems > 0 && (
                  <span className="bg-[#2D5A43] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    {totalItems} items
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="mt-6 pt-5 border-t border-[#EAE6DF] text-xs text-stone-500 flex items-center justify-between">
            <span>🌿 Free shipping on orders over ₹499</span>
            <span>Use code: <strong>NEST10</strong></span>
          </div>
        </div>
      )}
    </header>
  );
};
