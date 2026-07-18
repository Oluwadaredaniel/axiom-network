import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, Code, ShieldCheck, Loader2, Cpu } from 'lucide-react';
import axios from 'axios';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'USER' | 'DEVELOPER'>('USER');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/auth/register', { email, password, name, role });
      localStorage.setItem('token', res.data.data.token);
      navigate('/dashboard');
      window.location.reload();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      <div className="lg:w-1/3 bg-surface border-b lg:border-b-0 lg:border-r border-white/5 p-12 flex flex-col justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-glow shadow-primary/20">A</div>
          <span className="font-display font-black text-xl tracking-tight uppercase">AXIOM</span>
        </Link>

        <div className="space-y-12">
          <div className="space-y-4">
             <h2 className="text-4xl font-black tracking-tight leading-none">Identify your <br />Node type.</h2>
          </div>
          <div className="space-y-4">
            {[
              { id: 'USER', label: 'Controller', desc: 'Deploy agents and hire capabilities.', icon: Cpu },
              { id: 'DEVELOPER', label: 'Provider', desc: 'Monetize AI and settle receipts.', icon: Code },
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id as any)}
                className={cn(
                  "w-full p-6 rounded-[32px] border-2 text-left transition-all",
                  role === r.id ? "border-primary bg-primary/5" : "border-transparent bg-white/5"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-4",
                  role === r.id ? "bg-primary text-white" : "bg-white/5 text-charcoal-500"
                )}>
                  <r.icon size={24} />
                </div>
                <h4 className="text-lg font-black">{r.label}</h4>
                <p className="text-xs text-charcoal-500 mt-1">{r.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 text-charcoal-500 font-black text-[10px] uppercase">
           <ShieldCheck size={16} className="text-emerald-500" /> Identity Ready
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-24 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md space-y-10"
        >
          <div className="space-y-2">
            <Badge variant="primary">Network Expansion</Badge>
            <h1 className="text-4xl font-black">Register Node</h1>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <input
              type="text"
              required
              className="input-field w-full"
              placeholder="Node Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              required
              className="input-field w-full"
              placeholder="Email Endpoint"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              className="input-field w-full"
              placeholder="Security Key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

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
              {loading ? <Loader2 size={24} className="animate-spin" /> : <>Join Network <Send size={18} /></>}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
