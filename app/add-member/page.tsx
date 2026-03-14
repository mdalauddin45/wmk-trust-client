"use client"

import { useState } from "react"
import { UserPlus, Phone, Droplet, Activity } from "lucide-react"
// members.js থেকে ডাটা ইম্পোর্ট করুন
import { members as initialMembers } from "../../data/members"   

import { members } from '@/data/members';       

export default function AddMember() {
  // লোকাল স্টেট যাতে নতুন মেম্বার অ্যাড হলে সাথে সাথে আইডি আপডেট হয়
  const [allMembers, setAllMembers] = useState(initialMembers)
  
  const [formData, setFormData] = useState({
    name: "",
    center: "",
    mobile: "",
    bloodGroup: "",
    status: "Active"
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // সেন্টার অনুযায়ী আইডি ক্যালকুলেট করার লজিক
  const calculateNextIds = (selectedCenter: string) => {
    const centerIdNum = parseInt(selectedCenter);
    
    // ১. ঐ সেন্টারের মেম্বার সংখ্যা বের করা
    const centerCount = allMembers.filter(m => m.centerId === centerIdNum).length;
    
    // ২. গ্লোবাল ট্রাস্ট আইডি (শেষ মেম্বারের আইডি + ১)
    const nextTrustIdNumber = 1000 + allMembers.length + 1;
    const nextTrustId = `WMK-${nextTrustIdNumber}`;

    return { nextTrustId, centerSerial: centerCount + 1 };
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.center) {
      alert("সেন্টার সিলেক্ট করুন");
      return;
    }

    const { nextTrustId, centerSerial } = calculateNextIds(formData.center);

    const newMember = {
      id: allMembers.length + 1,
      name: formData.name,
      trustId: nextTrustId,
      centerId: parseInt(formData.center),
      payment: 500, // Default payment
      mobile: formData.mobile,
      bloodGroup: formData.bloodGroup,
      status: formData.status
    };

    // ডাটা আপডেট (কনসোলে দেখাচ্ছি, আপনি এখানে API কল বা LocalStorage ইউজ করতে পারেন)
    console.log("New Member to Save:", newMember);
    
    // UI আপডেট করার জন্য
    setAllMembers([...allMembers, newMember]);
    
    alert(`সফলভাবে যুক্ত হয়েছে!\nট্রাস্ট আইডি: ${nextTrustId}\nসেন্টার সিরিয়াল: ${centerSerial}`);
    
    // ফর্ম রিসেট
    setFormData({ name: "", center: "", mobile: "", bloodGroup: "", status: "Active" });
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100">
        
        <div className="bg-blue-600 p-8 text-white text-center">
          <UserPlus className="w-12 h-12 mx-auto mb-3 opacity-90" />
          <h1 className="text-3xl font-bold font-bangla">নতুন সদস্য ফরম</h1>
          <p className="opacity-80 mt-1">সঠিক তথ্য দিয়ে মেম্বারশিপ নিশ্চিত করুন</p>
        </div>

        <div className="p-8">
          {/* Real-time ID Counter */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
              <p className="text-xs text-blue-500 font-bold uppercase tracking-wider">Next Trust ID</p>
              <p className="text-2xl font-mono font-bold text-blue-900">
                WMK-{1000 + allMembers.length + 1}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Members</p>
              <p className="text-2xl font-mono font-bold text-slate-900">{allMembers.length}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">সদস্যের নাম</label>
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
                <label className="text-sm font-bold text-slate-700">মোবাইল নম্বর</label>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-slate-400"><Phone size={18}/></span>
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
                <label className="text-sm font-bold text-slate-700">সেন্টার</label>
                <select
                  required
                  name="center"
                  className="w-full border border-slate-200 p-3.5 rounded-xl bg-white focus:ring-4 focus:ring-blue-100 outline-none cursor-pointer shadow-sm"
                  value={formData.center}
                  onChange={handleChange}
                >
                  <option value="">সেন্টার নির্বাচন করুন</option>
                  {[...Array(17)].map((_, i) => (
                    <option key={i} value={i + 1}>সেন্টার {i + 1 < 10 ? `0${i + 1}` : i + 1}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">রক্তের গ্রুপ</label>
                <select
                  name="bloodGroup"
                  className="w-full border border-slate-200 p-3.5 rounded-xl bg-white focus:ring-4 focus:ring-blue-100 outline-none shadow-sm"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                >
                  <option value="">নির্বাচন করুন</option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700">মেম্বারশিপ স্ট্যাটাস</label>
                <div className="flex gap-4 p-1.5 bg-slate-100 rounded-2xl w-full max-w-xs">
                  {["Active", "Inactive"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFormData({...formData, status: s})}
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
    </div>
  )
}