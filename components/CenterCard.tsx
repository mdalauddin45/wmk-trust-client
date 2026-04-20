"use client"

import { useRouter } from "next/navigation"
import { Building2, ArrowUpRight, MapPin } from "lucide-react"

export default function CenterCard({ id, name }: any) {
  const router = useRouter()

  const handleClick = () => {
    // ✅ ensure string নিরাপদভাবে pass হয়
    router.push(`/center/${String(id)}`)
  }

  return (
    <div
      onClick={handleClick}
      className="group relative bg-white border border-slate-100 p-6 rounded-[2rem] cursor-pointer transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-2 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full group-hover:bg-blue-600 transition-colors duration-500 opacity-50 group-hover:opacity-10"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-500">
            <Building2 className="text-white" size={26} />
          </div>
          <div className="p-2 bg-slate-50 rounded-full text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <ArrowUpRight size={18} />
          </div>
        </div>

        {/* Name */}
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
            Data Center Unit
          </p>
          <h3 className="font-black text-xl text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
            {name}
          </h3>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <MapPin size={14} className="text-blue-500" />
            <span className="text-xs font-medium">Active Node</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold uppercase tracking-tight">
              Online
            </span>
          </div>
        </div>
      </div>

      {/* Hover Line */}
      <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-500"></div>
    </div>
  )
}