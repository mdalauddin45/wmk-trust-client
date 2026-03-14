"use client"

import { useState, useMemo } from "react"
import { Search, CircleDollarSign, User, MapPin, Wallet } from "lucide-react"
// মেম্বার লিস্ট ইম্পোর্ট করুন
import { members } from "../../data/members" 

export default function AddPayment() {
  const [selectedCenter, setSelectedCenter] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [amount, setAmount] = useState("")
  const [selectedMember, setSelectedMember] = useState<any>(null)

  // ফিল্টারিং লজিক: সেন্টার এবং সার্চ কুয়েরি অনুযায়ী মেম্বার খোঁজা
  const filteredMembers = useMemo(() => {
    if (!selectedCenter && !searchQuery) return []
    
    return members.filter((m) => {
      const matchesCenter = selectedCenter ? m.centerId === parseInt(selectedCenter) : true
      const matchesSearch = searchQuery 
        ? m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.trustId.includes(searchQuery)
        : true
      return matchesCenter && matchesSearch
    }).slice(0, 10) // পারফরম্যান্সের জন্য মাত্র ১০টি রেজাল্ট দেখাবে
  }, [selectedCenter, searchQuery])

  function handleSubmit(e: any) {
    e.preventDefault()
    if (!selectedMember || !amount) {
      alert("দয়া করে মেম্বার এবং টাকার পরিমাণ সঠিক দিন")
      return
    }
    
    console.log({
      memberId: selectedMember.trustId,
      name: selectedMember.name,
      amount: amount,
      date: new Date().toLocaleDateString()
    })

    alert(`${selectedMember.name}-এর ${amount} টাকা পেমেন্ট যুক্ত হয়েছে!`)
    // Reset Form
    setSearchQuery("")
    setAmount("")
    setSelectedMember(null)
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100">
        
        {/* Top Header */}
        <div className="bg-green-600 p-8 text-white text-center">
          <CircleDollarSign className="w-12 h-12 mx-auto mb-3 opacity-90" />
          <h1 className="text-3xl font-bold">পেমেন্ট সংগ্রহ</h1>
          <p className="opacity-80 mt-1">সদস্যের ট্রাস্ট আইডি বা নাম দিয়ে পেমেন্ট খুঁজুন</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Center Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <MapPin size={16} className="text-green-600"/> সেন্টার নির্বাচন
              </label>
              <select
                className="w-full border border-slate-200 p-3.5 rounded-xl bg-white focus:ring-4 focus:ring-green-100 outline-none cursor-pointer"
                value={selectedCenter}
                onChange={(e) => {
                    setSelectedCenter(e.target.value)
                    setSelectedMember(null) // সেন্টার চেঞ্জ করলে সিলেকশন মুছে যাবে
                }}
              >
                <option value="">সকল সেন্টার</option>
                {[...Array(17)].map((_, i) => (
                  <option key={i} value={i + 1}>Center {i + 1 < 10 ? `0${i + 1}` : i + 1}</option>
                ))}
              </select>
            </div>

            {/* Smart Search Field */}
            <div className="space-y-2 relative">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Search size={16} className="text-green-600"/> মেম্বার খুঁজুন (ID/নাম)
              </label>
              <input
                type="text"
                placeholder="Ex: WMK-1005..."
                className="w-full border border-slate-200 p-3.5 rounded-xl focus:ring-4 focus:ring-green-100 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              {/* Search Results Dropdown */}
              {searchQuery && !selectedMember && (
                <div className="absolute z-10 w-full bg-white border mt-1 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((m) => (
                      <div
                        key={m.id}
                        className="p-3 hover:bg-green-50 cursor-pointer border-b last:border-0 flex justify-between items-center"
                        onClick={() => {
                          setSelectedMember(m)
                          setSearchQuery(m.name)
                        }}
                      >
                        <span className="font-medium text-slate-800">{m.name}</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">{m.trustId}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-sm text-slate-500">মেম্বার পাওয়া যায়নি</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Selected Member Display */}
          {selectedMember && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-2xl flex items-center gap-4 animate-in fade-in zoom-in duration-300">
              <div className="bg-green-600 p-3 rounded-full text-white">
                <User size={24}/>
              </div>
              <div>
                <h3 className="font-bold text-green-900">{selectedMember.name}</h3>
                <p className="text-sm text-green-700 font-mono">{selectedMember.trustId} • Center {selectedMember.centerId}</p>
              </div>
            </div>
          )}

          {/* Amount Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Wallet size={16} className="text-green-600"/> টাকার পরিমাণ (TK)
            </label>
            <input
              required
              type="number"
              placeholder="500"
              className="w-full border border-slate-200 p-4 rounded-xl text-2xl font-bold text-center focus:ring-4 focus:ring-green-100 outline-none"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-extrabold py-4 rounded-2xl shadow-xl shadow-green-100 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2">
            পেমেন্ট নিশ্চিত করুন
          </button>

        </form>
      </div>
    </div>
  )
}