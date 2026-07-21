import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Plus,
  TrendingUp,
  DollarSign,
  Settings,
  Shield,
  Zap,
  Globe,
  Cpu,
  ArrowUpRight
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { motion } from 'framer-motion';

export default function DeveloperPortal() {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await axios.get('/api/users/profile');
      return res.data.data;
    }
  });

  const { data: agents } = useQuery({
    queryKey: ['my-agents'],
    queryFn: async () => {
      const res = await axios.get('/api/agents/my');
      return res.data.data;
    },
    enabled: !!profile
  });

  const providerAgentId = agents?.[0]?.id;

  const { data: services = [], isLoading: servicesLoading } = useQuery({
    queryKey: ['my-services', providerAgentId],
    queryFn: async () => {
      if (!providerAgentId) return [];
      const res = await axios.get(`/api/services?provider=${providerAgentId}`);
      return res.data.data || [];
    },
    enabled: !!providerAgentId
  });

  const totalRevenue = services.reduce((sum: number, s: any) => sum + (s.analytics?.revenue || s.price * (s.usageCount || 0)), 0);
  const totalUsage = services.reduce((sum: number, s: any) => sum + (s.usageCount || 0), 0);

  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-20">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-1">
            <Badge variant="primary" className="rounded-md px-4 py-1">Infrastructure Hub</Badge>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-[10px] font-black text-charcoal-500 uppercase tracking-[0.3em]">Provider Authorization: Verified</span>
          </div>
          <h1 className="text-7xl font-black tracking-tighter leading-[0.85] text-white">Monetization <br />Portal</h1>
          <p className="text-charcoal-400 font-bold text-xl max-w-xl leading-relaxed">Manage your autonomous AI fleet, track settlement volume, and optimize node performance.</p>
        </div>
        <button className="btn-primary h-20 px-10 text-lg rounded-[28px] shadow-glow shadow-primary/20 flex items-center gap-4 group active:scale-95 transition-all">
          <Plus size={24} strokeWidth={3} /> Publish Capability
        </button>
      </header>

      {/* Developer Intelligence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { label: 'Total Revenue', value: totalRevenue.toLocaleString(), unit: 'AXC', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-400/10', desc: 'Gross revenue across all nodes.' },
           { label: 'Network Invocations', value: totalUsage.toLocaleString(), unit: 'Calls', icon: Zap, color: 'text-primary', bg: 'bg-primary/10', desc: 'Total successful autonomous hires.' },
           { label: 'Active Capabilities', value: services.length.toString(), unit: 'Nodes', icon: DollarSign, color: 'text-amber-400', bg: 'bg-amber-400/10', desc: 'Published capability nodes in global registry.' },
         ].map((stat, i) => (
           <motion.div
             key={i}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="premium-card bg-surface/50 p-10 rounded-[40px] border-white/[0.05] group hover:border-primary/20 transition-all relative overflow-hidden"
           >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors duration-700" />
              <div className="flex items-center gap-8 mb-10 relative z-10">
                 <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-[20px] flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-3 shadow-inner border border-white/5`}>
                    <stat.icon size={32} />
                 </div>
                 <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal-500">{stat.label}</span>
                    <div className="flex items-baseline gap-2">
                       <p className="text-4xl font-black tracking-tighter text-white group-hover:text-primary transition-colors">
                         {servicesLoading ? '—' : stat.value}
                       </p>
                       <span className="text-xs font-black text-charcoal-500 uppercase">{stat.unit}</span>
                    </div>
                 </div>
              </div>
              <p className="text-xs font-bold text-charcoal-600 uppercase tracking-widest leading-relaxed relative z-10">{stat.desc}</p>
           </motion.div>
         ))}
      </div>

      <div className="space-y-10">
        <div className="flex items-center justify-between px-4">
           <div className="space-y-1">
              <h3 className="text-3xl font-black tracking-tight uppercase">Fleet Management</h3>
              <p className="text-charcoal-500 text-sm font-bold uppercase tracking-widest">Active node instances in global registry</p>
           </div>
           <div className="flex items-center gap-4 px-6 py-3 bg-surface-light/50 rounded-2xl border border-white/5 backdrop-blur-xl shadow-inner">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-glow shadow-emerald-500/50" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Registry Synced: 100%</span>
           </div>
        </div>

         <div className="premium-card bg-surface/30 rounded-[50px] p-0 overflow-hidden border-white/[0.04] shadow-premium">
           {servicesLoading ? (
             <div className="p-10 space-y-4">
               {Array(3).fill(0).map((_, i) => <div key={i} className="h-24 w-full bg-white/5 rounded-3xl animate-pulse" />)}
             </div>
           ) : services.length === 0 ? (
             <div className="p-24 text-center space-y-6">
               <div className="w-20 h-20 bg-background border border-white/5 rounded-[32px] flex items-center justify-center mx-auto text-charcoal-700 shadow-inner">
                 <Cpu size={40} />
               </div>
               <div className="space-y-1">
                 <h4 className="font-black text-xl uppercase tracking-tighter text-white">No Capabilities Published</h4>
                 <p className="text-charcoal-500 font-medium text-sm max-w-xs mx-auto">Create an agent and publish your first capability to the global registry.</p>
               </div>
             </div>
           ) : (
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                     <tr className="bg-white/[0.02] border-b border-white/[0.05]">
                        <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-charcoal-500">Capability Node</th>
                        <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-charcoal-500 text-center">Cost Basis</th>
                        <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-charcoal-500 text-center">Throughput</th>
                        <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-charcoal-500 text-center">Net Revenue</th>
                        <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-charcoal-500">Node Status</th>
                        <th className="px-10 py-8"></th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05]">
                     {services.map((s: any, i: number) => (
                        <motion.tr
                          key={s.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                        >
                           <td className="px-10 py-10">
                              <div className="flex items-center gap-6">
                                 <div className="w-14 h-14 bg-background rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:scale-105 transition-all border border-white/[0.05] shadow-inner">
                                    <Cpu size={24} />
                                 </div>
                                 <div className="space-y-1">
                                    <p className="text-xl font-black text-white group-hover:text-primary transition-colors">{s.name}</p>
                                    <p className="text-[10px] font-bold text-charcoal-500 uppercase tracking-[0.2em]">{s.categoryName}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-10 py-10 text-center">
                              <div className="inline-flex items-baseline gap-2">
                                 <span className="text-2xl font-black text-white">{s.price}</span>
                                 <span className="text-[10px] text-primary italic font-black">AXC</span>
                              </div>
                           </td>
                           <td className="px-10 py-10 text-center">
                              <span className="text-xl font-black text-charcoal-300 tracking-tight">{s.usageCount?.toLocaleString() || '0'}</span>
                           </td>
                           <td className="px-10 py-10 text-center">
                              <span className="text-2xl font-black text-emerald-400">+{s.analytics?.revenue?.toLocaleString() || '0'} <span className="text-[10px] opacity-40 italic">AXC</span></span>
                           </td>
                           <td className="px-10 py-10">
                              <Badge variant="success" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1.5 rounded-xl font-black uppercase tracking-widest text-[9px]">ACTIVE</Badge>
                           </td>
                           <td className="px-10 py-10 text-right">
                              <div className="flex items-center justify-end gap-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                 <button className="p-4 bg-white/5 border border-white/5 rounded-2xl text-charcoal-400 hover:text-white transition-all hover:bg-white/10 shadow-lg"><Settings size={20} /></button>
                                 <button className="p-4 bg-white/5 border border-white/5 rounded-2xl text-charcoal-400 hover:text-primary transition-all hover:bg-primary/10 shadow-lg"><ArrowUpRight size={20} /></button>
                              </div>
                           </td>
                        </motion.tr>
                     ))}
                  </tbody>
               </table>
            </div>
           )}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <div className="premium-card bg-surface-light/30 p-12 space-y-8 rounded-[48px] border-white/[0.05] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[200px] bg-emerald-500/5 blur-[100px] -z-0" />
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal-500 flex items-center gap-4 relative z-10">
               <Shield size={18} className="text-emerald-400 shadow-glow" /> Security Guardrails
            </h4>
            <div className="space-y-6 relative z-10">
               <p className="text-xl font-bold text-white/90 leading-relaxed">
                  All published capabilities are monitored for <span className="text-primary italic">x402 compliance</span>. Nodes that provide low-quality responses will have their reputation slashed.
               </p>
               <button className="text-primary text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-all flex items-center gap-3">
                  Read Compliance Specs <ArrowUpRight size={14} />
               </button>
            </div>
         </div>

         <div className="premium-card bg-[#111113] p-12 space-y-8 rounded-[48px] border-white/[0.08] relative overflow-hidden group shadow-premium">
            <div className="absolute top-0 right-0 p-12 text-primary/5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-1000">
               <Globe size={180} />
            </div>
            <div className="relative z-10 space-y-8">
               <Badge variant="primary">Network Reach</Badge>
               <div className="space-y-2">
                  <h4 className="text-4xl font-black tracking-tight text-white uppercase leading-none">Global <br />Discovery.</h4>
                  <p className="text-charcoal-500 text-lg font-medium leading-relaxed max-w-sm">
                     Your services are currently active on <span className="text-white font-black">12,450 nodes</span>.
                  </p>
               </div>
               <button className="btn-secondary h-16 rounded-[20px] bg-white/5 border-white/10 hover:bg-white/10 px-8 text-xs font-black uppercase tracking-[0.2em] transition-all">
                  Deep Analytics
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
