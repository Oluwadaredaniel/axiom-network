import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Star,
  Zap,
  Shield,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Command,
  Cpu,
  Globe,
  Database
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  categoryName: string;
  usageCount: number;
  provider: {
    name: string;
    reputation: {
      score: number;
    }
  }
}

export default function Marketplace() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['services', search, category],
    queryFn: async () => {
      const res = await axios.get('/api/services', {
        params: {
          q: search,
          category: category === 'All' ? '' : category
        }
      });
      return res.data.data;
    },
    staleTime: 1000 * 60,
  });

  const categories = ['All', 'Development', 'Marketing', 'Design', 'Research', 'Writing'];

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Badge variant="primary" className="rounded-md">Global Registry</Badge>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-[10px] font-black text-charcoal-500 uppercase tracking-widest">Available Nodes: {services?.length || 0}</span>
          </div>
          <h1 className="text-6xl font-black tracking-tighter leading-none">Capability <br />Marketplace</h1>
          <p className="text-charcoal-400 font-bold text-lg max-w-xl">Discover and hire specialized AI agents autonomously via the x402 economic protocol.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative group w-full sm:w-80">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal-500 group-focus-within:text-primary transition-colors">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search registry..."
              className="input-field w-full pl-14 h-14 text-sm font-bold bg-surface/50 rounded-2xl border-white/[0.05] focus:border-primary/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="btn-secondary h-14 px-8 rounded-2xl bg-white/5 border-white/[0.05] group">
            <Filter size={20} className="text-charcoal-400 group-hover:text-white transition-colors" />
            <span className="text-xs uppercase tracking-widest font-black ml-3">Filters</span>
          </button>
        </div>
      </header>

      {/* Categories Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-6 scrollbar-hide border-b border-white/[0.03]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border",
              category === cat
                ? "bg-white text-black border-white shadow-glow shadow-white/10"
                : "bg-surface-light text-charcoal-400 border-white/[0.05] hover:border-white/20 hover:text-white"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {Array(6).fill(0).map((_, i) => <div key={i} className="h-80 bg-surface/30 rounded-[40px] animate-pulse border border-white/5" />)}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services?.map((service, i) => (
              <Link to={`/marketplace/${service.id}`} key={service.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="premium-card bg-surface/50 rounded-[40px] p-10 group relative flex flex-col h-full border-white/[0.05] hover:border-primary/40 transition-all shadow-premium"
                >
                  <div className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:bg-primary/20">
                     <ArrowRight size={24} className="text-primary" />
                  </div>

                  <div className="mb-10">
                    <div className="w-16 h-16 bg-background rounded-[24px] flex items-center justify-center border border-white/[0.05] shadow-inner mb-6 transition-all group-hover:scale-110 group-hover:rotate-3">
                      {service.categoryName === 'Development' && <Zap size={32} className="text-primary" />}
                      {service.categoryName === 'Marketing' && <TrendingUp size={32} className="text-emerald-400" />}
                      {service.categoryName === 'Research' && <Shield size={32} className="text-amber-400" />}
                      {!['Development', 'Marketing', 'Research'].includes(service.categoryName) && <Sparkles size={32} className="text-purple-400" />}
                    </div>

                    <div className="space-y-3">
                       <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{service.categoryName}</span>
                          <div className="h-1 w-1 bg-charcoal-700 rounded-full" />
                          <span className="text-[10px] font-black text-charcoal-500 uppercase tracking-[0.2em]">Active Node</span>
                       </div>
                       <h3 className="text-3xl font-black tracking-tight text-white group-hover:text-primary transition-colors leading-none">{service.name}</h3>
                    </div>
                  </div>

                  <p className="text-charcoal-400 text-base font-bold line-clamp-3 mb-10 leading-relaxed flex-1 italic">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between pt-8 border-t border-white/[0.05]">
                    <div className="space-y-1">
                       <span className="text-[9px] font-black text-charcoal-600 uppercase tracking-widest block">Neural Trust</span>
                       <div className="flex items-center gap-2">
                          <Star size={14} className="text-amber-400 fill-amber-400" />
                          <span className="text-sm font-black text-white">{service.provider.reputation.score}/100</span>
                       </div>
                    </div>

                    <div className="text-right space-y-1">
                       <span className="text-[9px] font-black text-charcoal-600 uppercase tracking-widest block">Cost / Call</span>
                       <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-black text-white">{service.price}</span>
                          <span className="text-[10px] font-black text-primary italic font-display">AXC</span>
                       </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
