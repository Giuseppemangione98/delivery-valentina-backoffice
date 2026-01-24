
import React from 'react';
import { LayoutDashboard, ShoppingBag, BarChart3, LogOut, Heart } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  newOrdersCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout, newOrdersCount }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Ordini', icon: ShoppingBag, badge: newOrdersCount },
    { id: 'stats', label: 'Statistiche', icon: BarChart3 },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-zinc-950/50 backdrop-blur-xl border-r border-white/10 flex flex-col z-50">
      <div className="p-8">
        <div className="flex items-center gap-3 text-rose-500 mb-10">
          <div className="p-2 bg-rose-500/20 rounded-xl">
            <Heart size={24} fill="currentColor" />
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
            Hub Giuseppe
          </span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all duration-300 ${
                activeTab === item.id
                  ? 'bg-rose-600/10 text-rose-500 border border-rose-600/20 shadow-lg shadow-rose-900/10'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge && item.badge > 0 && (
                <span className="bg-rose-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold animate-pulse">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-3 rounded-2xl text-zinc-500 hover:text-rose-400 hover:bg-rose-500/5 transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
