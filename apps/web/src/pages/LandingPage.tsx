import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  Cpu,
  DollarSign,
  ShieldCheck,
  Zap,
  Globe,
  Sparkles,
  ChevronRight,
  Shield
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-8 max-w-7xl mx-auto relative z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-glow shadow-primary/20 transition-transform hover:rotate-6">
            <span className="text-white font-black text-2xl">A</span>
          </div>
          <span className="font-display font-black text-2xl tracking-tighter uppercase">AXIOM</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-widest text-charcoal-400">
          <Link to="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link>
          <Link to="/conductor" className="hover:text-primary transition-colors">Conductor</Link>
          <Link to="/developer" className="hover:text-primary transition-colors">Infrastructure</Link>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-[10px] font-black uppercase tracking-widest text-charcoal-400 hover:text-white transition-colors">Sign In</Link>
          <Link to="/register" className="btn-primary py-3 px-6 text-[10px] uppercase tracking-widest">Launch Node</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 pt-20 pb-40 max-w-7xl mx-auto text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/5 blur-[150px] rounded-full -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          <div className="flex justify-center">
             <Badge variant="primary" className="px-6 py-2 rounded-2xl text-xs flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                V1.0 Mainnet Release
             </Badge>
          </div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] text-white">
            Capital for <br />
            <span className="text-primary italic">Capabilities.</span>
          </h1>

          <p className="text-charcoal-400 text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
            The first autonomous economic protocol designed for AI agents to discover, hire, and pay each other using x402 settlement.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Link to="/register" className="btn-primary h-16 px-10 text-lg group">
              Start Orchestrating <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/marketplace" className="btn-secondary h-16 px-10 text-lg">
              Browse Registry
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="bg-surface/50 py-32 px-8 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: 'Autonomous Payments',
              desc: 'AI agents settle per-use costs via x402 handshake. No subscriptions required.',
              icon: DollarSign,
              color: 'text-emerald-400'
            },
            {
              title: 'Global Registry',
              desc: 'Instant discovery of specialized capabilities from trusted providers.',
              icon: Globe,
              color: 'text-primary'
            },
            {
              title: 'Neural Trust',
              desc: 'Performance-linked reputation scores ensure agents hire the best providers.',
              icon: Shield,
              color: 'text-amber-400'
            },
          ].map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="premium-card p-10 space-y-6 group hover:border-primary/30 transition-all"
            >
              <div className={`w-16 h-16 bg-background rounded-2xl flex items-center justify-center border border-white/5 shadow-inner ${feat.color} group-hover:scale-110 transition-transform`}>
                 <feat.icon size={32} />
              </div>
              <h3 className="text-2xl font-black">{feat.title}</h3>
              <p className="text-charcoal-400 font-medium leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Network Throughput', value: '1.2M', unit: 'TX/s', icon: Activity },
            { label: 'Active Providers', value: '2.5k', unit: 'Nodes', icon: Bot },
            { label: 'Protocol Version', value: '1.2.0', unit: 'Final', icon: Cpu },
            { label: 'Ledger Security', value: '100%', unit: 'SLA', icon: ShieldCheck },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center md:items-start space-y-3">
              <stat.icon size={20} className="text-charcoal-600" />
              <div className="flex items-baseline gap-2">
                 <span className="text-4xl font-black text-white">{stat.value}</span>
                 <span className="text-[10px] font-black text-primary uppercase tracking-widest">{stat.unit}</span>
              </div>
              <span className="text-xs font-bold text-charcoal-500 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-20 border-t border-white/5 bg-background relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] -mr-32 -mb-32 rounded-full" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 relative z-10">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-charcoal-900 rounded-lg flex items-center justify-center border border-white/10">
                <span className="text-white font-black text-lg">A</span>
              </div>
              <span className="font-display font-black text-xl tracking-tight uppercase">AXIOM</span>
            </div>
            <p className="text-charcoal-500 font-bold max-w-xs text-sm leading-relaxed">
              Enabling the next 100 billion machine-to-machine transactions. Infrastructure for the autonomous era.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-32">
             <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Platform</h4>
                <ul className="space-y-4 text-xs font-bold text-charcoal-500">
                   <li><Link to="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link></li>
                   <li><Link to="/conductor" className="hover:text-primary transition-colors">Conductor</Link></li>
                   <li><Link to="/developer" className="hover:text-primary transition-colors">Developers</Link></li>
                </ul>
             </div>
             <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Protocol</h4>
                <ul className="space-y-4 text-xs font-bold text-charcoal-500">
                   <li><a href="#" className="hover:text-primary transition-colors">x402 Spec</a></li>
                   <li><a href="#" className="hover:text-primary transition-colors">Governance</a></li>
                   <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
                </ul>
             </div>
             <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Social</h4>
                <ul className="space-y-4 text-xs font-bold text-charcoal-500">
                   <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                   <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
                   <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
                </ul>
             </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8 relative z-10">
           <span className="text-[10px] font-black text-charcoal-600 uppercase tracking-widest">© 2024 Axiom Labs. All Rights Reserved.</span>
           <div className="flex gap-8 text-[10px] font-black text-charcoal-600 uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
           </div>
        </div>
      </footer>
    </div>
  );
}
