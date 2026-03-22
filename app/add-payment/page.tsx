"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Search,
  CircleDollarSign,
  User,
  MapPin,
  Wallet,
  Calendar,
  Info,
  CreditCard,
  X,
} from "lucide-react";

export default function AddPayment() {
  const [members, setMembers] = useState<any[]>([]);
  const [selectedCenter, setSelectedCenter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [amount, setAmount] = useState("500");
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [memberPayments, setMemberPayments] = useState<any[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastPayment, setLastPayment] = useState<any>(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const [selectedMonth, setSelectedMonth] = useState(
    months[new Date().getMonth()]
  );

  // ✅ Fetch members
  useEffect(() => {
    fetch("http://localhost:5000/members")
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Filter members
  const filteredMembers = useMemo(() => {
    if (!selectedCenter && !searchQuery) return [];
    return members
      .filter((m) => {
        const matchesCenter = selectedCenter
          ? m.centerId === parseInt(selectedCenter)
          : true;
        const matchesSearch = searchQuery
          ? m.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.trustId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.memberId?.toLowerCase().includes(searchQuery.toLowerCase())
          : true;
        return matchesCenter && matchesSearch;
      })
      .slice(0, 10);
  }, [members, selectedCenter, searchQuery]);

  // ✅ Fetch History (Fixed Logic)
  const fetchMemberHistory = async () => {
    if (!selectedMember) return;
    setLoading(true);
    try {
      // ব্যাকএন্ডে যদি _id দিয়ে সার্চ করেন তবে selectedMember._id ব্যবহার করুন
      const memberIdForFetch = selectedMember._id; 
      const res = await fetch(`http://localhost:5000/payments/${memberIdForFetch}`);
      const data = await res.json();
      setMemberPayments(data);
      setShowHistory(true);
    } catch (err) {
      console.error("Error fetching history", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Submit Payment
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!selectedMember || !amount) {
      alert("মেম্বার ও টাকার পরিমাণ দিন");
      return;
    }
    setLoading(true);
    const paymentData = {
      memberId: selectedMember._id,
      trustId: selectedMember.trustId,
      name: selectedMember.name,
      centerId: selectedMember.centerId,
      amount: Number(amount),
      month: selectedMonth,
      date: new Date(),
    };

    try {
      const res = await fetch("http://localhost:5000/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      if (res.ok) {
        setLastPayment(paymentData);
        setShowSuccess(true);
        setSearchQuery("");
        setAmount("500");
        setSelectedMember(null);
      } else {
        alert("Payment failed on server");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Payment failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100">
        <div className="bg-green-600 p-8 text-white text-center">
          <CircleDollarSign className="w-12 h-12 mx-auto mb-3 opacity-90" />
          <h1 className="text-3xl font-bold">পেমেন্ট সংগ্রহ</h1>
          <p className="opacity-80 mt-1">সদস্যের ট্রাস্ট আইডি বা নাম দিয়ে পেমেন্ট খুঁজুন</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <MapPin size={16} className="text-green-600" /> সেন্টার নির্বাচন
              </label>
              <select
                className="w-full border border-slate-200 p-3.5 rounded-xl bg-white outline-none cursor-pointer"
                value={selectedCenter}
                onChange={(e) => {
                  setSelectedCenter(e.target.value);
                  setSelectedMember(null);
                }}
              >
                <option value="">All Center</option>
                {[...Array(17)].map((_, i) => (
                  <option key={i} value={i + 1}>Center {i + 1}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2 relative">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Search size={16} className="text-green-600" /> মেম্বার খুঁজুন (ID/নাম)
              </label>
              <input
                type="text"
                placeholder="Ex: WMK-1005..."
                className="w-full border border-slate-200 p-3.5 rounded-xl outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && !selectedMember && (
                <div className="absolute z-10 w-full bg-white border mt-1 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((m) => (
                      <div
                        key={m._id}
                        className="p-3 hover:bg-green-50 cursor-pointer border-b last:border-0 flex justify-between items-center"
                        onClick={() => {
                          setSelectedMember(m);
                          setSearchQuery(m.name);
                        }}
                      >
                        <span className="font-medium text-slate-800">{m.name}</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">
                          {m.trustId || m.memberId}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-sm text-slate-500">মেম্বার পাওয়া যায়নি</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {selectedMember && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-2xl flex items-center justify-between gap-4 animate-in fade-in zoom-in duration-300">
              <div className="flex items-center gap-4">
                <div className="bg-green-600 p-3 rounded-full text-white">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-green-900">{selectedMember.name}</h3>
                  <p className="text-sm text-green-700 font-mono">
                    {selectedMember.trustId} • Center {selectedMember.centerId}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={fetchMemberHistory}
                className="bg-black text-white px-4 py-2 rounded-xl text-xs hover:bg-blue-600 transition-all flex items-center gap-2"
              >
                Details <Info size={16} />
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Calendar size={16} className="text-green-600" /> মাস নির্বাচন
              </label>
              <select
                className="w-full border border-slate-200 p-3.5 rounded-xl bg-white outline-none"
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
                className="w-full border border-slate-200 p-3.5 rounded-xl text-xl font-bold text-center outline-none"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-extrabold py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? "প্রসেসিং..." : "পেমেন্ট নিশ্চিত করুন"}
          </button>
        </form>
      </div>

      {/* --- History Modal (Fixed UI) --- */}
      {showHistory && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setShowHistory(false)}
          />
          <div className="relative bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black">পেমেন্ট রেকর্ড</h2>
                <p className="text-xs opacity-60">{selectedMember?.name}</p>
              </div>
              <button
                onClick={() => setShowHistory(false)}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-700">
                <CreditCard size={18} className="text-blue-600" /> Transaction Log
              </h3>

              <div className="max-h-[300px] overflow-y-auto space-y-3 pr-2">
                {memberPayments.length > 0 ? (
                  memberPayments.map((p, i) => (
                    <div key={i} className="flex justify-between items-center p-4 border border-slate-100 rounded-2xl bg-slate-50">
                      <div>
                        <p className="font-bold text-slate-800">{p.month}</p>
                        <p className="text-[10px] text-gray-400">
                          {new Date(p.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-blue-600">৳{p.amount}</p>
                        <span className="text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-bold">Paid</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400 py-10">
                    <Info className="mx-auto mb-2 opacity-20" size={40} />
                    <p>কোনো পেমেন্ট রেকর্ড নেই</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowHistory(false)}
                className="w-full mt-6 bg-slate-100 text-slate-900 font-bold py-3 rounded-xl hover:bg-slate-200 transition"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Success Modal --- */}
      {showSuccess && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
          <div className="relative bg-white w-full max-w-sm rounded-[3rem] p-8 text-center shadow-2xl border border-slate-100">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20" />
              <div className="relative bg-green-500 text-white w-24 h-24 rounded-full flex items-center justify-center shadow-lg">
                <CircleDollarSign size={48} />
              </div>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">পেমেন্ট সফল!</h2>
            <div className="bg-slate-50 border rounded-2xl p-5 mb-8 text-left space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-bold">MEMBER</span>
                <span className="font-black">{lastPayment?.name}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-bold">MONTH</span>
                <span className="text-blue-600 font-black">{lastPayment?.month}</span>
              </div>
              <div className="pt-2 border-t flex justify-between items-center">
                <span className="text-slate-400 font-bold text-[10px]">AMOUNT</span>
                <span className="text-2xl font-black text-green-600">৳{lastPayment?.amount}</span>
              </div>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl shadow-lg hover:bg-black transition"
            >
              ঠিক আছে
            </button>
          </div>
        </div>
      )}
    </div>
  );
}