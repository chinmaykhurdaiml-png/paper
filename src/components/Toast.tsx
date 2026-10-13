import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, closeToast } = useCart();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />,
  };

  const bgStyles = {
    success: 'bg-[#F2F8F4] border-emerald-200 text-[#193F2D]',
    error: 'bg-rose-50 border-rose-200 text-rose-900',
    info: 'bg-[#FDF9F0] border-amber-200 text-amber-950',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full transition-all duration-300 animate-slide-up shadow-xl rounded-xl border p-4 flex items-center justify-between gap-3 backdrop-blur-md bg-white/95">
      <div className="flex items-center gap-3">
        {icons[toast.type]}
        <p className="text-sm font-medium text-stone-800">{toast.message}</p>
      </div>
      <button
        onClick={closeToast}
        className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
