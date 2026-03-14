"use client"

import { Target, Eye, ShieldCheck, Users, Globe, LineChart } from "lucide-react"

export default function AboutSection() {
  const stats = [
    { label: "মোট সদস্য", value: "৩০,০০০+", icon: <Users className="text-blue-600" /> },
    { label: "সক্রিয় সেন্টার", value: "১৭টি", icon: <Globe className="text-emerald-600" /> },
    { label: "তহবিল নিরাপত্তা", value: "১০০%", icon: <ShieldCheck className="text-amber-600" /> },
    { label: "ডিজিটাল রিপোর্ট", value: "লাইভ", icon: <LineChart className="text-purple-600" /> },
  ]

  return (
    <section className="bg-slate-50">
      {/* Hero Section with Gradient */}
      <div className="bg-blue-600 py-20 px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-bangla">WMK ট্রাস্ট সম্পর্কে জানুন</h1>
        <p className="max-w-2xl mx-auto text-blue-100 text-lg">
          প্রযুক্তির সমন্বয়ে একটি স্বচ্ছ ও শক্তিশালী সামাজিক অর্থনৈতিক কমিউনিটি গড়ে তোলাই আমাদের লক্ষ্য।
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center text-center transition-transform hover:-translate-y-2">
              <div className="p-3 bg-slate-50 rounded-full mb-3">{stat.icon}</div>
              <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-start pb-20">
          
          {/* Left Side: Story */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-bold tracking-wide uppercase">
              আমাদের যাত্রা
            </div>
            <h2 className="text-3xl font-bold text-slate-900">স্বচ্ছতা ও সহযোগিতার এক অনন্য ডিজিটাল প্ল্যাটফর্ম</h2>
            <p className="text-slate-600 leading-relaxed">
              WMK Trust শুধুমাত্র একটি আর্থিক সংগঠন নয়, এটি একটি ডিজিটাল আন্দোলন। আমরা বিশ্বাস করি সামাজিক সহযোগিতার মাধ্যমে যেকোনো বড় অর্থনৈতিক লক্ষ্য অর্জন সম্ভব। 
            </p>
            <p className="text-slate-600 leading-relaxed">
              বর্তমানে আমাদের ১৭টি ডাটা সেন্টারের মাধ্যমে সদস্যদের যাবতীয় তথ্য অত্যন্ত গোপনীয়তা ও নিরাপত্তার সাথে সংরক্ষিত হয়। প্রতিটি সদস্যের পেমেন্ট এবং হিসেব এখন হাতের নাগালে।
            </p>
            
            <div className="pt-4 border-t border-slate-200">
              <blockquote className="italic text-slate-500 border-l-4 border-blue-600 pl-4">
                "ডিজিটাল বাংলাদেশ গড়ার লক্ষে সামাজিক ক্ষুদ্র সঞ্চয়কে প্রযুক্তির মাধ্যমে একীভূত করাই আমাদের প্রধান সার্থকতা।"
              </blockquote>
            </div>
          </div>

          {/* Right Side: Mission & Vision Cards */}
          <div className="grid gap-6">
            {/* Mission Card */}
            <div className="group bg-white p-8 rounded-3xl shadow-md border-b-4 border-blue-600 hover:shadow-2xl transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                সদস্যদের প্রতিটি পয়সার সঠিক হিসাব রাখা এবং একটি সম্পূর্ণ পেপারলেস ও ডিজিটাল আর্থিক ব্যবস্থাপনা নিশ্চিত করা।
              </p>
            </div>

            {/* Vision Card */}
            <div className="group bg-white p-8 rounded-3xl shadow-md border-b-4 border-emerald-500 hover:shadow-2xl transition-all">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Eye className="text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                সামাজিক একতা ও স্মার্ট প্রযুক্তির মাধ্যমে একটি স্বনির্ভর ও দারিদ্র্যমুক্ত শক্তিশালী অর্থনৈতিক কমিউনিটি হিসেবে আত্মপ্রকাশ করা।
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Trust Badge Section */}
      <div className="bg-slate-900 py-16 text-center text-white">
        <h3 className="text-xl font-semibold opacity-80 mb-6 font-bangla">আমাদের সাথে যুক্ত আছেন</h3>
        <div className="flex flex-wrap justify-center gap-10 opacity-50 grayscale hover:grayscale-0 transition-all">
          <span className="text-2xl font-bold italic">Member First</span>
          <span className="text-2xl font-bold italic">Secure Data</span>
          <span className="text-2xl font-bold italic">Community Driven</span>
          <span className="text-2xl font-bold italic">Transparency</span>
        </div>
      </div>
    </section>
  )
}