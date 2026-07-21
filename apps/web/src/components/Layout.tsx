import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid,
  Zap,
  Wallet,
  History,
  Search,
  Bell,
  LogOut,
  Cpu,
  ChevronRight,
  Menu,
  X,
  Plus
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { name: 'Terminal', path: '/dashboard', icon: LayoutGrid },
    { name: 'Registry', path: '/marketplace', icon: Search },
    { name: 'Conductor', path: '/conductor', icon: Zap },
    { name: 'Economic Hub', path: '/wallet', icon: Wallet },
    { name: 'Node Logs', path: '/history', icon: History },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex flex-col md:flex-row text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex w-72 bg-[#111113]/50 backdrop-blur-2xl border-r border-white/[0.05] flex-col sticky top-0 h-screen z-50">
        <div className="p-8 flex items-center gap-4">
          <div className="w-11 h-11 bg-primary rounded-[14px] flex items-center justify-center shadow-glow shadow-primary/20 transition-all hover:rotate-6">
            <span className="text-white font-black text-2xl">A</span>
          </div>
          <div className="flex flex-col">
             <span className="font-display font-black text-xl tracking-tight uppercase leading-none">Axiom</span>
             <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mt-1">Production Node</span>
          </div>
        </div>

        <div className="px-6 py-4">
           <button
             onClick={() => navigate('/conductor')}
             className="w-full bg-white text-black h-12 rounded-2xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-glow shadow-white/5"
           >
             <Plus size={16} strokeWidth={3} /> New Execution
           </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-4 px-5 py-4 rounded-[20px] text-[11px] font-black uppercase tracking-widest transition-all group relative",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-charcoal-400 hover:text-white hover:bg-white/[0.03]"
                )}
              >
                <item.icon size={18} className={cn(isActive ? "text-primary" : "text-charcoal-500 group-hover:text-white transition-colors")} />
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute right-2 w-1.5 h-6 bg-primary rounded-full shadow-glow shadow-primary/50"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/[0.05]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-5 py-4 text-[11px] font-black uppercase tracking-widest text-charcoal-500 hover:text-rose-400 hover:bg-rose-500/5 rounded-[20px] transition-all group"
          >
            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
            De-authenticate
          </button>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="md:hidden flex items-center justify-between p-6 bg-[#111113] border-b border-white/[0.05]">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
               <span className="text-white font-black text-lg">A</span>
            </div>
            <span className="font-display font-black text-lg tracking-tight uppercase">Axiom</span>
         </div>
         <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
         </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 right-0 bg-[#111113] border-b border-white/[0.05] z-40 p-6 flex flex-col gap-4 shadow-2xl"
          >
             {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-xl font-bold text-sm bg-white/5"
                >
                   <item.icon size={18} /> {item.name}
                </Link>
             ))}
             <button onClick={handleLogout} className="flex items-center gap-4 p-4 rounded-xl font-bold text-sm bg-rose-500/10 text-rose-400">
                <LogOut size={18} /> Logout
             </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-[300px] bg-primary/5 blur-[100px] -z-10" />

        <header className="h-20 bg-background/30 backdrop-blur-xl border-b border-white/[0.03] sticky top-0 z-30 flex items-center justify-between px-10">
           <div className="flex items-center gap-6 flex-1">
              <div className="hidden lg:flex items-center gap-3">
                 <div className="flex items-center gap-2.5 px-4 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-glow shadow-emerald-500/50" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Network Synchronized</span>
                 </div>
                 <div className="h-4 w-px bg-white/10" />
                 <span className="text-[10px] font-black text-charcoal-500 uppercase tracking-widest">Latency: 22ms</span>
              </div>
           </div>

           <div className="flex items-center gap-8">
              <button className="text-charcoal-400 hover:text-white transition-colors relative group">
                 <Bell size={20} />
                 <div className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-background group-hover:scale-110 transition-transform" />
              </button>

              <div className="flex items-center gap-5 pl-8 border-l border-white/5">
                 <div className="text-right hidden sm:block">
                    <p className="text-[9px] font-black text-charcoal-500 uppercase leading-none mb-1">Authenticated</p>
                    <p className="text-xs font-bold leading-none tracking-tight">Main Controller</p>
                 </div>
                 <div className="w-11 h-11 bg-surface-light p-0.5 rounded-[14px] border border-white/10 shadow-inner relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img
                      src={`https://api.dicebear.com/7.x/shapes/svg?seed=axiom&backgroundColor=111113`}
                      alt="Avatar"
                      className="rounded-[12px]"
                    />
                 </div>
              </div>
           </div>
        </header>

        <main className="flex-1 p-10 overflow-y-auto scrollbar-hide">
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.4 }}
           >
             {children}
           </motion.div>
        </main>
      </div>
    </div>
  );
}
