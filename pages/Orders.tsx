
import React, { useState } from 'react';
import { Search, Heart, X } from 'lucide-react';
import OrderCard from '../components/OrderCard';
import { Order, OrderStatus } from '../types';

interface OrdersProps {
  orders: Order[];
  onUpdateStatus: (id: string, newStatus: OrderStatus) => void;
}

const Orders: React.FC<OrdersProps> = ({ orders, onUpdateStatus }) => {
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders
    .filter(o => {
      if (filter === 'all') return true;
      return o.status === filter;
    })
    .filter(o => 
      o.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.timestamp - a.timestamp);

  const clearSearch = () => setSearchTerm('');

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Search and Filters Header */}
      <div className="sticky top-20 z-30 -mx-4 px-4 md:mx-0 md:px-0 bg-zinc-950/80 backdrop-blur-md pb-4 pt-2">
        <div className="flex flex-col gap-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input
              type="text"
              placeholder="Cerca per ID ordine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900/80 border border-white/10 rounded-2xl py-3.5 pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500/50 transition-all placeholder:text-zinc-600"
            />
            {searchTerm && (
              <button 
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Horizontal Scrollable Filters */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4 py-1">
            {[
              { id: 'all', label: 'Tutti' },
              { id: OrderStatus.NEW, label: 'Nuovi' },
              { id: OrderStatus.COMPLETED, label: 'Evasi' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-5 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all active:scale-95 ${
                  filter === f.id
                    ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-900/20'
                    : 'bg-zinc-900 text-zinc-500 border-white/5 hover:border-white/10'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onUpdateStatus={onUpdateStatus}
            />
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-zinc-900/20 rounded-[32px] border border-dashed border-white/5">
            <div className="w-16 h-16 bg-rose-500/5 rounded-full flex items-center justify-center mb-4">
              <Heart size={32} className="text-zinc-800" />
            </div>
            <h3 className="text-lg font-bold text-zinc-500">Nessun desiderio trovato</h3>
            <p className="text-sm text-zinc-600 px-8">Non ci sono ordini che corrispondono alla tua ricerca.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
