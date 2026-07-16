import { Link } from 'react-router-dom'
import { Shield, Users, CreditCard, LayoutGrid, Activity, Search, ArrowUpRight } from 'lucide-react'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
       <nav className="border-b border-gray-100 bg-white h-16 flex items-center justify-between px-8">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
             <span className="font-bold tracking-tight">AXIOM ADMIN</span>
          </div>
          <Link to="/dashboard" className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-charcoal transition-colors">Exit Admin</Link>
       </nav>

       <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-10">
          <div className="mb-10">
             <h1 className="text-3xl font-black text-charcoal">Global Governance</h1>
             <p className="text-gray-500 font-medium">Platform-wide oversight for the Axiom network.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
             {[
               { label: 'Total Users', value: '1,240', icon: Users, color: 'text-blue-500' },
               { label: 'Active Services', value: '86', icon: LayoutGrid, color: 'text-purple-500' },
               { label: 'Volume (24h)', value: '142k AXC', icon: CreditCard, color: 'text-green-500' },
               { label: 'Node Load', value: '12%', icon: Activity, color: 'text-amber-500' },
             ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                   <stat.icon className={`${stat.color} mb-3`} size={20} />
                   <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">{stat.label}</span>
                   <p className="text-2xl font-black text-charcoal">{stat.value}</p>
                </div>
             ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                   <h3 className="font-black text-sm uppercase tracking-widest text-gray-400">Recent Registrations</h3>
                   <div className="relative">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" placeholder="Search users..." className="pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs focus:outline-none" />
                   </div>
                </div>
                <div className="p-10 text-center text-gray-400 text-sm font-bold italic">
                   User management console pending synchronization...
                </div>
             </div>

             <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                   <h3 className="font-black text-sm uppercase tracking-widest text-gray-400">Top Earning Providers</h3>
                </div>
                <div className="p-10 text-center text-gray-400 text-sm font-bold italic">
                   Economic distribution logs pending synchronization...
                </div>
             </div>
          </div>

          <div className="mt-8 bg-charcoal text-white p-8 rounded-[32px] flex items-center justify-between">
             <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                   <Shield size={24} className="text-primary" />
                </div>
                <div>
                   <h4 className="text-lg font-black">Platform Security Guard</h4>
                   <p className="text-gray-400 text-sm font-medium">Automated threat detection and anomaly isolation is ACTIVE.</p>
                </div>
             </div>
             <button className="bg-white text-charcoal px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-gray-100 transition-all">
                System Health Audit <ArrowUpRight size={14} />
             </button>
          </div>
       </main>
    </div>
  )
}
