import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutGrid,
  Zap,
  Wallet,
  History,
  Settings,
  Search,
  Bell,
  LogOut,
  Cpu
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutGrid },
    { name: 'Marketplace', path: '/marketplace', icon: Search },
    { name: 'Conductor', path: '/conductor', icon: Zap },
    { name: 'Wallet', path: '/wallet', icon: Wallet },
    { name: 'History', path: '/history', icon: History },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex flex-col md:flex-row text-white font-sans">
      <aside className="w-full md:w-64 bg-[#111113] border-b md:border-b-0 md:border-r border-white/5 flex flex-col sticky top-0 z-40 h-auto md:h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-white font-black text-xl">A</span>
          </div>
          <span className="font-bold text-xl tracking-tight uppercase">Axiom</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-x-auto md:overflow-x-hidden flex md:block scrollbar-hide">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                  isActive ? "bg-primary/10 text-primary" : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-[#111113]/50 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30 flex items-center justify-between px-8">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                 <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider">Node Active</span>
              </div>
           </div>

           <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                 <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-black text-white/40 uppercase leading-none mb-1">Controller</p>
                    <p className="text-xs font-bold leading-none">Main Node</p>
                 </div>
                 <div className="w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                    <Cpu size={18} className="text-primary" />
                 </div>
              </div>
           </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
