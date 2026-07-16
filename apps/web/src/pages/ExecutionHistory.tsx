import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { History, CheckCircle2, XCircle, Clock, ChevronRight, Search, Filter } from 'lucide-react'

export default function ExecutionHistory() {
  const { data: history, isLoading } = useQuery({
    queryKey: ['executions'],
    queryFn: async () => {
      const res = await axios.get('/api/conductor/history')
      return res.data.data
    }
  })

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-charcoal rounded-lg flex items-center justify-center text-white font-bold">A</div>
            <span className="font-bold tracking-tight">AXIOM HISTORY</span>
          </Link>
          <Link to="/dashboard" className="text-sm font-bold text-gray-500 hover:text-charcoal transition-colors">Dashboard</Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-charcoal flex items-center gap-3">
              <History className="text-gray-400" /> Job History
            </h1>
            <p className="text-gray-500 font-medium">Audit logs for every orchestration event.</p>
          </div>

          <div className="flex items-center gap-3">
             <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Filter jobs..." className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none" />
             </div>
             <button className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <Filter size={18} className="text-gray-600" />
             </button>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm">
          {isLoading ? (
            <div className="p-20 text-center animate-pulse text-gray-400 font-bold">Loading execution logs...</div>
          ) : (history && history.length > 0) ? (
            <div className="divide-y divide-gray-50">
               {history.map((job: any) => (
                 <div key={job.id} className="p-8 flex flex-col md:flex-row md:items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="flex items-start gap-5 mb-4 md:mb-0">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${job.status === 'COMPLETED' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                          {job.status === 'COMPLETED' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                       </div>
                       <div>
                          <h3 className="font-black text-charcoal text-lg group-hover:text-primary transition-colors line-clamp-1">{job.goal}</h3>
                          <div className="flex items-center gap-4 mt-1">
                             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{new Date(job.createdAt).toLocaleDateString()}</span>
                             <span className="text-gray-200">•</span>
                             <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
                                <Clock size={12} /> {job.duration}ms
                             </div>
                             <span className="text-gray-200">•</span>
                             <span className="text-xs font-black text-primary italic">{job.totalCost} AXC</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-6">
                       <div className="flex -space-x-2">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-black">AI</div>
                          ))}
                       </div>
                       <ChevronRight className="text-gray-200 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                 </div>
               ))}
            </div>
          ) : (
            <div className="p-32 text-center">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                  <History size={24} />
               </div>
               <p className="text-gray-400 font-bold">No execution history found.</p>
               <Link to="/conductor" className="text-primary text-sm font-black mt-4 inline-block hover:underline">Run your first job</Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
