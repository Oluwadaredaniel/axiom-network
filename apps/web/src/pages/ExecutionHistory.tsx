import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  History,
  CheckCircle2,
  Clock,
  ChevronRight,
  Search,
  Filter,
  Zap,
  ArrowRight,
  Database,
  DatabaseZap,
  Cpu,
  Receipt
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { Link } from 'react-router-dom';

export default function ExecutionHistory() {
  const { data: history, isLoading } = useQuery({
    queryKey: ['executions'],
    queryFn: async () => {
      const res = await axios.get('/api/executions');
      return res.data.data || [];
    },
    staleTime: 1000 * 30,
    retry: false,
  });

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-1">
            <Badge variant="primary" className="rounded-md px-4 py-1">Node Archive</Badge>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-[10px] font-black text-charcoal-500 uppercase tracking-[0.3em]">Status: Ledger Synced</span>
          </div>
          <h1 className="text-7xl font-black tracking-tighter leading-[0.85] text-white uppercase">Mission <br />History</h1>
          <p className="text-charcoal-400 font-bold text-xl max-w-xl leading-relaxed">Full auditable trace for every autonomous orchestration event across your Axiom controller.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
           <div className="relative group w-full sm:w-80">
              <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal-600 group-focus-within:text-primary transition-colors" />
              <input type="text" placeholder="Search mission ledger..." className="input-field w-full pl-14 h-16 text-sm font-bold bg-surface/50 rounded-2xl border-white/[0.05] focus:border-primary/50 shadow-premium" />
           </div>
           <button className="btn-secondary h-16 px-8 rounded-2xl bg-white/5 border-white/[0.05] flex items-center gap-4">
              <Filter size={20} className="text-charcoal-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-400">Filter</span>
           </button>
        </div>
      </header>

      <div className="space-y-8">
        <div className="flex items-center justify-between px-6">
           <h3 className="text-2xl font-black flex items-center gap-4 uppercase tracking-tighter">
              <DatabaseZap size={24} className="text-primary" />
              Transaction Ledger
           </h3>
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-glow shadow-emerald-500/50" />
                 <span className="text-[10px] font-black text-charcoal-500 uppercase tracking-widest">Real-time Sync Active</span>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <span className="text-[10px] font-black text-charcoal-500 uppercase tracking-widest">Total Archived: {history?.length || 0}</span>
           </div>
        </div>

        <div className="premium-card bg-surface/30 rounded-[50px] p-0 overflow-hidden border-white/[0.03] shadow-premium">
          {isLoading ? (
            <div className="p-10 space-y-4">
               {Array(5).fill(0).map((_, i) => <div key={i} className="h-28 w-full bg-white/5 rounded-3xl animate-pulse" />)}
            </div>
          ) : (history && history.length > 0) ? (
            <div className="divide-y divide-white/[0.05]">
               {history.map((job: any, i: number) => (
                 <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-10 flex flex-col md:flex-row md:items-center justify-between hover:bg-white/[0.02] transition-all cursor-pointer group relative"
                 >
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top shadow-glow shadow-primary/50" />

                    <div className="flex items-start gap-10">
                       <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center border transition-all shadow-inner ${job.status === 'COMPLETED' ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20 group-hover:bg-emerald-500/10' : 'bg-rose-500/5 text-rose-400 border-rose-500/20 group-hover:bg-rose-500/10'}`}>
                          {job.status === 'COMPLETED' ? <CheckCircle2 size={32} strokeWidth={2.5} /> : <Zap size={32} strokeWidth={2.5} />}
                       </div>
                       <div className="space-y-3">
                          <h3 className="font-black text-white text-2xl tracking-tight group-hover:text-primary transition-colors line-clamp-1 max-w-2xl uppercase leading-none">{job.goal}</h3>
                          <div className="flex flex-wrap items-center gap-6">
                             <div className="flex items-center gap-3">
                                <Clock size={16} className="text-charcoal-600" />
                                <span className="text-[11px] font-black text-charcoal-500 uppercase tracking-widest">{new Date(job.createdAt).toLocaleString()}</span>
                             </div>
                             <div className="h-1 w-1 bg-charcoal-800 rounded-full" />
                             <div className="flex items-center gap-3">
                                <Cpu size={16} className="text-primary/60" />
                                <span className="text-[11px] font-black text-charcoal-500 uppercase tracking-widest">{job.duration || 1200}ms process time</span>
                             </div>
                             <div className="h-1 w-1 bg-charcoal-800 rounded-full" />
                             <Badge variant="outline" className="px-3 py-1 rounded-lg border-white/5 bg-white/5 font-mono text-[10px] uppercase tracking-tighter">NODE_TX_{job.id.split('-')[0]}</Badge>
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center gap-12 mt-8 md:mt-0">
                       <div className="text-right space-y-1.5">
                          <div className="flex items-baseline gap-2 justify-end">
                             <span className="text-3xl font-black text-white group-hover:text-primary transition-colors">{job.totalCost}</span>
                             <span className="text-xs font-bold text-primary italic uppercase font-display">AXC</span>
                          </div>
                          <div className="flex items-center justify-end gap-3">
                             <span className="text-[9px] font-black text-charcoal-600 uppercase tracking-[0.2em]">{job.status}</span>
                             <div className={`w-1.5 h-1.5 rounded-full ${job.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-rose-500'} shadow-glow`} />
                          </div>
                       </div>
                       <div className="w-14 h-14 bg-surface-lighter rounded-2xl border border-white/5 flex items-center justify-center transition-all group-hover:border-primary/50 group-hover:bg-primary/5">
                          <ArrowRight size={24} className="text-charcoal-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>
          ) : (
            <div className="p-40 text-center space-y-10 relative overflow-hidden">
               <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full" />
               <div className="w-28 h-28 bg-background border border-white/[0.05] rounded-[40px] flex items-center justify-center mx-auto text-charcoal-700 shadow-inner relative z-10 transition-transform hover:rotate-12">
                  <DatabaseZap size={56} />
               </div>
               <div className="space-y-3 relative z-10">
                  <h4 className="text-4xl font-black text-white tracking-tight uppercase">Archive Empty</h4>
                  <p className="text-charcoal-500 font-bold text-lg max-w-sm mx-auto leading-relaxed italic">The ledger has no recorded activity. Initialize a mission via the Conductor to begin synchronization.</p>
               </div>
               <div className="pt-6 relative z-10">
                  <Link to="/conductor" className="btn-primary py-5 px-12 rounded-[28px] text-lg font-black uppercase tracking-widest shadow-glow shadow-primary/20">
                     Start Orchestrating <Zap size={22} className="ml-3" fill="currentColor" />
                  </Link>
               </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#111113] p-12 rounded-[60px] border border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden group shadow-premium">
         <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 blur-[120px] -mr-40 -mt-40 transition-opacity group-hover:opacity-100 opacity-50" />
         <div className="flex items-center gap-10 relative z-10">
            <div className="w-20 h-20 bg-white/5 rounded-[32px] flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform shadow-inner">
               <Receipt size={40} className="text-primary" />
            </div>
            <div className="space-y-2">
               <h4 className="text-3xl font-black text-white uppercase tracking-tight">Audit Ready.</h4>
               <p className="text-charcoal-500 text-lg font-medium max-w-lg leading-relaxed">
                  Every mission step generates a cryptographically hashed x402 receipt, ensuring total economic transparency.
               </p>
            </div>
         </div>
         <button className="btn-secondary bg-white text-black hover:bg-white/90 px-12 py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.3em] relative z-10 shadow-glow shadow-white/10 transition-all active:scale-95">
            Download Global Logs
         </button>
      </div>
    </div>
  );
}

function XCircle({ size, className }: { size?: number, className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}
