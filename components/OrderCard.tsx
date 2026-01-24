
import React from 'react';
import { Clock, CheckCircle, Package, Heart } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (id: string, newStatus: OrderStatus) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onUpdateStatus }) => {
  const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.NEW:
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case OrderStatus.COMPLETED:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.NEW: return 'Nuovo';
      case OrderStatus.COMPLETED: return 'Completato';
    }
  };

  return (
    <div className={`relative bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-[28px] p-5 transition-all duration-300 ${order.status === OrderStatus.COMPLETED ? 'opacity-60 grayscale-[0.3]' : 'hover:border-rose-500/30'}`}>
      
      <div className="flex justify-between items-center mb-5">
        <span className={`text-[10px] uppercase tracking-widest font-black px-2.5 py-1 rounded-lg border ${getStatusStyle(order.status)}`}>
          {getStatusLabel(order.status)}
        </span>
        <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
          <Clock size={12} className="text-zinc-600" />
          {order.date}
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 mb-1 px-1">
           <Package size={12} className="text-zinc-500" />
           <span className="text-[10px] uppercase font-black text-zinc-500 tracking-widest">Dettagli:</span>
        </div>
        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.emoji}</span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-zinc-200 truncate">{item.name}</p>
                <p className="text-[10px] text-zinc-500 font-medium">Quantità: {item.quantity}</p>
              </div>
            </div>
            <div className="shrink-0">
              <span className="text-[10px] font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/10">
                 {item.price > 0 ? `${item.price * item.quantity} Fav` : 'Gratis'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div>
          <p className="text-[10px] uppercase font-black text-zinc-600 tracking-widest">Totale</p>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-white">{order.total}</span>
            <span className="text-[10px] text-rose-500 font-bold uppercase">Fav</span>
          </div>
        </div>

        <div className="flex gap-2">
          {order.status === OrderStatus.NEW && (
            <button
              onClick={() => onUpdateStatus(order.id, OrderStatus.COMPLETED)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-black py-2.5 px-4 rounded-xl transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
            >
              Completa
              <CheckCircle size={14} />
            </button>
          )}
          {order.status === OrderStatus.COMPLETED && (
            <div className="p-2 bg-emerald-500/20 text-emerald-500 rounded-xl">
              <Heart size={18} fill="currentColor" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
