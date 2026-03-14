"use client"

import { X, Phone, MapPin, ShieldCheck, CreditCard, Calendar, User } from "lucide-react"

export default function MemberDetailsModal({ member, onClose }: any) {
  if (!member) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-[550px] rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header Section (Gradient Background) */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl transform -rotate-3 group-hover:rotate-0 transition-transform">
              <span className="text-3xl font-black text-blue-600 uppercase">
                {member.name.charAt(0)}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-black tracking-tight">{member.name}</h2>
                <ShieldCheck size={18} className="text-blue-300" />
              </div>
              <p className="text-blue-100 font-mono text-sm bg-blue-500/30 w-fit px-3 py-0.5 rounded-lg border border-blue-400/30">
                {member.trustId}
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-8">
          
          {/* Contact Info Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <MapPin size={12} /> Address
              </p>
              <p className="text-slate-700 font-bold">{member.address}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-end gap-1">
                <Phone size={12} /> Contact
              </p>
              <p className="text-slate-700 font-bold">{member.phone}</p>
            </div>
          </div>

          {/* Payment Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-black text-slate-800 flex items-center gap-2">
                <CreditCard size={18} className="text-blue-600" /> Payment History
              </h3>
              <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md">
                RECENT TRANSACTIONS
              </span>
            </div>

            <div className="max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-3">
                {member.payments?.map((p: any, i: number) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-white transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-xl shadow-sm group-hover:text-blue-600 transition-colors">
                        <Calendar size={16} />
                      </div>
                      <span className="font-bold text-slate-700">{p.month}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-slate-900">৳{p.amount}</span>
                      <p className="text-[10px] font-bold text-emerald-500 uppercase">Successful</p>
                    </div>
                  </div>
                ))}

                {(!member.payments || member.payments.length === 0) && (
                  <div className="py-10 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                    <p className="text-slate-400 text-sm font-medium">No records found</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button 
            onClick={onClose}
            className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-blue-600 transition-all shadow-lg active:scale-95"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  )
}