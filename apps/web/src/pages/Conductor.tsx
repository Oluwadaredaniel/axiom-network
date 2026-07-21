import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Loader2,
  Receipt,
  Wallet,
  ArrowRight,
  ShieldCheck,
  Brain,
  Database,
  Zap,
  Check,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import axios from 'axios';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

interface ExecutionResult {
  summary: string;
  servicesUsed: string[];
  payments: {
    service: string;
    cost: number;
    tx: string;
  }[];
  cost: number;
  result: string[];
  executionId: string;
}

const ANIMATION_STEPS = [
  { at: 1500, label: 'Scanning capability registry for optimal providers...' },
  { at: 3000, label: 'Evaluating reputation and real-time pricing...' },
  { at: 4500, label: 'Settling x402 payment challenges autonomously...' },
  { at: 6000, label: 'Executing capabilities and aggregating outputs...' },
  { at: 7500, label: 'Finalizing on-ledger settlement...' },
];

export default function Conductor() {
  const [goal, setGoal] = useState('');
  const [status, setStatus] = useState<'idle' | 'executing' | 'completed' | 'failed'>('idle');
  const [execution, setExecution] = useState<ExecutionResult | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState('');
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const scheduleStep = useCallback((delay: number, label: string) => {
    const id = setTimeout(() => {
      if (mountedRef.current) setSteps(s => [...s, label]);
    }, delay);
    timeoutsRef.current.push(id);
  }, []);

  const runExecution = async () => {
    if (!goal) return;
    setStatus('executing');
    setExecution(null);
    setError('');
    setSteps(['Initializing neural orchestrator...', 'Decomposing complex goal into capabilities...']);

    ANIMATION_STEPS.forEach(s => scheduleStep(s.at, s.label));

    try {
      const res = await axios.post('/api/conductor/execute', { goal });
      if (!mountedRef.current) return;

      scheduleStep(9000, 'Execution successful. Achievement delivered.');
      setTimeout(() => {
        if (mountedRef.current) {
          setExecution(res.data.data);
          setStatus('completed');
        }
      }, 10000);
    } catch (err: any) {
      if (!mountedRef.current) return;
      clearTimeouts();
      setError(err.response?.data?.message || 'Execution failed. Insufficient balance or service unavailable.');
      setSteps(s => [...s, 'Autonomous execution failed. Initiating recovery...']);
      setTimeout(() => {
        if (mountedRef.current) setStatus('failed');
      }, 1500);
    }
  };

  const reset = () => {
    clearTimeouts();
    setStatus('idle');
    setExecution(null);
    setSteps([]);
    setError('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Badge variant="success" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Production Ready</Badge>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-[10px] font-black text-charcoal-500 uppercase tracking-widest">Protocol: Axiom v1.2</span>
          </div>
          <h1 className="text-6xl font-black tracking-tighter leading-none">Neural <br />Conductor</h1>
          <p className="text-charcoal-400 font-bold text-lg max-w-xl leading-relaxed">Coordinate multi-agent workflows with a single prompt. Axiom plans, hires, and pays specialized AI autonomously.</p>
        </div>
        <div className="hidden lg:flex items-center gap-4 p-6 bg-surface/50 rounded-[32px] border border-white/[0.05] shadow-inner">
           <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Brain size={24} className="text-primary animate-pulse" />
           </div>
           <div className="space-y-0.5">
              <p className="text-[10px] font-black text-charcoal-500 uppercase tracking-widest">Network Load</p>
              <p className="text-sm font-black text-white">42.8 TFLOPS</p>
           </div>
        </div>
      </header>

      <main className="min-h-[600px] flex flex-col">
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-12 py-20 relative overflow-hidden rounded-[60px] bg-surface/20 border border-white/[0.02]"
            >
              <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full" />

              <div className="space-y-6 relative z-10">
                <h2 className="text-6xl font-black tracking-tighter text-white">Define your goal.</h2>
                <p className="text-charcoal-500 font-bold text-xl max-w-lg mx-auto leading-relaxed">
                  Axiom will build a dynamic agent network to execute your request in real-time.
                </p>
              </div>

              <div className="w-full max-w-3xl relative group z-10">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent-cyan rounded-[42px] blur opacity-20 group-focus-within:opacity-40 transition-all duration-500" />
                <div className="relative bg-background border border-white/[0.08] rounded-[40px] shadow-premium p-10 group-focus-within:border-primary/50 transition-all">
                   <textarea
                    placeholder="e.g. Build me a premium landing page for my AI coffee brand. Include branding ideas, high-conversion copy, and full SEO analysis."
                    className="w-full bg-transparent text-2xl font-bold focus:outline-none h-48 resize-none placeholder:text-charcoal-800 text-white tracking-tight"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    onKeyDown={(e) => {
                       if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) runExecution();
                    }}
                  />
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/[0.05]">
                     <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                           <span className="text-[10px] font-black text-charcoal-500 uppercase tracking-widest">x402 Autopay ON</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 bg-primary rounded-full" />
                           <span className="text-[10px] font-black text-charcoal-500 uppercase tracking-widest">Global Registry</span>
                        </div>
                     </div>
                     <button
                       onClick={runExecution}
                       disabled={!goal}
                       className="bg-white text-black h-16 px-10 rounded-[20px] font-black text-lg flex items-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-glow shadow-white/20 disabled:opacity-20 disabled:grayscale"
                     >
                       Initiate Mission <Send size={24} strokeWidth={3} />
                     </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 relative z-10">
                {['Security Audit', 'Market Analysis', 'Brand Package', 'SEO Optimization'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setGoal(prev => prev ? prev + ' ' + tag : tag)}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-[11px] font-black text-charcoal-400 hover:text-white transition-all border border-white/[0.05] uppercase tracking-widest"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {status === 'executing' && (
            <motion.div
              key="executing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16 py-10 flex-1 flex flex-col items-center"
            >
              <div className="flex flex-col items-center justify-center text-center space-y-8">
                <div className="relative">
                   <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
                   <div className="w-40 h-40 border-[6px] border-white/5 border-t-primary rounded-full animate-spin duration-[2000ms]" />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <Brain size={60} className="text-primary animate-pulse" />
                   </div>
                </div>
                <div className="space-y-3">
                   <h2 className="text-5xl font-black tracking-tighter uppercase">Orchestrating Workflow</h2>
                   <div className="flex items-center justify-center gap-4 px-6 py-2 bg-primary/10 rounded-2xl border border-primary/20">
                      <span className="text-xs font-mono text-primary font-bold tracking-widest uppercase truncate max-w-md">Goal: "{goal}"</span>
                   </div>
                </div>
              </div>

              <div className="max-w-2xl mx-auto w-full space-y-6">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      "flex items-center gap-6 p-6 rounded-[32px] border transition-all duration-500",
                      i === steps.length - 1
                        ? "bg-primary/5 border-primary/40 shadow-glow shadow-primary/5 scale-105"
                        : "bg-surface/30 border-white/5 opacity-40 grayscale"
                    )}
                  >
                    <div className={cn(
                      "w-14 h-14 rounded-[20px] flex items-center justify-center transition-all shadow-inner",
                      i === steps.length - 1 ? "bg-primary text-white" : "bg-emerald-500/20 text-emerald-400"
                    )}>
                      {i === steps.length - 1 ? <Loader2 size={24} className="animate-spin" strokeWidth={3} /> : <Check size={28} strokeWidth={4} />}
                    </div>
                    <span className={cn(
                      "text-lg font-black tracking-tight",
                      i === steps.length - 1 ? "text-white" : "text-charcoal-500"
                    )}>
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

            {status === 'failed' && (
              <motion.div
                key="failed"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center space-y-10 py-20"
              >
                <div className="w-28 h-28 bg-rose-500/10 rounded-[32px] flex items-center justify-center border border-rose-500/20">
                  <AlertTriangle size={56} className="text-rose-400" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-5xl font-black tracking-tighter uppercase">Mission Failed</h2>
                  <p className="text-charcoal-400 font-bold text-xl max-w-lg mx-auto leading-relaxed">{error}</p>
                </div>
                <div className="flex items-center gap-6">
                  <button
                    onClick={runExecution}
                    className="bg-white text-black h-16 px-10 rounded-[28px] font-black text-sm uppercase tracking-widest flex items-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-glow shadow-white/20"
                  >
                    <RefreshCw size={20} strokeWidth={3} /> Retry Mission
                  </button>
                  <button
                    onClick={reset}
                    className="btn-secondary h-16 px-10 rounded-[28px] text-sm font-black uppercase tracking-widest"
                  >
                    New Goal
                  </button>
                </div>
              </motion.div>
            )}

            {status === 'completed' && execution && (
            <motion.div
              key="completed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12 flex-1"
            >
              <div className="bg-surface/40 backdrop-blur-3xl p-12 rounded-[60px] border border-emerald-500/20 shadow-glow shadow-emerald-500/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[120px] -mr-40 -mt-40 animate-pulse" />
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 relative z-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-black">
                          <Check size={24} strokeWidth={4} />
                       </div>
                       <h2 className="text-5xl font-black text-white tracking-tighter">Mission Success</h2>
                    </div>
                    <p className="text-emerald-400/80 font-bold text-2xl max-w-2xl leading-relaxed italic">{execution.summary}</p>
                  </div>
                  <div className="bg-black/60 backdrop-blur-xl p-8 rounded-[40px] border border-white/10 flex flex-col items-center min-w-[260px] shadow-premium group hover:border-primary/50 transition-colors">
                    <span className="text-[11px] font-black text-charcoal-500 uppercase tracking-[0.3em] mb-3">Economic Settlement</span>
                    <div className="flex items-baseline gap-3">
                       <span className="text-6xl font-black text-white group-hover:text-primary transition-colors">{execution.cost}</span>
                       <span className="text-2xl font-bold text-primary italic font-display uppercase tracking-tight">AXC</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Achievement Output */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="premium-card bg-surface/30 rounded-[50px] p-12 space-y-12 min-h-[600px] border-white/[0.04]">
                    <div className="flex items-center justify-between mb-4">
                       <div className="flex items-center gap-4">
                          <Badge variant="primary" className="h-8 px-4">Neural Output</Badge>
                          <h3 className="text-2xl font-black uppercase tracking-tighter">Aggregated Intelligence</h3>
                       </div>
                       <button className="p-3 bg-white/5 rounded-xl border border-white/10 text-charcoal-400 hover:text-white transition-all">
                          <Receipt size={20} />
                       </button>
                    </div>
                    <div className="space-y-10">
                      {execution.result.map((res, i) => (
                        <motion.div
                           key={i}
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: i * 0.2 }}
                           className="group relative"
                        >
                           <div className="absolute -left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 to-transparent group-hover:from-primary transition-colors rounded-full" />
                           <div className="bg-background/80 p-10 rounded-[40px] border border-white/[0.03] group-hover:border-white/10 group-hover:bg-background transition-all shadow-inner relative overflow-hidden">
                              <div className="absolute top-0 right-0 p-8 text-primary/5 group-hover:text-primary/10 transition-colors">
                                 <Zap size={80} fill="currentColor" />
                              </div>
                              <p className="text-white/90 font-medium leading-relaxed text-xl relative z-10 whitespace-pre-line">
                                {res}
                              </p>
                           </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Economic Sidebar */}
                <div className="space-y-8">
                  <div className="premium-card bg-surface/50 rounded-[40px] p-10 space-y-8 border-white/[0.05]">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-charcoal-500 flex items-center gap-3">
                       <Database size={16} className="text-primary" /> Autonomous Ledger
                    </h3>
                    <div className="space-y-6">
                      {execution.payments.map((p, i) => (
                        <div key={i} className="space-y-3 group">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-black text-white group-hover:text-primary transition-colors">{p.service}</span>
                            <span className="text-sm font-black text-primary">{p.cost} AXC</span>
                          </div>
                          <div className="flex items-center gap-3 text-[10px] font-mono text-charcoal-600 bg-background/50 p-3 rounded-2xl border border-white/[0.03] break-all group-hover:border-white/10 transition-all">
                             <ShieldCheck size={12} className="text-emerald-500 shrink-0" />
                             <span className="truncate">{p.tx}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-charcoal-950 p-10 rounded-[48px] border border-white/5 space-y-8 relative overflow-hidden group shadow-premium"
                  >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                           <Wallet size={20} className="text-primary" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-white">Economic Node</span>
                      </div>
                      <Badge variant="success">Synchronized</Badge>
                    </div>
                    <p className="text-sm text-charcoal-500 font-bold leading-relaxed relative z-10">
                      All capabilities were secured via x402 settlement. Receipts are cryptographically verified and recorded on-ledger.
                    </p>
                    <button
                      onClick={reset}
                      className="w-full bg-white text-black h-14 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all relative z-10 active:scale-95"
                    >
                      New Mission <ArrowRight size={16} className="ml-2" />
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
