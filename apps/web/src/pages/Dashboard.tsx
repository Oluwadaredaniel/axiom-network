import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Wallet,
  Activity,
  Star,
  LayoutGrid,
  Zap,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Info,
  History,
  ShieldCheck,
  Globe,
  Database,
  ArrowRight
} from 'lucide-react';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { Tooltip } from '@/components/ui/Tooltip';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await axios.get('/api/users/profile');
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const agentId = profile?.agents?.[0]?.id || '';
  const { data: wallet, isLoading: walletLoading } = useQuery({
    queryKey: ['wallet', agentId],
    queryFn: async () => {
      if (!agentId) return null;
      const res = await axios.get(`/api/wallet/${agentId}`);
      return res.data.data;
    },
    enabled: !!agentId,
    staleTime: 1000 * 30,
  });

  const stats = [
    {
      label: 'Economic Liquidity',
      value: wallet ? `${wallet.balance.toLocaleString()}` : '0',
      unit: 'AXC',
      icon: Wallet,
      color: 'text-primary',
      bg: 'bg-primary/10',
      tooltip: 'Your current balance available for autonomous hiring.'
    },
    {
      label: 'Neural Trust',
      value: '98',
      unit: 'PCT',
      icon: Star,
      color: 'text-amber-400',
      bg: 'bg-amber-400/10',
      tooltip: 'Verified reliability score within the Axiom network.'
    },
    {
      label: 'Registered Capabilities',
      value: '12',
      unit: 'Nodes',
      icon: LayoutGrid,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
      tooltip: 'Number of AI services you are currently hosting.'
    },
    {
      label: 'Active Missions',
      value: '4',
      unit: 'Live',
      icon: Activity,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      tooltip: 'Current autonomous orchestration loops in progress.'
    },
  ];

  return (
    <div className="space-y-12">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-2">
             <Badge variant="primary" className="rounded-md">v1.2.0 Mainnet</Badge>
             <div className="h-4 w-px bg-white/10" />
             <span className="text-[10px] font-black text-charcoal-500 uppercase tracking-widest">Shard: North-America-1</span>
          </div>
          <h1 className="text-5xl font-black tracking-tight leading-none">System Overview</h1>
          <p className="text-charcoal-400 font-bold text-lg max-w-xl">Monitor real-time economic interactions and node performance.</p>
        </div>
        <div className="flex items-center gap-4">
           <Link to="/wallet" className="btn-secondary h-12 px-6 rounded-xl border-white/5 bg-white/5 hover:bg-white/10">
              Manage Assets
           </Link>
           <Link to="/conductor" className="btn-primary h-12 px-8 rounded-xl shadow-glow shadow-primary/20">
              <Zap size={18} fill="currentColor" /> Initiate Mission
           </Link>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(profileLoading || walletLoading) ? (
          Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-40 rounded-[32px]" />)
        ) : (
          stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="premium-card bg-surface/50 rounded-[32px] p-8 space-y-8 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl -mr-12 -mt-12" />
              <div className="flex items-center justify-between relative z-10">
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6 shadow-inner`}>
                  <stat.icon size={24} />
                </div>
                <Tooltip content={stat.tooltip}>
                  <Info size={14} className="text-charcoal-600 cursor-help hover:text-white transition-colors" />
                </Tooltip>
              </div>
              <div className="space-y-1 relative z-10">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-charcoal-500">{stat.label}</span>
                <div className="flex items-baseline gap-2">
                   <p className="text-4xl font-black tracking-tighter group-hover:text-primary transition-colors">{stat.value}</p>
                   <span className="text-xs font-bold text-charcoal-600 uppercase tracking-widest">{stat.unit}</span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        {/* Economic Ledger */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-black flex items-center gap-3 uppercase tracking-wider">
                 <TrendingUp size={20} className="text-primary" />
                 Live Transaction Stream
              </h3>
              <Link to="/history" className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-2">
                 Audit Ledger <ArrowRight size={14} />
              </Link>
           </div>

           <div className="premium-card bg-surface/30 rounded-[40px] p-0 overflow-hidden border-white/[0.03] min-h-[460px] flex flex-col">
              <div className="bg-white/[0.02] border-b border-white/[0.05] p-6 grid grid-cols-4 text-[10px] font-black uppercase tracking-[0.2em] text-charcoal-500">
                 <span>Transaction ID</span>
                 <span>Recipient Node</span>
                 <span>Amount</span>
                 <span className="text-right">Status</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-6 opacity-40">
                 <div className="w-24 h-24 bg-background border border-white/5 rounded-[32px] flex items-center justify-center text-charcoal-700 shadow-inner">
                    <Database size={48} />
                 </div>
                 <div className="space-y-2">
                    <h4 className="font-black text-xl uppercase tracking-tighter">No Active Stream</h4>
                    <p className="text-charcoal-500 font-medium max-w-xs mx-auto text-sm">Economic activity is encrypted. Complete a mission to begin synchronization.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Global Network Stats */}
        <div className="space-y-8">
           <motion.div
             whileHover={{ scale: 1.01 }}
             className="bg-primary text-white p-10 rounded-[40px] shadow-glow shadow-primary/20 relative overflow-hidden group cursor-pointer border border-primary-light/20"
           >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10 space-y-10">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                    <Globe size={24} />
                 </div>
                 <div className="space-y-4">
                    <h4 className="text-3xl font-black leading-tight tracking-tight uppercase">Monetize <br />Intelligence</h4>
                    <p className="text-blue-100/70 text-sm font-bold leading-relaxed">
                      Publish specialized capabilities to the global registry and earn AXC from autonomous agents worldwide.
                    </p>
                 </div>
                 <Link to="/developer" className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl">
                   Join Infrastructure <Plus size={16} strokeWidth={3} />
                 </Link>
              </div>
           </motion.div>

           <div className="premium-card bg-surface/50 rounded-[40px] p-10 space-y-8 border-white/[0.05]">
              <div className="flex items-center gap-3">
                 <ShieldCheck size={20} className="text-emerald-500" />
                 <span className="text-xs font-black uppercase tracking-[0.2em]">Network Security</span>
              </div>
              <div className="space-y-5">
                 {[
                   { label: 'x402 Protocol', status: 'Enforced', color: 'bg-emerald-500' },
                   { label: 'Ledger Consistency', status: 'Verified', color: 'bg-emerald-500' },
                   { label: 'Registry Consensus', status: 'Active', color: 'bg-primary' },
                 ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center group">
                       <span className="text-xs font-black text-charcoal-400 group-hover:text-white transition-colors">{item.label}</span>
                       <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black text-charcoal-500 uppercase tracking-widest">{item.status}</span>
                          <div className={`w-1.5 h-1.5 ${item.color} rounded-full shadow-glow`} />
                       </div>
                    </div>
                 ))}
              </div>
              <div className="pt-8 border-t border-white/5">
                 <p className="text-[10px] font-bold text-charcoal-600 leading-relaxed uppercase tracking-wider">
                    All autonomous actions are governed by the Axiom Core Protocol v1.2.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
