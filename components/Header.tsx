
import React, { useState, useEffect } from 'react';
import { Calendar, Heart } from 'lucide-react';

const Header: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <header className="h-24 border-b border-white/5 px-4 md:px-8 flex items-center justify-between sticky top-0 bg-zinc-950/80 backdrop-blur-md z-40">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white/5 rounded-2xl text-rose-500 border border-white/5 shadow-inner">
          <Heart size={24} fill="currentColor" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-2">
            Ehi, Giuseppe <span className="animate-bounce origin-bottom inline-block">👋</span>
          </h1>
          <p className="text-zinc-500 text-[10px] md:text-xs flex items-center gap-1.5 uppercase tracking-widest font-black">
            <Calendar size={14} className="text-rose-500" />
            <span className="text-rose-500">{formatTime(currentTime)}</span>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
