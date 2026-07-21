import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Send, Loader2, ShieldCheck, Brain, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

const loginSchema = z.object({
  email: z.string().email('Invalid node identifier format'),
  password: z.string().min(6, 'Access secret must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await axios.post('/api/auth/login', data);
      localStorage.setItem('token', res.data.data.token);
      navigate('/dashboard');
      window.location.reload();
    } catch (err: any) {
      setError('root', { message: err.response?.data?.message || 'Invalid credentials' });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row overflow-hidden">
      {/* Brand Column */}
      <div className="hidden lg:flex w-[40%] bg-[#111113] p-16 flex-col justify-between relative overflow-hidden border-r border-white/5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[180px] -mr-64 -mt-64 rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-cyan/5 blur-[120px] -ml-32 -mb-32 rounded-full" />

        <Link to="/" className="flex items-center gap-4 relative z-10 group">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-glow shadow-primary/30 group-hover:rotate-6 transition-transform duration-500">
            <span className="text-white font-black text-2xl">A</span>
          </div>
          <span className="font-display font-black text-3xl tracking-tighter uppercase">AXIOM</span>
        </Link>

        <div className="relative z-10 space-y-10">
          <div className="flex items-center gap-4">
             <Badge variant="primary" className="px-5 py-1.5 rounded-xl text-[10px] font-black tracking-widest border-primary/30 bg-primary/5">Node Authorization</Badge>
          </div>
          <h2 className="text-8xl font-black leading-[0.85] tracking-tighter text-white">
            The Economic <br />
            <span className="text-primary italic">Identity</span> <br />
            for AI.
          </h2>
          <p className="text-charcoal-400 text-2xl max-w-md font-medium leading-relaxed tracking-tight">
            Authorize your controller node to settle x402 challenges and discover specialized capabilities.
          </p>
        </div>

        <div className="flex flex-col gap-8 relative z-10">
           <div className="h-px w-20 bg-white/10" />
           <div className="flex items-center gap-10">
              <div className="flex items-center gap-3 text-charcoal-500 font-black text-[10px] uppercase tracking-[0.2em]">
                 <ShieldCheck size={18} className="text-emerald-500 shadow-glow" /> AES-256 Protocol
              </div>
              <div className="flex items-center gap-3 text-charcoal-500 font-black text-[10px] uppercase tracking-[0.2em]">
                 <Brain size={18} className="text-primary" /> Autonomous Ready
              </div>
           </div>
        </div>
      </div>

      {/* Form Column */}
      <div className="flex-1 flex flex-col items-center justify-center p-10 md:p-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg space-y-12"
        >
          <div className="lg:hidden mb-12 flex justify-between items-center">
             <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-glow">A</div>
                <span className="font-display font-black text-xl tracking-tight uppercase">AXIOM</span>
             </Link>
             <Link to="/" className="text-charcoal-500 p-2"><ArrowLeft size={24} /></Link>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-black tracking-tight uppercase">Authorize</h1>
            <p className="text-charcoal-400 font-bold text-xl tracking-tight">Initialize your controller session to begin orchestration.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-[0.3em] text-charcoal-500 ml-2">Node Identifier (Email)</label>
              <input
                type="email"
                {...register('email')}
                className={cn(
                  "w-full h-20 bg-surface/50 border-2 rounded-[24px] px-8 text-xl font-bold focus:outline-none transition-all text-white placeholder:text-charcoal-700 shadow-premium",
                  errors.email ? "border-rose-500/50 focus:border-rose-500" : "border-white/[0.05] focus:border-primary/50"
                )}
                placeholder="node-01@axiom.network"
              />
              {errors.email && <p className="text-rose-400 text-xs font-bold px-2 mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center px-2">
                <label className="text-[11px] font-black uppercase tracking-[0.3em] text-charcoal-500">Access Secret</label>
              </div>
              <input
                type="password"
                {...register('password')}
                className={cn(
                  "w-full h-20 bg-surface/50 border-2 rounded-[24px] px-8 text-xl font-bold focus:outline-none transition-all text-white placeholder:text-charcoal-700 shadow-premium",
                  errors.password ? "border-rose-500/50 focus:border-rose-500" : "border-white/[0.05] focus:border-primary/50"
                )}
                placeholder="••••••••••••"
              />
              {errors.password && <p className="text-rose-400 text-xs font-bold px-2 mt-1">{errors.password.message}</p>}
            </div>

            {errors.root && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-rose-500/10 text-rose-400 rounded-3xl text-sm font-bold border border-rose-500/20 shadow-inner flex items-center gap-4"
              >
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                {errors.root.message}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-20 bg-white text-black rounded-[28px] font-black text-xl uppercase tracking-widest flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-glow shadow-white/10 disabled:opacity-20"
            >
              {isSubmitting ? <Loader2 size={32} className="animate-spin" strokeWidth={3} /> : <>Initiate Session <Send size={24} strokeWidth={3} /></>}
            </button>
          </form>

          <div className="pt-10 text-center border-t border-white/5">
            <p className="text-charcoal-400 text-lg font-medium">
              New node operator? <Link to="/register" className="text-primary hover:text-white font-black underline underline-offset-8 transition-colors decoration-2">Register Node</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
