"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react"

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // সিমুলেটেড ডিলে (প্রিমিয়াম ফিল দেওয়ার জন্য)
    setTimeout(() => {
      if (email === "admin@wmk.com" && password === "123456") {
        localStorage.setItem("role", "admin")
        router.push("/dashboard")
      } else {
        alert("ভুল Email বা Password! আবার চেষ্টা করুন।")
        setIsLoading(false)
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0f1d] relative overflow-hidden">
      
      {/* ব্যাকগ্রাউন্ড ডেকোরেশন */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/20 blur-[100px] rounded-full"></div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* লোগো বা আইকন */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/40 mb-4 transform hover:rotate-12 transition-transform cursor-pointer">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">WMK <span className="text-blue-500">ADMIN</span></h1>
          <p className="text-slate-400 mt-2 text-sm uppercase tracking-widest font-medium">Secure Access Portal</p>
        </div>

        {/* লগইন কার্ড */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* ইমেইল ফিল্ড */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  required
                  type="email"
                  placeholder="admin@example.com"
                  className="w-full bg-slate-950/50 border border-slate-800 text-white pl-11 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* পাসওয়ার্ড ফিল্ড */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/50 border border-slate-800 text-white pl-11 pr-12 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* লগইন বাটন */}
            <button
              disabled={isLoading}
              className="relative w-full overflow-hidden group bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/30 active:scale-95 disabled:opacity-70 disabled:active:scale-100"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Sign In to Portal <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
              {/* হোভার গ্লো ইফেক্ট */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </form>

          <p className="text-center mt-8 text-slate-500 text-xs">
            &copy; 2026 WMK Trust. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}