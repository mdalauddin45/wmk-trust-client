"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowRight, ShieldCheck, TrendingUp, Users, 
  Zap, Globe, Lock, ChevronLeft, ChevronRight 
} from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "সদস্য আর্থিক সহায়তা প্রকল্প",
      desc: "বিপদকালীন সময়ে সদস্যদের পাশে দাঁড়ানোই আমাদের মূল লক্ষ্য।",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070",
      tag: "Financial Support"
    },
    {
      id: 2,
      title: "শিক্ষা বৃত্তি কর্মসূচি",
      desc: "মেধাবী শিক্ষার্থীদের উচ্চশিক্ষায় আমরা দিচ্ছি বিশেষ অনুদান।",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2104",
      tag: "Education"
    },
    {
      id: 3,
      title: "সামাজিক উন্নয়নমূলক কাজ",
      desc: "গ্রামীন অবকাঠামো এবং পরিবেশ রক্ষায় আমাদের স্বেচ্ছাসেবীরা নিরলস কাজ করছে।",
      image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070",
      tag: "Community"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(timer)
  }, [currentSlide])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-600">
      
      {/* --- HERO SLIDER SECTION --- */}
      <section className="relative w-full h-[650px] overflow-hidden group">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms]"
              style={{ 
                backgroundImage: `url(${slide.image})`,
                transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
            </div>

            <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start text-white">
              <span className="inline-block px-4 py-1 bg-blue-600 rounded-full text-xs font-bold tracking-widest uppercase mb-4 animate-bounce">
                {slide.tag}
              </span>
              <h2 className="text-4xl md:text-6xl font-extrabold mb-6 max-w-2xl leading-tight">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl text-slate-200 max-w-xl mb-8 leading-relaxed">
                {slide.desc}
              </p>
              <button className="group flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 hover:text-white transition-all shadow-xl">
                বিস্তারিত দেখুন <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        ))}

        {/* Slider Nav */}
        <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-slate-900">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-slate-900">
          <ChevronRight size={24} />
        </button>
      </section>

      {/* --- TRUST & MISSION SECTION (Modern Dark Reveal) --- */}
      <section className="relative overflow-hidden bg-[#0a0f1d] py-24">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase">
                WMK Trust V3.0
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight">
                ডিজিটাল আগামীর <br />
                <span className="text-blue-500">আর্থিক নিরাপত্তা</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-lg">
                বাংলাদেশের ১৭টি ডাটা সেন্টারের মাধ্যমে আপনার আমানত এবং তথ্য থাকছে সম্পূর্ণ নিরাপদ।
              </p>
              <div className="flex flex-wrap gap-5">
                <button onClick={() => router.push("/dashboard")} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-3 shadow-lg shadow-blue-600/25">
                  ড্যাশবোর্ড <ArrowRight size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 relative">
               <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-8 rounded-[2.5rem] shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <Lock className="text-white" size={24} />
                    </div>
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-800 bg-slate-700"></div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 w-3/4 bg-slate-700 rounded-full animate-pulse"></div>
                    <div className="h-20 w-full bg-blue-600/10 rounded-2xl border border-blue-500/20 flex items-center justify-center">
                      <p className="text-blue-400 font-mono text-sm">Encrypted Connection...</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { label: "Data Centers", value: "17", icon: <Globe />, color: "text-blue-600" },
            { label: "Global Members", value: "34,000+", icon: <Users />, color: "text-emerald-600" },
            { label: "Security Level", value: "SSL 256", icon: <ShieldCheck />, color: "text-purple-600" }
          ].map((stat, i) => (
            <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all group">
              <div className={`${stat.color} mb-4 transform group-hover:scale-110 transition-transform`}>{stat.icon}</div>
              <h3 className="text-4xl font-black text-slate-900 mb-1">{stat.value}</h3>
              <p className="text-slate-500 text-sm font-bold uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[3rem] p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">আমাদের সাথে আপনার যাত্রা শুরু করুন</h2>
          <p className="text-blue-100 mb-10 max-w-2xl mx-auto">কোনো প্রকার হিডেন চার্জ ছাড়াই আপনার তহবিল পরিচালনা করুন এবং রিয়েল-টাইম আপডেট পান।</p>
          <button className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-black hover:shadow-2xl transition-all">
            আজই জয়েন করুন
          </button>
        </div>
      </section>

    </div>
  )
}