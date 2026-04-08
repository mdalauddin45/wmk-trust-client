"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight, Download, Share2, Home } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tranId") || "N/A";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* মেইন কার্ড এনিমেশন */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100"
      >
        {/* উপরের সবুজ অংশ ও আইকন */}
        <div className="bg-green-600 p-10 text-center relative overflow-hidden">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative z-10 inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full border-4 border-white/30"
          >
            <CheckCircle2 className="w-10 h-10 text-white" />
          </motion.div>
          
          <div className="mt-4 relative z-10">
            <h1 className="text-2xl font-black text-white">পেমেন্ট সফল হয়েছে!</h1>
            <p className="text-green-100 text-sm mt-1 opacity-90">আপনার ট্রানজেকশনটি নিরাপদে সম্পন্ন হয়েছে</p>
          </div>

          {/* ব্যাকগ্রাউন্ড ডেকোরেশন */}
          <div className="absolute top-[-20%] left-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-20%] right-[-10%] w-40 h-40 bg-black/10 rounded-full blur-3xl" />
        </div>

        {/* ট্রানজেকশন ডিটেইলস */}
        <div className="p-8 space-y-6">
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Transaction ID</span>
              <span className="text-slate-900 font-mono text-sm font-bold">{tranId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Status</span>
              <span className="bg-green-100 text-green-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase">Verified</span>
            </div>
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Payment Method</span>
              <span className="text-slate-700 text-sm font-bold">Online Gateway</span>
            </div>
          </div>

          {/* অ্যাকশন বাটনসমূহ */}
          <div className="grid grid-cols-1 gap-3">
            <Link href="/">
              <button className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200">
                <Home size={18} /> ড্যাশবোর্ডে ফিরে যান
              </button>
            </Link>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-50 transition-all text-sm"
              >
                <Download size={16} /> রশিদ ডাউনলোড
              </button>
              <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-50 transition-all text-sm">
                <Share2 size={16} /> শেয়ার করুন
              </button>
            </div>
          </div>

          <p className="text-center text-[11px] text-slate-400">
            কোনো সমস্যা হলে আমাদের সাপোর্ট সেন্টারে যোগাযোগ করুন। <br /> 
            <span className="font-bold">WMK Trust © 2026</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}