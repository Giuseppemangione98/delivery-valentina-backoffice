import React, { useState, useEffect, useCallback } from 'react';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import { Order, OrderStatus } from './types';
import { RESPONSE_TEMPLATES } from './constants';

// IL TUO URL DI GOOGLE APPS SCRIPT
const API_URL = "https://script.google.com/macros/s/AKfycbxUNiIGJckV4Y6edK-hikVPMx8kEgySjT3az-apjwP1uy-VlHZMr_XZ6p_vxPhm9A5j/exec";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [notification, setNotification] = useState<{show: boolean, msg: string}>({show: false, msg: ''});

  // Funzione per scaricare gli ordini dal database reale
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Errore nel caricamento ordini:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    // Opzionale: controlla nuovi ordini ogni 30 secondi
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({show: false, msg: ''});
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const updateOrderStatus = useCallback((id: string, newStatus: OrderStatus) => {
    // Qui aggiorniamo lo stato localmente per velocità
    setOrders(prev => prev.map(o => {
      if (o.id === id) {
        if (newStatus === OrderStatus.COMPLETED) {
          const randomMsg = RESPONSE_TEMPLATES[Math.floor(Math.random() * RESPONSE_TEMPLATES.length)];
          setNotification({show: true, msg: randomMsg});
        }
        return { ...o, status: newStatus };
      }
      return o;
      // Salva status su Google Sheet
fetch('https://script.google.com/macros/s/AKfycbyaI5HUiE6SyV0st1GmlTD7dpPGvMkfNcbwRsYtTyw/exec', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'update_status',
    id: id,
    status: newStatus
  })
}).catch(err => console.error('Errore save status:', err));

    }));
    // Salva lo stato aggiornato anche sul Google Sheet
    fetch('https://script.google.com/macros/s/AKfycbyaI5HUiE6SyV0st1GmlTD7dpPGvMkfNcbwRsYtTyw/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'update_status',
        id,
        status: newStatus,
      }),
    }).catch((error) => {
      console.error('Errore aggiornamento stato su Google Sheet:', error);
    });
  }, []);

  const newOrdersCount = orders.filter(o => o.status === OrderStatus.NEW).length;

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-50 selection:bg-rose-500/30 font-['Plus_Jakarta_Sans'] overflow-x-hidden">
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        newOrdersCount={newOrdersCount}
      />
      
      <main className="flex-1 flex flex-col md:ml-64 pb-24 md:pb-8">
        <Header />
        
        <div className="px-4 py-6 md:p-8 flex-1 w-full max-w-5xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
            </div>
          ) : activeTab === 'dashboard' ? (
            <Dashboard 
              orders={orders} 
              onGoToOrders={() => setActiveTab('orders')} 
            />
          ) : (
            <Orders orders={orders} onUpdateStatus={updateOrderStatus} />
          )}
        </div>

        {notification.show && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-10 duration-500">
            <div className="bg-white text-black px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-zinc-200">
              <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white">❤️</div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 leading-none mb-1">Feedback inviato</span>
                <p className="text-sm font-bold tracking-tight">"{notification.msg}"</p>
              </div>
            </div>
          </div>
        )}

        <footer className="hidden md:block p-8 text-center text-[10px] text-zinc-700 uppercase tracking-[0.3em] font-black">
          Hub Giuseppe
        </footer>
      </main>
    </div>
  );
};

export default App;