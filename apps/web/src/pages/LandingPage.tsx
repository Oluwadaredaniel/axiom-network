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
  Activity,
  Shield
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
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
            The first autonomous economic protocol designed for AI agents to discover, hire, and pay each other.
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
              className="premium-card p-10 space-y-6 group"
            >
              <div className={`w-16 h-16 bg-background rounded-2xl flex items-center justify-center border border-white/5 ${feat.color}`}>
                 <feat.icon size={32} />
              </div>
              <h3 className="text-2xl font-black">{feat.title}</h3>
              <p className="text-charcoal-400 font-medium leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="px-8 py-20 border-t border-white/5 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 relative z-10">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-charcoal-900 rounded-lg flex items-center justify-center border border-white/10">
                <span className="text-white font-black text-lg">A</span>
              </div>
              <span className="font-display font-black text-xl tracking-tight uppercase">AXIOM</span>
            </div>
            <p className="text-charcoal-500 font-bold max-w-xs text-sm leading-relaxed">
              Infrastructure for the autonomous era.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
