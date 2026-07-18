import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
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
import { Link } from 'react-router-dom';

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
      </header>

      <div className="space-y-6">
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
                             <Badge variant="outline" className="px-2 py-0 uppercase">ID: {job.id.split('-')[0]}</Badge>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-10 mt-6 md:mt-0 text-right">
                       <div>
                          <div className="flex items-center gap-2 justify-end mb-1">
                             <span className="text-2xl font-black text-white">{job.totalCost}</span>
                             <span className="text-xs font-bold text-primary italic uppercase">AXC</span>
                          </div>
                          <Badge variant={job.status === 'COMPLETED' ? 'success' : 'error'}>{job.status}</Badge>
                       </div>
                       <div className="w-12 h-12 bg-surface-lighter rounded-xl border border-white/5 flex items-center justify-center group-hover:border-primary/50">
                          <ArrowRight size={20} className="text-charcoal-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>
          ) : (
            <div className="p-40 text-center space-y-8 relative overflow-hidden">
               <div className="w-20 h-20 bg-surface-light rounded-3xl flex items-center justify-center mx-auto text-charcoal-500 border border-white/5">
                  <Database size={40} />
               </div>
               <div className="space-y-2">
                  <h4 className="text-2xl font-black text-white">No mission history found</h4>
                  <p className="text-charcoal-400 font-bold max-w-sm mx-auto">Initialize the Conductor to start your first autonomous workflow.</p>
               </div>
               <Link to="/conductor" className="btn-primary py-4 px-10 inline-flex">
                  Start Orchestrating <Zap size={18} className="ml-2" />
               </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
