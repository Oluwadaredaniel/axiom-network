import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Send, Code, ShieldCheck, Loader2, Cpu, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

const registerSchema = z.object({
  name: z.string().min(2, 'Operator name must be at least 2 characters'),
  email: z.string().email('Invalid email endpoint format'),
  password: z.string().min(6, 'Security keyphrase must be at least 6 characters'),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const [role, setRole] = useState<'USER' | 'DEVELOPER'>('USER');
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await axios.post('/api/auth/register', { ...data, role });
      localStorage.setItem('token', res.data.data.token);
      navigate('/dashboard');
      window.location.reload();
    } catch (err: any) {
      setError('root', { message: err.response?.data?.message || 'Registration failed' });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row overflow-hidden">
      {/* Sidebar Selector */}
      <div className="lg:w-[35%] bg-[#111113] border-b lg:border-b-0 lg:border-r border-white/5 p-12 lg:p-20 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-primary/5 blur-[120px] -z-0" />

        <Link to="/" className="flex items-center gap-4 relative z-10 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-glow shadow-primary/20 transition-all group-hover:rotate-6">
            <span className="text-white font-black text-xl">A</span>
          </div>
          <span className="font-display font-black text-2xl tracking-tighter uppercase">AXIOM</span>
        </Link>

        <div className="space-y-16 relative z-10 my-20 lg:my-0">
          <div className="space-y-4">
             <h2 className="text-6xl font-black tracking-tighter leading-[0.9] text-white uppercase">Define <br />your Role.</h2>
             <p className="text-charcoal-500 font-bold text-lg max-w-xs">Select the primary economic function of your autonomous account node.</p>
          </div>

          <div className="space-y-6">
            {[
              { id: 'USER', label: 'Controller Node', desc: 'Deploy agents, plan missions, and hire specialized capabilities.', icon: Cpu },
              { id: 'DEVELOPER', label: 'Provider Node', desc: 'Host AI modules, monetize intelligence, and settle receipts.', icon: Code },
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id as any)}
                className={cn(
                  "w-full p-8 rounded-[40px] border-2 text-left transition-all duration-500 group relative overflow-hidden",
                  role === r.id
                    ? "border-primary bg-primary/5 shadow-glow shadow-primary/10 scale-[1.02]"
                    : "border-transparent bg-white/5 hover:bg-white/10"
                )}
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all shadow-inner",
                  role === r.id ? "bg-primary text-white scale-110 shadow-glow" : "bg-white/5 text-charcoal-500"
                )}>
                  <r.icon size={32} strokeWidth={2.5} />
                </div>
                <h4 className={cn(
                  "text-2xl font-black tracking-tight uppercase leading-none",
                  role === r.id ? "text-white" : "text-charcoal-400"
                )}>{r.label}</h4>
                <p className="text-sm font-bold text-charcoal-500 mt-2 leading-relaxed">{r.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-charcoal-600 font-black text-[10px] uppercase tracking-[0.3em] relative z-10">
           <ShieldCheck size={18} className="text-emerald-500" /> Decentralized Identity Ready
        </div>
      </div>

      {/* Main Registration Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-24 relative overflow-hidden bg-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full -z-10" />

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg space-y-12"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
               <Badge variant="primary" className="px-6 py-1.5 uppercase tracking-widest text-[10px]">Network Expansion</Badge>
               <Link to="/login" className="text-charcoal-600 hover:text-white transition-colors"><ArrowLeft size={24} /></Link>
            </div>
            <h1 className="text-5xl font-black tracking-tight uppercase">Register Node</h1>
            <p className="text-charcoal-400 font-bold text-xl tracking-tight leading-relaxed">Join the first standardized economic protocol for the autonomous era.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-[0.3em] text-charcoal-500 ml-2">Operator Name</label>
              <input
                type="text"
                {...register('name')}
                className={cn(
                  "w-full h-20 bg-surface/50 border-2 rounded-[24px] px-8 text-xl font-bold focus:outline-none transition-all text-white placeholder:text-charcoal-700 shadow-premium",
                  errors.name ? "border-rose-500/50 focus:border-rose-500" : "border-white/[0.05] focus:border-primary/50"
                )}
                placeholder="Axiom Controller #1"
              />
              {errors.name && <p className="text-rose-400 text-xs font-bold px-2 mt-1">{errors.name.message}</p>}
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-[0.3em] text-charcoal-500 ml-2">Email Endpoint</label>
              <input
                type="email"
                {...register('email')}
                className={cn(
                  "w-full h-20 bg-surface/50 border-2 rounded-[24px] px-8 text-xl font-bold focus:outline-none transition-all text-white placeholder:text-charcoal-700 shadow-premium",
                  errors.email ? "border-rose-500/50 focus:border-rose-500" : "border-white/[0.05] focus:border-primary/50"
                )}
                placeholder="controller@yourdomain.ai"
              />
              {errors.email && <p className="text-rose-400 text-xs font-bold px-2 mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-[0.3em] text-charcoal-500 ml-2">Security Keyphrase</label>
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-rose-500/10 text-rose-400 rounded-[28px] text-sm font-bold border border-rose-500/20 flex items-center gap-4"
              >
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                {errors.root.message}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-20 bg-white text-black rounded-[32px] font-black text-xl uppercase tracking-widest flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-glow shadow-white/10 disabled:opacity-20"
            >
              {isSubmitting ? <Loader2 size={32} className="animate-spin" strokeWidth={3} /> : <>Generate Identity <Send size={24} strokeWidth={3} /></>}
            </button>
          </form>

          <div className="pt-10 text-center border-t border-white/5">
            <p className="text-charcoal-400 text-lg font-medium">
              Already in the network? <Link to="/login" className="text-primary hover:text-white font-black underline underline-offset-8 transition-colors decoration-2">Sign In</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
