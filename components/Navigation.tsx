
import React from 'react';
import { LayoutDashboard, ShoppingBag, Heart } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  newOrdersCount: number;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, newOrdersCount }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'orders', label: 'Ordini', icon: ShoppingBag, badge: newOrdersCount },
  ];

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-zinc-950 border-r border-white/5 flex-col z-50">
        <div className="p-8">
          <div className="flex items-center gap-3 text-rose-500 mb-12">
            <div className="p-2.5 bg-rose-500/10 rounded-2xl">
              <Heart size={24} fill="currentColor" />
            </div>
            <span className="font-black text-xl tracking-tight bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
              Hub Giuseppe
            </span>
          </div>

          <nav className="space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                  activeTab === item.id
                    ? 'bg-rose-600/10 text-rose-500 border border-rose-500/20 shadow-lg shadow-rose-900/5'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-4">
                  <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                  <span className="font-bold">{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="bg-rose-600 text-white text-[10px] px-2 py-0.5 rounded-full font-black">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAV */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-zinc-950/90 backdrop-blur-2xl border-t border-white/5 z-50 flex items-center justify-around px-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`relative flex flex-col items-center gap-1.5 transition-all duration-300 ${
              activeTab === item.id ? 'text-rose-500 scale-110' : 'text-zinc-500'
            }`}
          >
            <item.icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            <span className="text-[10px] font-black uppercase tracking-[0.1em]">{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="absolute -top-1 -right-2 bg-rose-600 text-white text-[8px] min-w-[16px] h-4 flex items-center justify-center rounded-full font-bold border-2 border-zinc-950">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    </>
  );
};

export default Navigation;
