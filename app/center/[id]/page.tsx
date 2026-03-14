"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { members } from "@/data/members"
import MemberDetailsModal from "@/components/MemberDetailsModal"
import { 
  ArrowLeft, Search, Users, CreditCard, 
  CheckCircle2, AlertCircle, ExternalLink, Download 
} from "lucide-react"

export default function CenterPage() {
  const params = useParams()
  const router = useRouter()
  const centerId = Number(params.id)

  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [search, setSearch] = useState("")

  // Filter & Logic
  const centerMembers = members
    .filter(member => member.centerId === centerId)
    .filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.trustId.includes(search))
    .sort((a, b) => a.name.localeCompare(b.name))

  const totalPaid = centerMembers.filter(m => m.payment > 0).length
  const totalDue = centerMembers.length - totalPaid

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <button 
              onClick={() => router.back()}
              className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm transition-all"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
              Back to Centers
            </button>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Center <span className="text-blue-600">#{centerId}</span> Dashboard
            </h1>
            <p className="text-slate-500 font-medium">এখান থেকে সেন্টারের সকল মেম্বার এবং পেমেন্ট স্ট্যাটাস পরিচালনা করুন।</p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="মেম্বার খুঁজুন..."
                  className="bg-white border border-slate-200 pl-10 pr-4 py-3 rounded-2xl w-full md:w-64 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm"
                  onChange={(e) => setSearch(e.target.value)}
                />
             </div>
             <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
                <Download size={20} />
             </button>
          </div>
        </div>

        {/* Quick Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Members" value={centerMembers.length} icon={<Users />} color="blue" />
          <StatCard title="Total Paid" value={totalPaid} icon={<CheckCircle2 />} color="emerald" />
          <StatCard title="Total Due" value={totalDue} icon={<AlertCircle />} color="rose" />
        </div>

        {/* Members Table */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[11px] uppercase tracking-[0.2em] font-black border-b border-slate-50">
                  <th className="px-8 py-6">Trust ID</th>
                  <th className="px-8 py-6">Member Information</th>
                  <th className="px-8 py-6">Payment Status</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {centerMembers.map(member => (
                  <tr key={member.id} className="group hover:bg-blue-50/30 transition-all duration-300">
                    <td className="px-8 py-5">
                      <span className="font-mono text-[11px] font-bold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl border border-slate-200/50">
                        {member.trustId}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{member.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Verified Member</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter border ${
                        member.payment > 0 
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                          : "bg-rose-50 text-rose-600 border-rose-100"
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${member.payment > 0 ? "bg-emerald-500" : "bg-rose-500"} animate-pulse`} />
                        ৳{member.payment} — {member.payment > 0 ? "Paid" : "Due"}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button
                        onClick={() => setSelectedMember(member)}
                        className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-600 shadow-md shadow-slate-200 transition-all"
                      >
                        Details <ExternalLink size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <MemberDetailsModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  )
}

// Helper Component for Stats
function StatCard({ title, value, icon, color }: any) {
  const colors: any = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100"
  }
  return (
    <div className={`p-6 rounded-[2rem] border ${colors[color]} flex items-center justify-between shadow-sm hover:scale-[1.02] transition-transform duration-300`}>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">{title}</p>
        <h3 className="text-3xl font-black">{value}</h3>
      </div>
      <div className="p-4 bg-white/50 rounded-2xl shadow-inner">
        {icon}
      </div>
    </div>
  )
}