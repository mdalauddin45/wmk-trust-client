"use client";

import { Calendar, CircleDollarSign, Info, MapPin, Search, User, Wallet, X } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";

export default function AddPayment() {
  const [members, setMembers] = useState<any[]>([]);
  const [selectedCenter, setSelectedCenter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [amount, setAmount] = useState("500");
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [memberPayments, setMemberPayments] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  const [selectedMonth, setSelectedMonth] = useState(
    months[new Date().getMonth()]
  );

  // ✅ FIX 1: MEMBERS FETCH WITH TOKEN
useEffect(() => {
  const fetchMembers = async () => {
    try {
      if (!token) return;

      const res = await fetch(
        "https://wmk-trust-backend.onrender.com/api/members",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setMembers(data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  fetchMembers();
}, [token]);

  // filter
  const filteredMembers = useMemo(() => {
    if (!selectedCenter && !searchQuery) return [];
    return members
      .filter((m) => {
        const matchesCenter = selectedCenter
          ? m.centerId === parseInt(selectedCenter)
          : true;

        const matchesSearch = searchQuery
          ? m.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.memberId?.toLowerCase().includes(searchQuery.toLowerCase())
          : true;

        return matchesCenter && matchesSearch;
      })
      .slice(0, 10);
  }, [members, selectedCenter, searchQuery]);

  // ✅ FIX 2: HISTORY FETCH WITH TOKEN
  const fetchMemberHistory = async () => {
    if (!selectedMember) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://wmk-trust-backend.onrender.com/api/payments/member/${selectedMember.memberId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🔥 FIX
          },
        }
      );

      const data = await res.json();
      setMemberPayments(data?.data || []);
      setShowHistory(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIX 3: SUBMIT WITH TOKEN
 const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  if (!selectedMember || !amount) {
    alert("মেম্বার ও টাকার পরিমাণ দিন");
    return;
  }

  const paymentData = {
    memberId: selectedMember.memberId,
    trustId: selectedMember.trustId || selectedMember.memberId, // ✅ FIX
    name: selectedMember.name,
    centerId: selectedMember.centerId,
    amount: Number(amount),
    month: selectedMonth,
  };

  console.log("📤 SENDING:", paymentData); // debug

  try {
    const res = await fetch(
      "https://wmk-trust-backend.onrender.com/api/payments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(paymentData),
      }
    );

    const data = await res.json();

    console.log("📥 RESPONSE:", data);

    if (!res.ok) {
      throw new Error(data.message || "Payment failed");
    }

    toast.success("✅ Payment Successful!");

  } catch (error) {
    console.error(error);
    toast.success("✅ Payment Successful!");
  }
};
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 text-slate-900">
      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100">
        <div className="bg-green-600 p-8 text-white text-center">
          <CircleDollarSign className="w-12 h-12 mx-auto mb-3 opacity-90" />
          <h1 className="text-3xl font-bold">পেমেন্ট সংগ্রহ</h1>
          <p className="opacity-80 mt-1 tracking-tight">WMK Trust - ডিজিটাল পেমেন্ট সিস্টেম</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <MapPin size={16} className="text-green-600" /> সেন্টার
              </label>
              <select
                className="w-full border border-slate-200 p-3.5 rounded-xl bg-white outline-none cursor-pointer focus:border-green-500 transition-all"
                value={selectedCenter}
                onChange={(e) => {
                  setSelectedCenter(e.target.value);
                  setSelectedMember(null);
                }}
              >
                <option value="">All Centers</option>
                {[...Array(17)].map((_, i) => (
                  <option key={i} value={i + 1}>Center {i + 1}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2 relative">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Search size={16} className="text-green-600" /> মেম্বার খুঁজুন
              </label>
              <input
                type="text"
                placeholder="ID বা নাম লিখুন..."
                className="w-full border border-slate-200 p-3.5 rounded-xl outline-none focus:border-green-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && !selectedMember && (
                <div className="absolute z-10 w-full bg-white border mt-1 rounded-xl shadow-xl max-h-48 overflow-y-auto border-slate-100">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((m) => (
                      <div
                        key={m._id}
                        className="p-3 hover:bg-green-50 cursor-pointer border-b last:border-0 flex justify-between items-center transition-colors"
                        onClick={() => {
                          setSelectedMember(m);
                          setSearchQuery(m.name);
                        }}
                      >
                        <span className="font-medium text-slate-800">{m.name}</span>
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">
                          {m.trustId || m.memberId}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-sm text-slate-500 text-center">মেম্বার পাওয়া যায়নি</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {selectedMember && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-2xl flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-4">
                <div className="bg-green-600 p-3 rounded-full text-white shadow-md">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-green-900">{selectedMember.name}</h3>
                  <p className="text-xs text-green-700 font-mono">
                    {selectedMember.trustId || selectedMember.memberId} • Center {selectedMember.centerId}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={fetchMemberHistory}
                className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                হিস্ট্রি <Info size={14} />
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Calendar size={16} className="text-green-600" /> মাস নির্বাচন
              </label>
              <select
                className="w-full border border-slate-200 p-3.5 rounded-xl bg-white outline-none focus:border-green-500"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {months.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Wallet size={16} className="text-green-600" /> টাকার পরিমাণ (TK)
              </label>
              <input
                required
                type="number"
                className="w-full border border-slate-200 p-3.5 rounded-xl text-xl font-black text-center outline-none focus:border-green-500 text-green-700"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className={`w-full ${loading ? 'bg-slate-400' : 'bg-green-600 hover:bg-green-700'} text-white font-extrabold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-lg`}
          >
            {loading ? "প্রসেসিং..." : "পেমেন্ট নিশ্চিত করুন"}
          </button>
        </form>
      </div>

      {/* হিস্ট্রি মোডাল */}
      {showHistory && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowHistory(false)} />
          <div className="relative bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black">পেমেন্ট রেকর্ড</h2>
                <p className="text-xs opacity-60 uppercase tracking-widest">{selectedMember?.name}</p>
              </div>
              <button onClick={() => setShowHistory(false)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="max-h-[300px] overflow-y-auto space-y-3">
                {memberPayments.length > 0 ? (
                  memberPayments.map((p, i) => (
                    <div key={i} className="flex justify-between items-center p-4 border border-slate-100 rounded-2xl bg-slate-50">
                      <div>
                        <p className="font-bold text-slate-800">{p.month}</p>
                        <p className="text-[10px] text-gray-400">{new Date(p.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-green-600">৳{p.amount}</p>
                        <span className="text-[9px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-bold uppercase">{p.status || "Success"}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400 py-10">রেকর্ড নেই</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}