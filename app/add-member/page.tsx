"use client";

import { useEffect, useState } from "react";
import { UserPlus, Phone } from "lucide-react";

export default function AddMember() {
  const [allMembers, setAllMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [registeredId, setRegisteredId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    center: "",
    mobile: "",
    bloodGroup: "",
    status: "Active",
  });

  // 🔹 Fetch Members (FIXED)
  useEffect(() => {
    fetch("https://wmk-trust-backend.onrender.com/api/members")
      .then((res) => res.json())
      .then((data) => {
        setAllMembers(data?.data || []); // ✅ FIX
      })
      .catch((err) => console.error(err));
  }, []);

  // 🔹 Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Calculate IDs
  const calculateNextIds = (selectedCenter: string) => {
    const centerIdNum = parseInt(selectedCenter);

    const centerCount = allMembers.filter(
      (m) => m.centerId === centerIdNum
    ).length;

    const nextTrustId = `WMK-${1000 + allMembers.length + 1}`;

    return { nextTrustId, centerSerial: centerCount + 1 };
  };

  // 🔹 Submit (FIXED)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.center) {
      alert("সেন্টার সিলেক্ট করুন");
      return;
    }

    setLoading(true);

    const { nextTrustId } = calculateNextIds(formData.center);

    const newMember = {
      name: formData.name,
      trustId: nextTrustId,
      centerId: parseInt(formData.center),
      payment: 500,
      mobile: formData.mobile,
      bloodGroup: formData.bloodGroup,
      status: formData.status,
    };

    try {
      const res = await fetch(
        "https://wmk-trust-backend.onrender.com/api/members", // ✅ FIXED
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMember),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error");

      // ✅ FIXED response handling
      setAllMembers((prev) => [...prev, data?.data]);

      setRegisteredId(nextTrustId);
      setShowSuccess(true);

      // reset
      setFormData({
        name: "",
        center: "",
        mobile: "",
        bloodGroup: "",
        status: "Active",
      });

    } catch (error) {
      console.error(error);
      alert("Error adding member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100">
        <div className="bg-blue-600 p-8 text-white text-center">
          <UserPlus className="w-12 h-12 mx-auto mb-3 opacity-90" />
          <h1 className="text-3xl font-bold font-bangla">নতুন সদস্য ফরম</h1>
          <p className="opacity-80 mt-1">
            সঠিক তথ্য দিয়ে মেম্বারশিপ নিশ্চিত করুন
          </p>
        </div>

        <div className="p-8">
          {/* Real-time ID Counter */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
              <p className="text-xs text-blue-500 font-bold uppercase tracking-wider">
                Next Trust ID
              </p>
              <p className="text-2xl font-mono font-bold text-blue-900">
                WMK-{1000 + allMembers.length + 1}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                Total Members
              </p>
              <p className="text-2xl font-mono font-bold text-slate-900">
                {allMembers.length}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  সদস্যের নাম
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="সম্পূর্ণ নাম লিখুন"
                  className="w-full border border-slate-200 p-3.5 rounded-xl focus:ring-4 focus:ring-blue-100 outline-none transition-all shadow-sm"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  মোবাইল নম্বর
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-slate-400">
                    <Phone size={18} />
                  </span>
                  <input
                    required
                    type="tel"
                    name="mobile"
                    placeholder="017XXXXXXXX"
                    className="w-full border border-slate-200 p-3.5 pl-12 rounded-xl focus:ring-4 focus:ring-blue-100 outline-none transition-all shadow-sm"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  সেন্টার
                </label>
                <select
                  required
                  name="center"
                  className="w-full border border-slate-200 p-3.5 rounded-xl bg-white focus:ring-4 focus:ring-blue-100 outline-none cursor-pointer shadow-sm"
                  value={formData.center}
                  onChange={handleChange}
                >
                  <option value="">সেন্টার নির্বাচন করুন</option>
                  {[...Array(17)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      সেন্টার {i + 1 < 10 ? `0${i + 1}` : i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  রক্তের গ্রুপ
                </label>
                <select
                  name="bloodGroup"
                  className="w-full border border-slate-200 p-3.5 rounded-xl bg-white focus:ring-4 focus:ring-blue-100 outline-none shadow-sm"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                >
                  <option value="">নির্বাচন করুন</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ),
                  )}
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700">
                  মেম্বারশিপ স্ট্যাটাস
                </label>
                <div className="flex gap-4 p-1.5 bg-slate-100 rounded-2xl w-full max-w-xs">
                  {["Active", "Inactive"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFormData({ ...formData, status: s })}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        formData.status === s
                          ? "bg-white shadow-md text-blue-600"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {s === "Active" ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 rounded-2xl shadow-xl shadow-blue-200 transition-all transform hover:-translate-y-1 active:scale-95">
                সদস্য নিশ্চিত করুন
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* --- Premium Success Modal --- */}
      {showSuccess && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500" />

          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-sm rounded-[3rem] p-8 text-center shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] animate-in zoom-in-95 duration-300">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <UserPlus size={40} />
            </div>

            <h2 className="text-2xl font-black text-slate-900 mb-2">
              অভিনন্দন!
            </h2>
            <p className="text-slate-500 font-medium mb-6">
              নতুন সদস্য সফলভাবে রেজিস্টার করা হয়েছে।
            </p>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-8">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                Generated Trust ID
              </p>
              <p className="text-3xl font-mono font-black text-blue-600 tracking-tighter">
                {registeredId}
              </p>
            </div>

            <button
              onClick={() => setShowSuccess(false)}
              className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-blue-600 transition-all shadow-lg active:scale-95"
            >
              ঠিক আছে
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
