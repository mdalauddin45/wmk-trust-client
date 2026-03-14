"use client"

import { useParams } from "next/navigation"
import { 
  CreditCard, Calendar, ArrowLeft, Download, 
  CheckCircle2, User, Filter 
} from "lucide-react"
import Link from "next/link"

export default function MemberDetails() {
  const params = useParams()

  const payments = [
    { month: "January", amount: 500, date: "10 Jan 2026", status: "Paid", txId: "WMK-5421" },
    { month: "February", amount: 500, date: "12 Feb 2026", status: "Paid", txId: "WMK-9874" },
    { month: "March", amount: 500, date: "05 Mar 2026", status: "Paid", txId: "WMK-1254" }
  ]

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Top Navigation & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Link 
              href="/dashboard" 
              className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-2 text-sm font-medium"
            >
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Member <span className="text-blue-600">#{params.id}</span> Profile
            </h1>
          </div>
          <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm">
            <Download size={18} /> Download Statement
          </button>
        </div>

        {/* Member Summary Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-[2rem] text-white shadow-xl shadow-blue-200">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                <User size={24} />
              </div>
              <span className="text-xs font-bold bg-emerald-500/20 px-3 py-1 rounded-full text-emerald-300">Active Member</span>
            </div>
            <p className="text-blue-100 text-sm font-medium">Total Contributed</p>
            <h2 className="text-3xl font-black">৳1,500.00</h2>
          </div>
          
          <div className="md:col-span-2 bg-white border border-slate-100 p-6 rounded-[2rem] flex items-center justify-between shadow-sm">
            <div className="space-y-1">
              <p className="text-slate-500 text-sm font-medium">Monthly Installment</p>
              <h3 className="text-2xl font-black text-slate-800">৳500.00</h3>
            </div>
            <div className="h-12 w-[1px] bg-slate-100 hidden md:block"></div>
            <div className="space-y-1">
              <p className="text-slate-500 text-sm font-medium">Joined Date</p>
              <h3 className="text-xl font-bold text-slate-800">12 Oct 2025</h3>
            </div>
          </div>
        </div>

        {/* Payment History Table */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <CreditCard size={18} className="text-blue-600" /> Payment History
            </h3>
            <button className="text-slate-400 hover:text-blue-600 transition-colors">
              <Filter size={18} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-400 text-[11px] uppercase tracking-[0.15em] font-black">
                  <th className="px-8 py-5">Month / Date</th>
                  <th className="px-8 py-5">Transaction ID</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p, i) => (
                  <tr 
                    key={i} 
                    className="group hover:bg-slate-50/80 transition-all border-t border-slate-50"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{p.month}</p>
                          <p className="text-xs text-slate-400 font-medium">{p.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <code className="text-xs font-mono bg-slate-100 px-2 py-1 rounded-md text-slate-600 uppercase">
                        {p.txId}
                      </code>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
                        <CheckCircle2 size={14} /> {p.status}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className="font-black text-slate-900">৳{p.amount}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 bg-slate-50/30 text-center border-t border-slate-50">
             <button className="text-sm font-bold text-blue-600 hover:underline">
               View Full Report
             </button>
          </div>
        </div>

      </div>
    </div>
  )
}