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
  LogOut
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
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-surface border-b md:border-b-0 md:border-r border-white/5 flex flex-col sticky top-0 z-40 h-auto md:h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-glow shadow-primary/20 transition-transform hover:rotate-6">
            <span className="text-white font-black text-xl">A</span>
          </div>
          <span className="font-display font-black text-xl tracking-tight uppercase">Axiom</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-x-auto md:overflow-x-hidden flex md:block scrollbar-hide">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group whitespace-nowrap",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-charcoal-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon size={20} className={cn(isActive ? "text-primary" : "text-charcoal-500 group-hover:text-white")} />
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="ml-auto w-1 h-4 bg-primary rounded-full hidden md:block"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5 hidden md:block">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-charcoal-400 hover:text-rose-400 hover:bg-rose-500/5 rounded-xl transition-all group">
            <LogOut size={20} className="text-charcoal-500 group-hover:text-rose-400" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 glass sticky top-0 z-30 flex items-center justify-between px-8">
           <div className="flex items-center gap-4 flex-1">
              <span className="text-xs font-black text-charcoal-500 uppercase tracking-widest hidden lg:block">System Status:</span>
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                 <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider">Node Operational</span>
              </div>
           </div>

           <div className="flex items-center gap-6">
              <button className="text-charcoal-400 hover:text-white transition-colors relative">
                 <Bell size={20} />
                 <div className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-surface" />
              </button>
              <div className="h-8 w-px bg-white/5" />
              <div className="flex items-center gap-3">
                 <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-black text-charcoal-500 uppercase leading-none mb-1">Authenticated</p>
                    <p className="text-xs font-bold leading-none">Main Controller</p>
                 </div>
                 <div className="w-9 h-9 bg-surface-lighter border border-white/10 rounded-xl overflow-hidden shadow-inner">
                    <img src={`https://avatar.vercel.sh/axiom?size=100`} alt="Avatar" />
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
