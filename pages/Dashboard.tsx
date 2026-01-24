
import React from 'react';
import { Star, Heart, ArrowRight } from 'lucide-react';
import { Order } from '../types';

interface DashboardProps {
  orders: Order[];
  onGoToOrders: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ orders, onGoToOrders }) => {
  const totalFavors = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingCount = orders.filter(o => o.status !== 'completed').length;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Big Hero Total Favor Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-rose-600 to-pink-700 rounded-[40px] p-8 md:p-12 shadow-2xl shadow-rose-900/20 group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-1000">
          <Heart size={200} fill="white" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-rose-100/80 mb-4 font-black uppercase tracking-[0.2em] text-xs">
            <Star size={14} fill="currentColor" />
            Il Vostro Tesoro
          </div>
          <h3 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-2">
            {totalFavors}
          </h3>
          <p className="text-rose-100 text-lg md:text-xl font-medium">
            Favoretti totali accumulati da Vale ❤️
          </p>
        </div>
      </div>

      {/* Action Card */}
      <button 
        onClick={onGoToOrders}
        className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-[32px] p-6 hover:bg-white/10 transition-all active:scale-[0.98] group"
      >
        <div className="flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-500">
            <Heart size={24} fill={pendingCount > 0 ? "currentColor" : "none"} className={pendingCount > 0 ? "animate-pulse" : ""} />
          </div>
          <div>
            <h4 className="text-xl font-black">
              {pendingCount > 0 ? `${pendingCount} Ordini in attesa` : "Tutti felici!"}
            </h4>
            <p className="text-zinc-500 text-sm">
              {pendingCount > 0 ? "Controlla cosa desidera Valentina" : "Non ci sono nuove richieste per ora"}
            </p>
          </div>
        </div>
        <div className="p-3 rounded-full bg-white/10 group-hover:translate-x-1 transition-transform">
          <ArrowRight size={20} />
        </div>
      </button>

      {/* Quote Section */}
      <div className="py-12 text-center">
        <p className="text-zinc-600 font-medium italic text-lg">
          "L'amore non si conta, ma i favori sì!"
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
