import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet as WalletIcon,
  ArrowUpCircle,
  ArrowDownCircle,
  Clock,
  Receipt,
  CreditCard,
  ChevronRight,
  Plus,
  ShieldCheck,
  Zap,
  Loader2,
  TrendingUp,
  Database,
  Search,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

interface Transaction {
  id: string;
  amount: number;
  type: 'SERVICE_PAYMENT' | 'TOP_UP' | 'REFUND';
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  createdAt: string;
  senderWalletId: string;
}

export default function Wallet() {
  const queryClient = useQueryClient();
  const [topupAmount, setTopupAmount] = useState('1000');

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await axios.get('/api/users/profile');
      return res.data.data;
    }
  });

  const agentId = profile?.agents?.[0]?.id || '';

  const { data: wallet, isLoading: walletLoading } = useQuery({
    queryKey: ['wallet', agentId],
    queryFn: async () => {
      if (!agentId) return null;
      const res = await axios.get(`/api/wallet/${agentId}`);
      return res.data.data;
    },
    enabled: !!agentId
  });

  const transactions: Transaction[] = [
    { id: 'tx_8291_ax', amount: 5.5, type: 'SERVICE_PAYMENT', status: 'SUCCESS', createdAt: new Date().toISOString(), senderWalletId: 'w1' },
    { id: 'tx_8290_ax', amount: 1000, type: 'TOP_UP', status: 'SUCCESS', createdAt: new Date(Date.now() - 86400000).toISOString(), senderWalletId: 'w1' },
  ];

  const topupMutation = useMutation({
    mutationFn: async (amount: number) => {
      return axios.post('/api/wallet/topup', { agentId, amount });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
    }
  });

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-1">
             <Badge variant="primary" className="rounded-md">Economic Hub</Badge>
             <div className="h-4 w-px bg-white/10" />
             <span className="text-[10px] font-black text-charcoal-500 uppercase tracking-widest">Node ID: {agentId.split('-')[0] || 'Uninitialized'}</span>
          </div>
          <h1 className="text-6xl font-black tracking-tighter leading-none">Capital <br />Management</h1>
          <p className="text-charcoal-400 font-bold text-lg max-w-xl leading-relaxed">Secure your autonomous node's liquidity and audit the decentralized ledger.</p>
        </div>
        <div className="flex items-center gap-4">
           <button className="btn-secondary h-12 px-6 rounded-xl border-white/5 bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest">
              Export CSV
           </button>
           <button className="btn-primary h-12 px-8 rounded-xl shadow-glow shadow-primary/20 text-[10px] font-black uppercase tracking-widest">
              Wallet Settings
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-12">
          {/* Main Balance Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface/50 p-12 rounded-[60px] border border-white/[0.05] relative overflow-hidden group shadow-premium"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] -mr-64 -mt-64 transition-transform duration-1000 group-hover:scale-125" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-cyan/5 blur-[120px] -ml-40 -mb-40" />

            <div className="relative z-10 space-y-12">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-background rounded-2xl flex items-center justify-center border border-white/[0.05] shadow-inner">
                       <WalletIcon size={28} className="text-primary" />
                    </div>
                    <div className="space-y-1">
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-charcoal-500">Available Liquidity</span>
                       <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-glow shadow-emerald-500/50" />
                          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">On-Ledger verified</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex items-baseline gap-6">
                {walletLoading ? (
                  <Skeleton className="h-24 w-64 rounded-3xl" />
                ) : (
                  <h2 className="text-9xl font-black tracking-tighter text-white">
                    {wallet?.balance.toLocaleString() || '0'}
                    <span className="text-4xl text-primary italic ml-6 tracking-normal font-display align-middle uppercase opacity-80">AXC</span>
                  </h2>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <button className="bg-white text-black h-16 px-10 rounded-[24px] font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-glow shadow-white/10">
                  <ArrowUpCircle size={20} strokeWidth={3} /> Withdraw AXC
                </button>
                <div className="h-12 w-px bg-white/10 hidden sm:block" />
                <button className="text-charcoal-400 hover:text-white font-black text-[11px] uppercase tracking-[0.2em] transition-colors flex items-center gap-3 px-6 py-3 border border-white/[0.05] rounded-2xl hover:bg-white/5">
                   <Receipt size={18} /> View All Receipts
                </button>
              </div>
            </div>
          </motion.div>

          {/* Activity Ledger */}
          <div className="space-y-8">
            <div className="flex items-center justify-between px-4">
               <h3 className="text-2xl font-black flex items-center gap-4 uppercase tracking-tighter">
                  <Database size={24} className="text-primary" />
                  Recent Ledger Activity
               </h3>
               <div className="flex items-center gap-4">
                  <div className="relative">
                     <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-600" />
                     <input type="text" placeholder="Search TXID..." className="bg-surface border border-white/5 rounded-xl pl-9 pr-3 py-2 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-primary/50 w-48" />
                  </div>
               </div>
            </div>

            <div className="premium-card bg-surface/30 rounded-[48px] p-0 overflow-hidden border-white/[0.03]">
               <div className="divide-y divide-white/[0.05]">
                  {transactions.map((tx, i) => (
                    <motion.div
                      key={tx.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-8 flex items-center justify-between hover:bg-white/[0.02] transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-8">
                         <div className={cn(
                           "w-16 h-16 rounded-[24px] flex items-center justify-center transition-all group-hover:scale-110 shadow-inner border border-white/[0.03]",
                           tx.type === 'TOP_UP' ? "bg-emerald-500/10 text-emerald-400" : "bg-primary/10 text-primary"
                         )}>
                            {tx.type === 'TOP_UP' ? <ArrowDownCircle size={32} /> : <Zap size={32} />}
                         </div>
                         <div className="space-y-1.5">
                            <p className="font-black text-white text-lg uppercase tracking-tight">
                               {tx.type === 'SERVICE_PAYMENT' ? 'Autonomous Capability Hire' : 'Capital Liquidity Injection'}
                            </p>
                            <div className="flex items-center gap-4">
                               <span className="text-[10px] font-bold text-charcoal-500 uppercase tracking-widest">{new Date(tx.createdAt).toLocaleString()}</span>
                               <div className="h-1 w-1 bg-charcoal-800 rounded-full" />
                               <span className="text-[10px] font-mono text-primary font-bold">ID: {tx.id}</span>
                            </div>
                         </div>
                      </div>
                      <div className="flex items-center gap-10 text-right">
                         <div className="space-y-1.5">
                            <p className={cn(
                              "text-2xl font-black",
                              tx.type === 'TOP_UP' ? "text-emerald-400" : "text-white"
                            )}>
                               {tx.type === 'TOP_UP' ? '+' : '-'}{tx.amount.toLocaleString()} <span className="text-xs italic opacity-50 font-display">AXC</span>
                            </p>
                            <div className="flex items-center justify-end gap-2">
                               <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                               <span className="text-[9px] font-black text-charcoal-500 uppercase tracking-[0.2em]">Settled</span>
                            </div>
                         </div>
                         <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                            <ChevronRight size={24} className="text-charcoal-700 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                         </div>
                      </div>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Financial Tools */}
        <div className="space-y-10">
          <div className="premium-card bg-surface/50 rounded-[50px] p-12 space-y-10 border-white/[0.05]">
            <div className="space-y-2">
               <h3 className="text-2xl font-black tracking-tight uppercase">Quick Refill</h3>
               <p className="text-charcoal-500 text-sm font-bold">Inject liquidity into your agent identity instantly.</p>
            </div>

            <div className="space-y-8">
               <div className="grid grid-cols-3 gap-4">
                  {['100', '1000', '5000'].map(amt => (
                    <button
                      key={amt}
                      onClick={() => setTopupAmount(amt)}
                      className={cn(
                        "py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border",
                        topupAmount === amt
                          ? "bg-white text-black border-white shadow-glow shadow-white/10"
                          : "bg-white/5 text-charcoal-500 border-white/10 hover:border-white/20 hover:text-white"
                      )}
                    >
                      {amt}
                    </button>
                  ))}
               </div>

               <div className="relative group">
                  <div className="absolute -inset-1 bg-primary/20 blur-lg rounded-[28px] opacity-0 group-focus-within:opacity-100 transition-opacity" />
                  <input
                    type="number"
                    value={topupAmount}
                    onChange={(e) => setTopupAmount(e.target.value)}
                    className="w-full h-20 bg-background border-2 border-white/[0.05] rounded-[24px] px-8 text-3xl font-black focus:outline-none focus:border-primary/50 transition-all text-white placeholder:text-charcoal-800 relative z-10"
                    placeholder="0.00"
                  />
                  <span className="absolute right-8 top-1/2 -translate-y-1/2 text-lg font-black text-primary italic font-display relative z-10">AXC</span>
               </div>

               <button
                onClick={() => topupMutation.mutate(parseInt(topupAmount))}
                disabled={topupMutation.isPending}
                className="btn-primary w-full h-20 text-lg rounded-[24px] shadow-glow shadow-primary/30"
              >
                {topupMutation.isPending ? <Loader2 size={32} className="animate-spin" /> : <>Refill Hub Wallet <Plus size={24} strokeWidth={3} /></>}
              </button>
            </div>

            <div className="pt-10 border-t border-white/5 space-y-6">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                     <ShieldCheck size={20} className="text-emerald-400" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-charcoal-400 leading-tight">Secure <br />Settlement</span>
               </div>
               <p className="text-xs text-charcoal-600 font-bold leading-relaxed italic">
                  Refills are settled on the Axiom Core L2. AXC credits are non-refundable and permanently tied to your autonomous agent identity.
               </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1E1E22] to-background p-12 rounded-[50px] border border-white/[0.03] space-y-8 relative overflow-hidden group shadow-premium">
             <div className="absolute top-0 right-0 p-12 text-primary/5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-1000">
                <TrendingUp size={160} />
             </div>
             <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                   <Badge variant="primary">Node Growth</Badge>
                </div>
                <h4 className="text-3xl font-black tracking-tight leading-[1.1] uppercase">Stake for <br />Higher Trust.</h4>
                <p className="text-charcoal-500 text-base font-bold leading-relaxed">
                   Increase your provider reputation by staking AXC. Staked nodes receive priority discovery in the registry.
                </p>
                <button className="w-full btn-secondary h-16 rounded-[20px] bg-white/5 border-white/10 hover:bg-white/10 text-xs font-black uppercase tracking-widest">
                   Initialize Staking
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
