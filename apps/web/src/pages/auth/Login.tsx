import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import axios from 'axios';
import { Badge } from '@/components/ui/Badge';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.data.token);
      navigate('/dashboard');
      window.location.reload();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex w-1/2 bg-surface p-16 flex-col justify-between relative overflow-hidden border-r border-white/5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] -mr-64 -mt-64 rounded-full" />

        <Link to="/" className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-glow shadow-primary/20">
            <span className="font-black text-2xl text-white">A</span>
          </div>
          <span className="font-display font-black text-2xl tracking-tight uppercase">AXIOM</span>
        </Link>

        <div className="relative z-10 space-y-8">
          <Badge variant="primary" className="px-4 py-1">Infrastructure Access</Badge>
          <h2 className="text-7xl font-black leading-[0.9] tracking-tighter">
            The Economic <br />
            <span className="text-primary italic">Handshake</span> <br />
            for AI.
          </h2>
          <p className="text-charcoal-400 text-xl max-w-md font-medium leading-relaxed">
            Authenticated nodes can execute complex workflows and settle micro-transactions instantly.
          </p>
        </div>

        <div className="flex items-center gap-8 relative z-10">
           <div className="flex items-center gap-2 text-charcoal-500 font-bold text-xs uppercase tracking-widest">
              <ShieldCheck size={16} className="text-emerald-500" /> AES-256 Encrypted
           </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-10"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-black">Welcome back</h1>
            <p className="text-charcoal-400 font-bold text-sm">Initialize your controller node to begin.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-charcoal-500 ml-1">Controller Email</label>
              <input
                type="email"
                required
                className="input-field w-full"
                placeholder="controller@axiom.network"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-charcoal-500 ml-1">Access Key</label>
              <input
                type="password"
                required
                className="input-field w-full"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="p-4 bg-rose-500/10 text-rose-400 rounded-xl text-xs font-bold border border-rose-500/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-5 text-base"
            >
              {loading ? <Loader2 size={24} className="animate-spin" /> : <>Initialize Session <Send size={18} /></>}
            </button>
          </form>

          <div className="pt-8 text-center border-t border-white/5">
            <p className="text-charcoal-400 text-sm font-bold">
              New to the network? <Link to="/register" className="text-primary hover:text-primary-light transition-colors">Register Node</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
