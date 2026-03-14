"use client"

import { useEffect } from "react"
import { X, Phone, MapPin, ShieldCheck, CreditCard, Calendar, User, ArrowRight } from "lucide-react"

export default function MemberDetailsModal({ member, onClose }: any) {
  
  // যখন মোডাল ওপেন হবে তখন পেজ স্ক্রল বন্ধ করবে এবং নেভিগেশন বারের সাথে কলিশন কমাবে
  useEffect(() => {
    if (member) {
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [member])

  if (!member) return null

  return (
    // z-[200] নিশ্চিত করবে এটি আপনার Navbar (z-100) এর উপরে থাকবে
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      
      {/* --- Backdrop with Heavy Blur --- */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500" 
        onClick={onClose} 
      />

      {/* --- Modal Container --- */}
      <div className="relative bg-white w-full max-w-[500px] rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        
        {/* Header Section (Deep Gradient) */}
        <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 p-8 pb-12 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 bg-white/10 hover:bg-white/20 hover:rotate-90 rounded-full transition-all duration-300"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center shadow-2xl rotate-3">
              <span className="text-4xl font-black text-blue-600 uppercase tracking-tighter">
                {member.name.charAt(0)}
              </span>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-2xl font-black tracking-tight leading-none">{member.name}</h2>
                <ShieldCheck size={20} className="text-blue-300 fill-blue-300/20" />
              </div>
              <span className="inline-block text-[10px] font-bold bg-white/20 text-blue-50 px-3 py-1 rounded-full border border-white/10 tracking-widest uppercase">
                ID: {member.trustId}
              </span>
            </div>
          </div>
        </div>

        {/* Info & History Section */}
        <div className="p-8 -mt-6 bg-white rounded-t-[3rem] relative z-10 space-y-8">
          
          {/* Contact Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                <MapPin size={12} className="text-blue-500" /> Location
              </p>
              <p className="text-slate-900 font-bold text-sm">{member.address}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                <Phone size={12} className="text-blue-500" /> Phone
              </p>
              <p className="text-slate-900 font-bold text-sm">{member.phone}</p>
            </div>
          </div>

          {/* Payment History Card List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <CreditCard size={18} className="text-blue-600" /> Transaction Log
              </h3>
            </div>

            <div className="max-h-[220px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
              {member.payments?.map((p: any, i: number) => (
                <div 
                  key={i} 
                  className="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{p.month}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Monthly Fee</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-900">৳{p.amount}</p>
                    <span className="text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-tighter">Paid</span>
                  </div>
                </div>
              ))}
              
              {(!member.payments || member.payments.length === 0) && (
                <div className="py-8 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <User className="mx-auto text-slate-300 mb-2" size={32} />
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">No history available</p>
                </div>
              )}
            </div>
          </div>

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="group w-full bg-slate-900 text-white font-black py-4 rounded-[1.5rem] flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
          >
            Done <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}