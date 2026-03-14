"use client"

import { useState } from "react"
import { 
  User, MapPin, Phone, ExternalLink, 
  Search, Filter, MoreHorizontal, ArrowUpDown 
} from "lucide-react"
import MemberDetailsModal from "./MemberDetailsModal"

const members = [
  {
    id: 1,
    name: "Abdur Rahman",
    trustId: "WMK-1001",
    address: "Chattogram",
    phone: "01700000000",
    status: "Active",
    payments: [
      { month: "Jan", amount: 500 },
      { month: "Feb", amount: 500 }
    ]
  },
  {
    id: 2,
    name: "Maria Sultana",
    trustId: "WMK-1002",
    address: "Dhaka",
    phone: "01800000000",
    status: "Pending",
    payments: [
      { month: "Jan", amount: 500 },
      { month: "Feb", amount: 0 }
    ]
  }
]

export default function MemberTable() {
  const [selected, setSelected] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const sortedMembers = [...members]
    .filter(m => 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.trustId.includes(searchTerm)
    )
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="space-y-6">
      
      {/* --- TABLE HEADER & SEARCH --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="মেম্বার বা আইডি খুঁজুন..."
            className="w-full bg-white border border-slate-200 pl-11 pr-4 py-3 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Filter size={16} /> Filter
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20">
            + New Member
          </button>
        </div>
      </div>

      {/* --- MAIN TABLE CONTAINER --- */}
      <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-50 text-slate-400 text-[11px] uppercase tracking-widest font-black">
                <th className="px-8 py-6 flex items-center gap-2 cursor-pointer hover:text-blue-600">
                  Member Detail <ArrowUpDown size={12} />
                </th>
                <th className="px-8 py-6">Trust ID</th>
                <th className="px-8 py-6">Location</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Action</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {sortedMembers.map((member) => (
                <tr key={member.id} className="group hover:bg-blue-50/40 transition-all duration-300">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 flex items-center justify-center font-black text-lg border border-blue-100/50 shadow-sm group-hover:scale-110 transition-transform">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                          {member.name}
                        </p>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <Phone size={12}/> {member.phone}
                        </p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-8 py-5">
                    <span className="font-mono text-[11px] font-bold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl tracking-tighter border border-slate-200/50">
                      {member.trustId}
                    </span>
                  </td>
                  
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
                      <MapPin size={14} className="text-blue-500" /> {member.address}
                    </div>
                  </td>
                  
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                      member.status === 'Active' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                        : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`}></span>
                      {member.status || 'Active'}
                    </span>
                  </td>
                  
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => setSelected(member)}
                        className="bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-blue-600 transition-all shadow-md shadow-slate-200"
                      >
                        View Profile
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 rounded-xl transition-all">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- EMPTY STATE --- */}
        {sortedMembers.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <User className="text-slate-200" size={32} />
            </div>
            <p className="text-slate-400 font-bold tracking-tight">কোন মেম্বার পাওয়া যায়নি</p>
            <p className="text-xs text-slate-300 mt-1">দয়া করে সঠিক নাম বা আইডি দিয়ে পুনরায় চেষ্টা করুন</p>
          </div>
        )}
      </div>
      
      {/* Modal Integration */}
      <MemberDetailsModal
        member={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  )
}