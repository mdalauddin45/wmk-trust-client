"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Home } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SuccessPageContent() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tranId") || "N/A";

  const [mounted, setMounted] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  // mount fix
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ VERIFY PAYMENT
  useEffect(() => {
    if (!tranId || tranId === "N/A") return;

    const verifyPayment = async () => {
      try {
        const res = await fetch(
          `https://wmk-trust-backend.onrender.com/api/payments/member/${tranId}`
        );

        const data = await res.json();

        // simple validation
        if (res.ok && data?.data) {
          setVerified(true);
        } else {
          setVerified(false);
        }
      } catch (error) {
        console.error("Verification error:", error);
        setVerified(false);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [tranId]);

  if (!mounted) return null;

  // loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500 font-bold">Verifying payment...</p>
      </div>
    );
  }

  // ❌ invalid transaction
  if (!verified) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">
        Invalid or unverified transaction
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100"
      >
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
            <h1 className="text-2xl font-black text-white">
              পেমেন্ট সফল হয়েছে!
            </h1>
            <p className="text-green-100 text-sm mt-1 opacity-90">
              আপনার ট্রানজেকশনটি নিরাপদে সম্পন্ন হয়েছে
            </p>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Transaction ID
              </span>
              <span className="text-slate-900 font-mono text-sm font-bold">
                {tranId}
              </span>
            </div>
          </div>

          <Link href="/">
            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl flex items-center justify-center gap-2">
              <Home size={18} /> ড্যাশবোর্ডে ফিরে যান
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}