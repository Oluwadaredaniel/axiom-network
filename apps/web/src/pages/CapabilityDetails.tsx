import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  Star,
  Shield,
  Zap,
  LayoutGrid,
  ArrowLeft,
  Terminal,
  DollarSign,
  Activity,
  Users,
  Globe,
  Sparkles,
  ShieldCheck,
  Receipt,
  Cpu,
  ArrowRight,
  Code
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Tooltip } from '@/components/ui/Tooltip';
import { motion } from 'framer-motion';

export default function CapabilityDetails() {
  const { id } = useParams();

  const { data: service, isLoading } = useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      const res = await axios.get(`/api/services/${id}`);
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[600px] space-y-8">
      <div className="relative">
         <div className="w-24 h-24 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
         <div className="absolute inset-0 flex items-center justify-center">
            <Cpu size={32} className="text-primary animate-pulse" />
         </div>
      </div>
      <p className="text-charcoal-500 font-black text-xs uppercase tracking-[0.4em] animate-pulse">Synchronizing Manifest...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      {/* Header Navigation */}
      <nav className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-8">
          <Link to="/marketplace" className="w-14 h-14 bg-surface-light rounded-[20px] flex items-center justify-center text-charcoal-400 hover:text-white transition-all border border-white/5 hover:border-white/10 group">
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex flex-col">
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-charcoal-500 mb-1">Registry Index</span>
             <span className="text-sm font-mono text-primary font-bold uppercase tracking-widest">{service?.id}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <Link to="/conductor" className="btn-primary h-14 px-10 rounded-2xl shadow-glow shadow-primary/20">
              <Zap size={18} fill="currentColor" /> Hire with Conductor
           </Link>
        </div>
      </nav>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-16">

        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-16">
          <div className="flex flex-col md:flex-row md:items-start gap-10">
            <div className="w-32 h-32 bg-surface-light text-primary rounded-[40px] flex items-center justify-center border border-white/10 shadow-glow shadow-primary/5 relative shrink-0">
               <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full opacity-50" />
               {service?.categoryName === 'Development' ? <Zap size={64} className="relative z-10" /> : <Sparkles size={64} className="relative z-10" />}
            </div>
            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                 <Badge variant="primary" className="px-5 py-1.5 rounded-xl border-primary/20">{service?.categoryName}</Badge>
                 <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-glow shadow-emerald-500/50" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">On-Ledger verified</span>
                 </div>
              </div>
              <h1 className="text-7xl font-black tracking-tighter text-white leading-[0.9]">{service?.name}</h1>
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-surface-lighter rounded-xl border border-white/5 flex items-center justify-center text-xs font-black uppercase text-charcoal-400 shadow-inner">
                      {service?.provider?.name.charAt(0)}
                   </div>
                   <span className="text-sm font-black text-charcoal-300 uppercase tracking-[0.2em]">{service?.provider?.name}</span>
                </div>
                <div className="h-4 w-px bg-white/10" />
                <div className="flex items-center gap-2">
                   <Star size={16} className="text-amber-400 fill-amber-400 shadow-glow shadow-amber-400/20" />
                   <span className="text-lg font-black text-white">{service?.provider?.reputation?.score}/100</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
             <div className="flex items-center gap-4">
                <Terminal size={28} className="text-primary" />
                <h3 className="text-3xl font-black uppercase tracking-tighter">Economic Manifest</h3>
             </div>
             <p className="text-charcoal-400 font-medium leading-relaxed text-2xl max-w-4xl italic">
               "{service?.description}"
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="premium-card bg-surface/30 p-10 space-y-10 rounded-[40px] border-white/[0.05]">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal-500 flex items-center gap-3">
                   <LayoutGrid size={14} className="text-primary" /> Capability Set
                </h4>
                <ul className="space-y-6">
                   {['Neural Protocol Invocation', 'High-Entropy Transformation', 'Recursive Logic Processing', 'x402 Compliance Verified'].map((cap, idx) => (
                      <motion.li
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={cap}
                        className="flex items-center gap-4 text-base font-bold text-white group"
                      >
                         <div className="w-2 h-2 bg-primary rounded-full shadow-glow shadow-primary/50 group-hover:scale-150 transition-transform" />
                         {cap}
                      </motion.li>
                   ))}
                </ul>
             </div>

             <div className="premium-card bg-surface/30 p-10 space-y-10 rounded-[40px] border-white/[0.05]">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal-500 flex items-center gap-3">
                   <Globe size={14} className="text-primary" /> Interface Endpoint
                </h4>
                <div className="space-y-6">
                   <div className="font-mono text-xs bg-black/60 p-6 rounded-3xl border border-white/[0.05] break-all leading-loose text-primary-light shadow-inner relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Code size={14} className="text-charcoal-600" />
                      </div>
                      {service?.endpoint}
                   </div>
                   <div className="flex items-center gap-4">
                      <Badge variant="outline" className="rounded-lg border-white/5 bg-white/5">POST</Badge>
                      <span className="text-[10px] text-charcoal-600 font-black uppercase tracking-widest">Protocol: HTTPS / Axiom-Sim-v1</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="space-y-10 pt-8 border-t border-white/[0.05]">
             <h3 className="text-3xl font-black tracking-tighter uppercase">Performance Audit</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: 'Avg Latency', value: '420ms', icon: Activity, color: 'text-primary', bg: 'bg-primary/5' },
                  { label: 'Uptime SLA', value: '99.9%', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-400/5' },
                  { label: 'Total Invocations', value: service?.usageCount.toLocaleString() || '0', icon: Users, color: 'text-purple-400', bg: 'bg-purple-400/5' },
                  { label: 'Rate (AXC)', value: `${service?.price}`, icon: DollarSign, color: 'text-amber-400', bg: 'bg-amber-400/5' },
                ].map((stat, i) => (
                  <div key={i} className={`premium-card ${stat.bg} p-8 rounded-[32px] space-y-3 group hover:scale-[1.03] transition-all border-white/[0.03]`}>
                    <div className="flex items-center gap-3 text-charcoal-500 mb-2">
                      <stat.icon size={16} className={stat.color} />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</span>
                    </div>
                    <span className="text-3xl font-black block text-white group-hover:text-primary transition-colors tracking-tight">{stat.value}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Pricing & Hiring Sidebar */}
        <div className="space-y-8">
           <div className="bg-[#111113] border border-white/[0.08] rounded-[60px] p-12 shadow-premium sticky top-28 space-y-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[300px] bg-primary/5 blur-[100px] -z-0" />

              <div className="text-center space-y-4 relative z-10">
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal-600">Current Cost Basis</span>
                 <div className="flex items-center justify-center gap-4">
                    <h2 className="text-8xl font-black tracking-tighter text-white">{service?.price}</h2>
                    <span className="text-3xl font-bold text-primary italic font-display uppercase opacity-80">AXC</span>
                 </div>
                 <p className="text-charcoal-500 text-xs font-bold uppercase tracking-widest">per autonomous call</p>
              </div>

              <div className="space-y-5 relative z-10">
                 <div className="flex justify-between items-center p-6 bg-white/[0.02] rounded-3xl border border-white/5 group hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-4">
                       <Star size={20} className="text-amber-400 fill-amber-400 shadow-glow shadow-amber-400/20" />
                       <span className="text-sm font-black uppercase tracking-widest text-charcoal-300">Reputation</span>
                    </div>
                    <span className="text-xl font-black text-white">{service?.provider?.reputation?.score}/100</span>
                 </div>
                 <div className="flex justify-between items-center p-6 bg-white/[0.02] rounded-3xl border border-white/5 group hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-4">
                       <Shield size={20} className="text-emerald-400 shadow-glow shadow-emerald-500/20" />
                       <span className="text-sm font-black uppercase tracking-widest text-charcoal-300">x402 Guard</span>
                    </div>
                    <Badge variant="success" className="px-3">ENFORCED</Badge>
                 </div>
              </div>

              <div className="space-y-5 pt-4 relative z-10">
                 <button className="btn-primary w-full h-20 text-lg rounded-[28px] shadow-glow shadow-primary/30 flex items-center justify-center gap-4 group">
                    Hire Capability <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                 </button>
                 <button className="btn-secondary w-full h-16 rounded-[24px] bg-white/5 border-white/10 hover:bg-white/10 text-xs font-black uppercase tracking-[0.2em] transition-all">
                    Request Integration Kit
                 </button>
              </div>

              <div className="pt-10 border-t border-white/5 space-y-6 relative z-10 text-center">
                 <div className="flex items-center justify-center gap-3 text-charcoal-500">
                    <Receipt size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Full Audit Trail Enabled</span>
                 </div>
                 <p className="text-[10px] text-charcoal-700 font-bold leading-relaxed px-4">
                    By hiring this capability, your agent node will autonomously settle the x402 challenge. All transactions are settled on the Axiom core ledger and are non-refundable.
                 </p>
              </div>
           </div>
        </div>

      </main>
    </div>
  );
}
