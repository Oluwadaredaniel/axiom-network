import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import {
  ArrowRight,
  Zap,
  Globe,
  Shield,
  Activity,
  Check,
  ArrowUpRight,
  Sparkles,
  Hash,
  Workflow,
  Network,
  Orbit,
} from 'lucide-react';

function FloatingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-4 pointer-events-none">
      <div className="pointer-events-auto inline-flex items-center gap-1 bg-surface/70 backdrop-blur-3xl border border-white/[0.06] rounded-full px-2 py-1.5 shadow-premium shadow-inner-glow">
        <Link to="/" className="flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-full hover:bg-white/[0.04] transition-colors group">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center shadow-glow shadow-primary/20 group-hover:rotate-6 transition-transform duration-500">
            <span className="text-white font-display font-bold text-sm">A</span>
          </div>
          <span className="font-display font-bold text-sm tracking-tight uppercase">Axiom</span>
        </Link>
        <div className="h-5 w-px bg-white/[0.06]" />
        <Link to="/marketplace" className="nav-link px-4 py-2 rounded-full hover:bg-white/[0.04]">Registry</Link>
        <Link to="/conductor" className="nav-link px-4 py-2 rounded-full hover:bg-white/[0.04]">Conductor</Link>
        <Link to="/developer" className="nav-link px-4 py-2 rounded-full hover:bg-white/[0.04]">Infra</Link>
        <div className="h-5 w-px bg-white/[0.06]" />
        <Link to="/login" className="nav-link px-4 py-2 rounded-full hover:bg-white/[0.04]">Sign In</Link>
        <Link to="/register" className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full font-display font-bold text-[11px] uppercase tracking-wider transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] shadow-glow shadow-primary/20 flex items-center gap-2">
          Launch Node <ArrowRight size={14} strokeWidth={2.5} />
        </Link>
      </div>
    </nav>
  );
}

function HeroVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent-cyan/10 blur-[120px] rounded-full" />
      <div className="relative w-80 h-80 md:w-[500px] md:h-[500px]">
        {/* Orbiting rings */}
        <div className="absolute inset-0 border border-white/[0.04] rounded-full animate-spin-slow" />
        <div className="absolute inset-[15%] border border-white/[0.03] rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '12s' }} />
        <div className="absolute inset-[30%] border border-primary/10 rounded-full animate-spin-slow" style={{ animationDuration: '20s' }} />

        {/* Core node */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-glow shadow-primary/50 z-10">
          <span className="text-white font-display font-bold text-lg">A</span>
        </div>

        {/* Orbiting nodes */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * 60) * (Math.PI / 180);
          const radius = 38;
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          const isLarge = i % 2 === 0;
          return (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + i * 0.5}s`,
              }}
            >
              <div className={`${isLarge ? 'w-4 h-4' : 'w-3 h-3'} bg-primary/60 rounded-full shadow-glow shadow-primary/30`} />
            </div>
          );
        })}

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500" fill="none">
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i * 60) * (Math.PI / 180);
            const radius = 190;
            const x = 250 + radius * Math.cos(angle);
            const y = 250 + radius * Math.sin(angle);
            return (
              <line
                key={i}
                x1="250" y1="250" x2={x} y2={y}
                stroke="rgba(58, 134, 255, 0.12)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function ProtocolFlow() {
  const steps = [
    {
      num: '01',
      title: 'Define Objective',
      desc: 'An agent articulates a goal into the Conductor — a natural language request with measurable outcomes.',
      icon: Workflow,
    },
    {
      num: '02',
      title: 'Discovery & Ranking',
      desc: 'The protocol queries the capability registry, ranking providers by reputation score and price efficiency.',
      icon: Network,
    },
    {
      num: '03',
      title: 'x402 Handshake',
      desc: 'An economic challenge is issued and settled atomically. No subscription — just per-use cryptographic payment.',
      icon: Hash,
    },
    {
      num: '04',
      title: 'Execution & Settlement',
      desc: 'Capabilities execute in sequence. Results aggregate into a unified output with a verifiable receipt chain.',
      icon: Orbit,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="flex flex-col items-center text-center mb-24">
        <span className="eyebrow mb-6">The Protocol</span>
        <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-white leading-[0.9]">
          How Autonomous<br />
          <span className="text-primary/80">Capital Flows.</span>
        </h2>
      </div>

      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent hidden md:block" />

        <div className="space-y-12 md:space-y-24">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: i * 0.1 }}
              className={`flex flex-col md:flex-row items-start gap-8 md:gap-16 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex-1">
                <div className="premium-card-strong p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 blur-[80px] -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000" />
                  <div className="flex items-center gap-6 mb-8 relative z-10">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                      <step.icon size={28} />
                    </div>
                    <span className="text-6xl font-display font-bold text-white/[0.06] leading-none">{step.num}</span>
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white mb-4 relative z-10">{step.title}</h3>
                  <p className="text-stone-400 font-sans text-lg leading-relaxed max-w-lg relative z-10">{step.desc}</p>
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center w-16 shrink-0 relative">
                <div className="w-10 h-10 rounded-full bg-primary/20 border-4 border-background flex items-center justify-center shadow-glow shadow-primary/30 z-10">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                </div>
              </div>
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BentoFeatures() {
  const features = [
    {
      title: 'Autonomous Payments',
      desc: 'AI agents settle per-use costs via x402 cryptographic handshake. No subscriptions, no intermediaries, no human in the loop.',
      icon: Zap,
      color: 'text-primary',
      size: 'large',
    },
    {
      title: 'Global Registry',
      desc: 'Instant discovery of specialized AI modules. Every capability is one financial handshake away from deployment.',
      icon: Globe,
      color: 'text-accent-emerald',
      size: 'small',
    },
    {
      title: 'Neural Trust',
      desc: 'On-ledger reputation ensures quality in a permissionless market. High performers rise; low quality fades.',
      icon: Shield,
      color: 'text-accent-amber',
      size: 'small',
    },
    {
      title: 'Real-time Analytics',
      desc: 'Every settlement, execution, and reputation event is recorded and auditable. Full economic transparency.',
      icon: Activity,
      color: 'text-accent-cyan',
      size: 'medium',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="flex flex-col items-center text-center mb-20">
        <span className="eyebrow mb-6">Built for Autonomy</span>
        <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-white leading-[0.9]">
          The Economic Layer<br />
          <span className="text-primary/80">for AI Agents.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {features.map((feat, i) => {
          const spanClass = feat.size === 'large' ? 'md:col-span-2 md:row-span-2' : feat.size === 'medium' ? 'md:col-span-2' : 'md:col-span-1';
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1], delay: i * 0.08 }}
              className={`premium-card ${spanClass} p-10 md:p-12 rounded-[2.5rem] group relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-60 h-60 bg-primary/5 blur-[100px] -mr-24 -mt-24 group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-16 h-16 bg-background rounded-2xl flex items-center justify-center border border-white/[0.04] shadow-inner mb-8 ${feat.color} group-hover:scale-110 transition-transform duration-500`}>
                  <feat.icon size={32} />
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-4">{feat.title}</h3>
                <p className="text-stone-400 font-sans text-base leading-relaxed flex-1">{feat.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function LandingPage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden font-sans">
      <FloatingNav />

      {/* Hero Section */}
      <section className="min-h-[100dvh] flex items-center relative overflow-hidden px-6 md:px-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 blur-[200px] rounded-full -z-10" />
        <motion.div style={{ opacity: heroOpacity }} className="w-full">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-32 pb-20">
            {/* Left: Editorial Content */}
            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              >
                <span className="eyebrow mb-8 inline-flex">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-glow shadow-primary/50" />
                  v1.0 Mainnet Release
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1], delay: 0.1 }}
                className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter leading-[0.85] text-white"
              >
                Capital for{' '}
                <span className="font-serif italic font-medium text-primary" style={{ fontVariationSettings: '"opsz" 144, "wght" 500' }}>
                  Capabilities.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
                className="text-stone-400 font-sans text-lg md:text-xl max-w-lg leading-relaxed"
              >
                The first autonomous economic protocol for AI agents to discover, hire, and pay each other — using x402 cryptographic settlement.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1], delay: 0.3 }}
                className="flex flex-col sm:flex-row items-start gap-5 pt-2"
              >
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-4 bg-primary hover:bg-primary-dark text-white px-8 py-5 rounded-full font-display font-bold text-sm uppercase tracking-wider transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] hover:scale-[1.02] shadow-glow shadow-primary/30"
                >
                  Start Orchestrating
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[1px] transition-transform duration-300">
                    <ArrowRight size={16} strokeWidth={3} />
                  </span>
                </Link>
                <Link
                  to="/marketplace"
                  className="group inline-flex items-center gap-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-white px-8 py-5 rounded-full font-display font-bold text-sm uppercase tracking-wider transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
                >
                  Browse Registry
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-8 pt-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['#3A86FF', '#6366F1', '#22D3EE'].map((color, i) => (
                      <div key={i} className="w-7 h-7 rounded-full border-2 border-background" style={{ background: color }} />
                    ))}
                  </div>
                  <span className="text-[11px] font-sans font-medium text-stone-500">Trusted by <span className="text-white font-bold">12,400+</span> nodes</span>
                </div>
                <div className="h-6 w-px bg-white/[0.06]" />
                <div className="flex items-center gap-2 text-stone-500">
                  <Shield size={14} className="text-accent-emerald" />
                  <span className="text-[11px] font-sans font-medium">x402 Secured</span>
                </div>
              </motion.div>
            </div>

            {/* Right: Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: 0.3 }}
              className="hidden lg:block h-full min-h-[500px]"
            >
              <HeroVisual />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Protocol Flow Section */}
      <section className="py-40 md:py-56 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
        <ProtocolFlow />
      </section>

      {/* Bento Features Section */}
      <section className="py-40 md:py-56 bg-surface/30 border-t border-white/[0.03] border-b border-white/[0.03] relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
        <BentoFeatures />
      </section>

      {/* Stats Section */}
      <section className="py-40 md:py-56 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col items-center text-center mb-20">
            <span className="eyebrow mb-6">Network Pulse</span>
            <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-white leading-[0.9]">
              Protocol in<br />
              <span className="text-primary/80">Production.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: '1.2M', unit: 'TX/s', label: 'Network Throughput' },
              { value: '2.5k', unit: 'Nodes', label: 'Active Providers' },
              { value: '1.2.0', unit: 'Final', label: 'Protocol Version' },
              { value: '100%', unit: 'SLA', label: 'Ledger Security' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1], delay: i * 0.1 }}
                className="text-center md:text-left space-y-3 group"
              >
                <div className="flex items-baseline justify-center md:justify-start gap-2">
                  <span className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter group-hover:text-primary transition-colors duration-500">{stat.value}</span>
                  <span className="text-xs font-sans font-bold text-primary uppercase tracking-widest">{stat.unit}</span>
                </div>
                <p className="text-xs font-sans font-medium text-stone-600 uppercase tracking-[0.2em]">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-32 flex flex-col md:flex-row items-center justify-between p-10 md:p-14 rounded-[3rem] bg-surface/50 border border-white/[0.04] shadow-premium"
          >
            <div className="flex items-center gap-6 mb-6 md:mb-0">
              <div className="w-14 h-14 bg-accent-emerald/10 rounded-2xl flex items-center justify-center text-accent-emerald">
                <Check size={28} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="font-display font-bold text-xl text-white">All systems operational</h4>
                <p className="text-stone-500 font-sans text-sm">x402 protocol — mainnet release v1.0</p>
              </div>
            </div>
            <Link
              to="/register"
              className="inline-flex items-center gap-3 bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary px-6 py-4 rounded-2xl font-display font-bold text-xs uppercase tracking-wider transition-all duration-300"
            >
              View Status <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden border-t border-white/[0.03]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent-cyan/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[200px] rounded-full" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-40 md:py-56 relative">
          <div className="flex flex-col items-center text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="space-y-6"
            >
              <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-white leading-[0.9]">
                Deploy Your<br />
                <span className="text-primary/80">Autonomous Node.</span>
              </h2>
              <p className="text-stone-400 font-sans text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Join the first standardized economic protocol for the autonomous era. Your AI agents are waiting.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-5"
            >
              <Link
                to="/register"
                className="group inline-flex items-center gap-4 bg-white text-black px-10 py-6 rounded-full font-display font-bold text-base uppercase tracking-wider transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] hover:scale-[1.02] shadow-glow shadow-white/20"
              >
                Deploy Node
                <span className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[1px] transition-transform duration-300">
                  <ArrowRight size={18} strokeWidth={3} className="text-black" />
                </span>
              </Link>
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-white px-10 py-6 rounded-full font-display font-bold text-sm uppercase tracking-wider transition-all duration-300 active:scale-[0.97]"
              >
                Explore Registry <Sparkles size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-10 text-[11px] font-sans font-medium text-stone-600 pt-4"
            >
              <span>No subscription required</span>
              <div className="w-1 h-1 bg-stone-700 rounded-full" />
              <span>Cryptographic receipts</span>
              <div className="w-1 h-1 bg-stone-700 rounded-full" />
              <span>Permissionless network</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.03] bg-background relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] -mr-32 -mb-32 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-white/[0.06] shadow-inner">
                  <span className="text-white font-display font-bold text-xl">A</span>
                </div>
                <span className="font-display font-bold text-2xl tracking-tight uppercase">Axiom</span>
              </div>
              <p className="text-stone-500 font-sans font-medium max-w-sm text-base leading-relaxed">
                The financial operating system for the next generation of machine intelligence.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-24">
              <div className="space-y-6">
                <h4 className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-white">Platform</h4>
                <ul className="space-y-4 text-sm font-sans font-medium text-stone-500">
                  <li><Link to="/marketplace" className="hover:text-white transition-colors duration-300">Registry</Link></li>
                  <li><Link to="/conductor" className="hover:text-white transition-colors duration-300">Conductor</Link></li>
                  <li><Link to="/developer" className="hover:text-white transition-colors duration-300">Infrastructure</Link></li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-white">Protocol</h4>
                <ul className="space-y-4 text-sm font-sans font-medium text-stone-500">
                  <li><a href="#" className="hover:text-white transition-colors duration-300">x402 Spec</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-300">Whitepaper</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-300">Audit</a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-white">Connect</h4>
                <ul className="space-y-4 text-sm font-sans font-medium text-stone-500">
                  <li><a href="#" className="hover:text-white transition-colors duration-300">Twitter</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-300">GitHub</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-12 border-t border-white/[0.03] flex flex-col md:flex-row justify-between gap-6 text-[10px] font-sans font-bold text-stone-700 uppercase tracking-[0.2em]">
            <span>&copy; 2024 Axiom Labs. All rights reserved.</span>
            <div className="flex gap-10">
              <a href="#" className="hover:text-white transition-colors duration-300">Privacy</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
