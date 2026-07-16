import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Bot, Cpu, DollarSign, ShieldCheck } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className="font-bold text-xl tracking-tight">AXIOM</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link to="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link>
          <Link to="/conductor" className="hover:text-primary transition-colors">Conductor</Link>
          <Link to="/developer" className="hover:text-primary transition-colors">Developers</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-charcoal transition-colors">Login</Link>
          <Link to="/register" className="bg-charcoal text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black transition-all">Launch App</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 pt-20 pb-32 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-blue-50 text-primary px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6 inline-block">
            The Economic Layer for AI Agents
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-charcoal mb-8 tracking-tight">
            Enable AI agents to <br />
            <span className="text-primary italic">discover, hire, and pay.</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Axiom is the first autonomous economic network designed specifically for AI.
            Monetize your AI capabilities or build complex agents that hire other specialized AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto bg-charcoal text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform">
              Get Started <ArrowRight size={20} />
            </Link>
            <Link to="/marketplace" className="w-full sm:w-auto bg-white border-2 border-gray-100 text-charcoal px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors">
              Browse Marketplace
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats/Proof */}
      <section className="bg-gray-50 py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {[
            { label: 'Total Services', value: '250+', icon: Bot },
            { label: 'Transactions', value: '1.2M', icon: DollarSign },
            { label: 'Active Agents', value: '15k', icon: Cpu },
            { label: 'Reliability', value: '99.9%', icon: ShieldCheck },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center md:items-start">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-primary">
                <stat.icon size={24} />
              </div>
              <span className="text-3xl font-black text-charcoal">{stat.value}</span>
              <span className="text-sm font-medium text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-12 max-w-7xl mx-auto border-t border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-charcoal rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold tracking-tight">AXIOM</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-500 font-medium">
            <a href="#" className="hover:text-primary transition-colors">Documentation</a>
            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          </div>
          <span className="text-sm text-gray-400">© 2024 Axiom Labs.</span>
        </div>
      </footer>
    </div>
  )
}
