import { Link } from 'react-router-dom';
import {
  Shield,
  Users,
  CreditCard,
  LayoutGrid,
  Activity,
  Search,
  ArrowUpRight,
  Lock,
  Eye,
  Server
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export default function AdminPage() {
  return (
    <div className="space-y-12">
       <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
             <div className="flex items-center gap-2 mb-2">
                <Badge variant="error" className="bg-rose-500/20 text-rose-400 border-rose-500/30">Privileged Access</Badge>
                <div className="h-1 w-1 bg-charcoal-600 rounded-full" />
                <span className="text-[10px] font-black text-charcoal-500 uppercase tracking-widest">Root Node</span>
             </div>
             <h1 className="text-4xl font-black mb-1">Global Governance</h1>
             <p className="text-charcoal-400 font-bold text-sm">Platform-wide oversight and economic protocol management.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3">
                <Lock size={16} className="text-rose-500" />
                <span className="text-xs font-black text-rose-400 uppercase tracking-widest">Security Level: 0</span>
             </div>
          </div>
       </header>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Network Users', value: '1,240', icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
            { label: 'Active Services', value: '86', icon: LayoutGrid, color: 'text-purple-400', bg: 'bg-purple-400/10' },
            { label: 'Volume (24h)', value: '142k AXC', icon: CreditCard, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
            { label: 'Compute Load', value: '12%', icon: Activity, color: 'text-amber-400', bg: 'bg-amber-400/10' },
          ].map((stat, i) => (
             <div key={i} className="premium-card group hover:border-white/20 transition-all">
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 shadow-inner`}>
                   <stat.icon size={24} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-500 block mb-1">{stat.label}</span>
                <p className="text-3xl font-black text-white group-hover:text-primary transition-colors">{stat.value}</p>
             </div>
          ))}
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="premium-card p-0 overflow-hidden">
             <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <h3 className="font-black text-sm uppercase tracking-widest text-charcoal-400">Node Registration Log</h3>
                <div className="relative">
                   <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-500" />
                   <input type="text" placeholder="Filter nodes..." className="pl-9 pr-3 py-2 bg-surface-light border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-primary/50" />
                </div>
             </div>
             <div className="p-20 text-center space-y-4">
                <div className="w-16 h-16 bg-surface-lighter rounded-full flex items-center justify-center mx-auto text-charcoal-500">
                   <Server size={32} />
                </div>
                <p className="text-charcoal-400 font-bold text-sm italic">
                   User management console pending root synchronization...
                </p>
             </div>
          </div>

          <div className="premium-card p-0 overflow-hidden">
             <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <h3 className="font-black text-sm uppercase tracking-widest text-charcoal-400">Economic Distribution</h3>
                <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Download Ledger</button>
             </div>
             <div className="p-20 text-center space-y-4">
                <div className="w-16 h-16 bg-surface-lighter rounded-full flex items-center justify-center mx-auto text-charcoal-500">
                   <Eye size={32} />
                </div>
                <p className="text-charcoal-400 font-bold text-sm italic">
                   Economic distribution logs encrypted. Initialize root key to view.
                </p>
             </div>
          </div>
       </div>

       <div className="bg-rose-500/10 p-10 rounded-[48px] border border-rose-500/20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 blur-[100px] -mr-32 -mt-32" />
          <div className="flex items-center gap-8 relative z-10">
             <div className="w-20 h-20 bg-rose-500/20 rounded-[32px] flex items-center justify-center border border-rose-500/30 group-hover:scale-110 transition-transform shadow-glow shadow-rose-500/20">
                <Shield size={40} className="text-rose-500" />
             </div>
             <div>
                <h4 className="text-2xl font-black text-white mb-2">Network Security Guard</h4>
                <p className="text-rose-400/70 text-base font-medium max-w-lg leading-relaxed">
                   Automated threat detection and anomaly isolation is <span className="text-emerald-400 font-black">ACTIVE</span>. Root level override required for manual intervention.
                </p>
             </div>
          </div>
          <button className="btn-secondary bg-white text-background hover:bg-white/90 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest relative z-10 shadow-glow shadow-white/10 active:scale-95">
             System Audit <ArrowUpRight size={18} className="ml-2" />
          </button>
       </div>
    </div>
  );
}
