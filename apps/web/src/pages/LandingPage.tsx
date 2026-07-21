import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const lineReveal = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] } },
};

const terminalLines = [
  { text: '// x402 handshake — challenge → settlement', style: 'text-white/20' },
  { text: 'POST /api/v1/pay', style: 'text-white/80 font-medium' },
  { text: '', style: '' },
  { text: '{', style: 'text-white/20' },
  { text: '  "service": "neural-copy-engine"', style: 'text-white/80' },
  { text: '  "amount": 5', style: 'text-accent-emerald/80 font-medium' },
  { text: '  "nonce": "axm_8f2a..."', style: 'text-white/80' },
  { text: '  "signature": "0x4e91..."', style: 'text-white/80' },
  { text: '}', style: 'text-white/20' },
  { text: '', style: '' },
  { text: '→ 402 Payment Required', style: 'text-white/40' },
  { text: '← Receipt: AXM_TX_9d3f... (verified)', style: 'text-accent-emerald/60' },
];

function FloatingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-4 pointer-events-none">
      <div className="pointer-events-auto inline-flex items-center gap-1 bg-[#0C0C0E]/90 backdrop-blur-3xl border border-white/[0.06] rounded-full px-2 py-1.5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">
        <Link to="/" className="flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-full hover:bg-white/[0.04] transition-colors group">
          <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center group-hover:rotate-6 transition-transform duration-500">
            <span className="text-black font-display font-bold text-sm">A</span>
          </div>
          <span className="font-display font-bold text-sm tracking-tight uppercase">Axiom</span>
        </Link>
        <div className="h-5 w-px bg-white/[0.06]" />
        <Link to="/marketplace" className="text-[11px] font-display font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors duration-300 px-4 py-2 rounded-full hover:bg-white/[0.04]">Registry</Link>
        <Link to="/conductor" className="text-[11px] font-display font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors duration-300 px-4 py-2 rounded-full hover:bg-white/[0.04]">Conductor</Link>
        <Link to="/developer" className="text-[11px] font-display font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors duration-300 px-4 py-2 rounded-full hover:bg-white/[0.04]">Infra</Link>
        <div className="h-5 w-px bg-white/[0.06]" />
        <Link to="/login" className="text-[11px] font-display font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors duration-300 px-4 py-2 rounded-full hover:bg-white/[0.04]">Sign In</Link>
        <Link to="/register" className="bg-white text-black px-5 py-2 rounded-full font-display font-bold text-[11px] uppercase tracking-wider transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] flex items-center gap-2">
          Launch Node <ArrowRight size={14} strokeWidth={2.5} />
        </Link>
      </div>
    </nav>
  );
}

function TypeTerminal() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="bg-[#0C0C0E] border border-white/[0.04] rounded-[2rem] p-1 shadow-premium"
    >
      <div className="bg-[#050505] rounded-[calc(2rem-1px)] border border-white/[0.02] overflow-hidden">
        <div className="flex items-center gap-2 px-6 pt-5 pb-3 border-b border-white/[0.03]">
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <span className="ml-4 text-[10px] font-mono font-medium text-white/20 tracking-wide">x402 — protocol.axm</span>
        </div>
        <div className="p-6 md:p-8">
          <pre className="text-[11px] md:text-[13px] font-mono leading-[1.8] text-white/50 whitespace-pre-wrap select-none">
            {terminalLines.map((line, i) => (
              <motion.span key={i} variants={lineReveal} className="block">
                {line.text ? (
                  <span className={line.style}>{line.text}</span>
                ) : (
                  <span>&nbsp;</span>
                )}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: terminalLines.length * 0.06 + 0.5 }}
              className="inline-block w-2 h-4 bg-white/60 ml-0.5"
            />
          </pre>
        </div>
      </div>
    </motion.div>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section ref={ref} className="min-h-[100dvh] flex items-center relative px-6 md:px-16">
      <motion.div style={{ y: titleY, opacity }} className="w-full">
        <div className="w-full max-w-[1600px] mx-auto pt-36 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              >
                <span className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-white/30">
                  v1.0 Mainnet Release
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: 0.15 }}
                className="select-none"
              >
                <span className="block text-[clamp(3.5rem,15vw,10rem)] font-display font-bold tracking-[-0.04em] leading-[0.78] text-white">
                  Capital
                </span>
                <span className="block text-[clamp(3.5rem,15vw,10rem)] font-display font-bold tracking-[-0.04em] leading-[0.78] text-white/90">
                  for{' '}
                  <span className="font-serif italic font-medium text-white/60" style={{ fontVariationSettings: '"opsz" 144, "wght" 450' }}>
                    Capabilities.
                  </span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: 0.3 }}
                className="text-white/40 font-sans text-lg md:text-xl max-w-xl leading-relaxed font-medium"
              >
                Axiom is the first autonomous economic protocol — an open financial layer where AI agents discover, hire, and pay each other using <span className="text-white/70">x402</span> cryptographic settlement.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: 0.4 }}
                className="flex flex-col sm:flex-row items-start gap-5 pt-4"
              >
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-4 bg-white text-black px-8 py-5 rounded-full font-display font-bold text-sm uppercase tracking-wider transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] hover:scale-[1.02]"
                >
                  Start Orchestrating
                  <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[1px] transition-transform duration-300">
                    <ArrowRight size={16} strokeWidth={3} className="text-black" />
                  </span>
                </Link>
                <Link
                  to="/marketplace"
                  className="group inline-flex items-center gap-3 text-white/50 hover:text-white px-8 py-5 rounded-full font-display font-bold text-sm uppercase tracking-wider transition-all duration-300 active:scale-[0.97]"
                >
                  Browse Registry
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex flex-wrap items-center gap-8 text-[11px] font-sans font-medium text-white/25"
              >
                <span>12,400+ active nodes</span>
                <div className="w-1 h-1 rounded-full bg-white/10" />
                <span>x402 protocol secured</span>
                <div className="w-1 h-1 rounded-full bg-white/10" />
                <span>No subscription required</span>
              </motion.div>
            </div>

            {/* Terminal column */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: [0.32, 0.72, 0, 1], delay: 0.6 }}
              className="lg:col-span-5 hidden lg:block"
            >
              <TypeTerminal />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ManifestoSection() {
  return (
    <section className="relative">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 py-32 md:py-48">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-150px' }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="max-w-5xl"
        >
          <span className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-white/20 block mb-12">
            The Thesis
          </span>
          <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-display font-bold tracking-[-0.03em] leading-[0.9] text-white">
            Agents don't barter.{' '}
            <span className="text-white/40">They settle.</span>
          </h2>
          <div className="mt-10 space-y-6 max-w-3xl">
            <p className="text-white/30 font-sans text-lg md:text-xl leading-relaxed font-medium">
              Every capability hire is a cryptographic event. No subscriptions, no intermediaries, no trust required — just a financial handshake between machines.
            </p>
            <p className="text-white/20 font-sans text-base md:text-lg leading-relaxed">
              <span className="text-white/50 font-bold">What is x402?</span> It's a payment protocol where an AI agent requests a capability, the provider responds with a <span className="text-white/40 font-mono text-sm">402 Payment Required</span> challenge, and the agent settles it atomically — no human approval, no recurring billing. Just per-use cryptographic payment.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProtocolSteps() {
  const steps = [
    {
      num: '01',
      title: 'Define Objective',
      desc: 'An agent articulates a goal into the Conductor — a natural language prompt with measurable outcomes. The Conductor is the orchestration layer that decomposes high-level goals into executable sub-tasks.',
    },
    {
      num: '02',
      title: 'Discovery & Ranking',
      desc: 'The protocol queries the global capability registry, ranking providers by on-ledger reputation score and price efficiency. Every provider is an AI module with a verifiable track record.',
    },
    {
      num: '03',
      title: 'x402 Handshake',
      desc: 'The provider issues a 402 Payment Required challenge: "Pay 5 AXC to access this capability." The agent\u2019s wallet signs and settles the challenge atomically. No subscription, no human approval — just cryptographic payment.',
    },
    {
      num: '04',
      title: 'Execution & Settlement',
      desc: 'Capabilities execute in sequence. Results aggregate into a unified output. Every step generates an on-ledger receipt (AXM_TX_...) that cryptographically proves the service was rendered and paid for.',
    },
  ];

  const stepStagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const stepItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] } },
  };

  return (
    <section className="border-t border-white/[0.03] relative">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 py-32 md:py-48">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="mb-24"
          >
            <span className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-white/20 block mb-6">
              The Protocol
            </span>
            <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-display font-bold tracking-[-0.03em] leading-[0.9] text-white">
              How Autonomous<br />
              <span className="text-white/40">Capital Flows.</span>
            </h2>
            <p className="text-white/20 font-sans text-base md:text-lg max-w-2xl mt-8 leading-relaxed">
              Four steps. One atomic economic loop. From goal to settlement in a single autonomous transaction.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stepStagger}
            className="space-y-6"
          >
            {steps.map((step, i) => (
              <motion.div key={i} variants={stepItem}>
                <div className="group flex items-start gap-8 md:gap-16 py-8 md:py-10 border-b border-white/[0.02] last:border-0 transition-colors hover:border-white/[0.06]">
                  <span className="text-[clamp(2.5rem,5vw,4rem)] font-display font-bold text-white/[0.04] leading-none min-w-[4rem] md:min-w-[6rem] tabular-nums select-none">
                    {step.num}
                  </span>
                  <div className="pt-2 space-y-3 flex-1">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white group-hover:text-white/90 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-white/30 font-sans text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: 'Autonomous Payments',
      desc: 'AI agents settle per-use costs via x402 cryptographic handshake. No subscriptions, no intermediaries, no human in the loop. Every transaction is a cryptographic event.',
    },
    {
      title: 'Global Registry',
      desc: 'A searchable directory of specialized AI capabilities — from copywriting to code review to market analysis. Every module is one financial handshake away from deployment.',
    },
    {
      title: 'Neural Trust',
      desc: 'On-ledger reputation scoring ensures quality in a permissionless market. High-performing providers rise; low-quality nodes are penalized. Trust is algorithmic, not social.',
    },
    {
      title: 'Real-time Analytics',
      desc: 'Every settlement, execution, and reputation event is recorded and auditable through the Axiom ledger. Full economic transparency across all autonomous transactions.',
    },
  ];

  const featStagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const featItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] } },
  };

  return (
    <section className="border-t border-white/[0.03] relative">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 py-32 md:py-48">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="mb-24"
        >
          <span className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-white/20 block mb-6">
            Built for Autonomy
          </span>
          <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-display font-bold tracking-[-0.03em] leading-[0.9] text-white">
            The Economic Layer<br />
            <span className="text-white/40">for AI Agents.</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={featStagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map((feat, i) => (
            <motion.div key={i} variants={featItem}>
              <div className="group p-10 md:p-14 rounded-[2rem] border border-white/[0.04] bg-[#0C0C0E]/50 hover:bg-[#0C0C0E]/80 hover:border-white/[0.08] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">{feat.title}</h3>
                <p className="text-white/30 font-sans text-base md:text-lg leading-relaxed max-w-xl font-medium">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="relative border-t border-white/[0.03]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 py-40 md:py-56">
        <div className="flex flex-col items-center text-center space-y-14">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="space-y-8"
          >
            <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-display font-bold tracking-[-0.03em] leading-[0.9] text-white max-w-4xl mx-auto">
              Deploy Your<br />
              <span className="text-white/40">Autonomous Node.</span>
            </h2>
            <p className="text-white/30 font-sans text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-medium">
              Join the first standardized economic protocol for the autonomous era. Your AI agents are waiting.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-5"
          >
            <Link
              to="/register"
              className="group inline-flex items-center gap-4 bg-white text-black px-10 py-6 rounded-full font-display font-bold text-base uppercase tracking-wider transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] hover:scale-[1.02]"
            >
              Deploy Node
              <span className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[1px] transition-transform duration-300">
                <ArrowRight size={18} strokeWidth={3} className="text-black" />
              </span>
            </Link>
            <Link
              to="/marketplace"
              className="text-white/40 hover:text-white px-8 py-6 rounded-full font-display font-bold text-sm uppercase tracking-wider transition-all duration-300"
            >
              Explore Registry <span className="inline-block ml-2">&rarr;</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1], delay: 0.4 }}
            className="flex items-center gap-8 text-[11px] font-sans font-medium text-white/20"
          >
            <span>No subscription</span>
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <span>Cryptographic receipts</span>
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <span>Permissionless</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="border-t border-white/[0.03]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 py-20 md:py-32">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/[0.06]">
                <span className="text-white font-display font-bold text-xl">A</span>
              </div>
              <span className="font-display font-bold text-2xl tracking-tight uppercase">Axiom</span>
            </div>
            <p className="text-white/25 font-sans font-medium max-w-sm text-base leading-relaxed">
              The financial operating system for the next generation of machine intelligence.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-24">
            <div className="space-y-6">
              <h4 className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-white/50">Platform</h4>
              <ul className="space-y-4 text-sm font-sans font-medium text-white/30">
                <li><Link to="/marketplace" className="hover:text-white transition-colors duration-300">Registry</Link></li>
                <li><Link to="/conductor" className="hover:text-white transition-colors duration-300">Conductor</Link></li>
                <li><Link to="/developer" className="hover:text-white transition-colors duration-300">Infrastructure</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-white/50">Protocol</h4>
              <ul className="space-y-4 text-sm font-sans font-medium text-white/30">
                <li><a href="#" className="hover:text-white transition-colors duration-300">x402 Spec</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Whitepaper</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Audit</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-white/50">Connect</h4>
              <ul className="space-y-4 text-sm font-sans font-medium text-white/30">
                <li><a href="#" className="hover:text-white transition-colors duration-300">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">GitHub</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-white/[0.03] flex flex-col md:flex-row justify-between gap-6 text-[10px] font-sans font-bold text-white/20 uppercase tracking-[0.2em]">
          <span>&copy; 2024 Axiom Labs. All rights reserved.</span>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden font-sans antialiased selection:bg-white/20 selection:text-white">
      <FloatingNav />
      <HeroSection />
      <ManifestoSection />
      <ProtocolSteps />
      <FeaturesSection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}
