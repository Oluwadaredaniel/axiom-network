import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  History,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronRight,
  Search,
  Filter,
  Zap,
  ArrowRight,
  Database
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ExecutionHistory() {
  const { data: history, isLoading } = useQuery({
    queryKey: ['executions'],
    queryFn: async () => {
      const res = await axios.get('/api/conductor/history');
      return res.data.data;
    },
    staleTime: 1000 * 30,
  });

  return (
    <div className="space-y-12">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="primary">Network Logs</Badge>
            <div className="h-1 w-1 bg-charcoal-600 rounded-full" />
            <span className="text-[10px] font-black text-charcoal-500 uppercase tracking-widest">v1.2.0 Final</span>
          </div>
          <h1 className="text-4xl font-black mb-1">Execution History</h1>
          <p className="text-charcoal-400 font-bold text-sm">Audit trail for every orchestration event across the Axiom node.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
           <div className="relative group w-full sm:w-72">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-500 group-focus-within:text-primary transition-colors" />
              <input type="text" placeholder="Search missions..." className="input-field w-full pl-12 pr-4" />
           </div>
           <button className="btn-secondary">
              <Filter size={18} /> Filters
           </button>
        </div>
      </header>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <h3 className="text-xl font-black flex items-center gap-3">
              <Database size={20} className="text-primary" />
              Node Ledger
           </h3>
           <span className="text-[10px] font-black text-charcoal-500 uppercase tracking-widest">Total Jobs: {history?.length || 0}</span>
        </div>

        <div className="premium-card p-0 overflow-hidden border-white/5">
          {isLoading ? (
            <div className="p-12 space-y-4">
               {Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-2xl" />)}
            </div>
          ) : (history && history.length > 0) ? (
            <div className="divide-y divide-white/5">
               {history.map((job: any, i: number) => (
                 <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-8 flex flex-col md:flex-row md:items-center justify-between hover:bg-white/[0.02] transition-all cursor-pointer group relative"
                 >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />

                    <div className="flex items-start gap-8">
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${job.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 group-hover:bg-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20 group-hover:bg-rose-500/20'}`}>
                          {job.status === 'COMPLETED' ? <CheckCircle2 size={28} /> : <XCircle size={28} />}
                       </div>
                       <div className="space-y-1.5">
                          <h3 className="font-black text-white text-xl tracking-tight group-hover:text-primary transition-colors line-clamp-1 max-w-xl">{job.goal}</h3>
                          <div className="flex flex-wrap items-center gap-4">
                             <div className="flex items-center gap-2">
                                <Clock size={12} className="text-charcoal-500" />
                                <span className="text-[10px] font-black text-charcoal-400 uppercase tracking-widest">{new Date(job.createdAt).toLocaleDateString()}</span>
                             </div>
                             <div className="h-4 w-px bg-white/10" />
                             <div className="flex items-center gap-2">
                                <Zap size={12} className="text-primary" />
                                <span className="text-[10px] font-black text-charcoal-400 uppercase tracking-widest">{job.duration || 1200}ms</span>
                             </div>
                             <div className="h-4 w-px bg-white/10" />
                             <Badge variant="outline" className="px-2 py-0">ID: {job.id.split('-')[0]}</Badge>
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center gap-10 mt-6 md:mt-0">
                       <div className="text-right">
                          <div className="flex items-center gap-2 justify-end mb-1">
                             <span className="text-2xl font-black text-white">{job.totalCost}</span>
                             <span className="text-xs font-bold text-primary italic uppercase font-display">AXC</span>
                          </div>
                          <Badge variant={job.status === 'COMPLETED' ? 'success' : 'error'}>{job.status}</Badge>
                       </div>
                       <div className="w-12 h-12 bg-surface-lighter rounded-xl border border-white/5 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                          <ArrowRight size={20} className="text-charcoal-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>
          ) : (
            <div className="p-40 text-center space-y-8 relative overflow-hidden">
               <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full" />
               <div className="w-20 h-20 bg-surface-light rounded-3xl flex items-center justify-center mx-auto text-charcoal-500 shadow-inner relative z-10 border border-white/5">
                  <History size={40} />
               </div>
               <div className="space-y-2 relative z-10">
                  <h4 className="text-2xl font-black text-white">No mission history found</h4>
                  <p className="text-charcoal-400 font-bold max-w-sm mx-auto">Initialize the Conductor to start your first autonomous orchestration workflow.</p>
               </div>
               <div className="pt-4 relative z-10">
                  <Link to="/conductor" className="btn-primary py-4 px-10 rounded-2xl text-base">
                     Start Orchestrating <Zap size={18} className="ml-2" />
                  </Link>
               </div>
            </div>
          )}
        </div>
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
