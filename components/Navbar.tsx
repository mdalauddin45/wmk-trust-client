"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { 
  Home, LayoutGrid, UserPlus, CreditCard, 
  Zap, Settings, Menu, X, LogOut, ArrowRight 
} from "lucide-react"

export default function Navbar() {
  const [admin, setAdmin] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    const role = localStorage.getItem("role")
    if (role === "admin") setAdmin(true)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "হোম", path: "/", icon: <Home size={18} /> },
    { name: "পেমেন্ট", path: "/add-payment", icon: <CreditCard size={18} /> },
    { name: "প্রকল্প", path: "/projects", icon: <Zap size={18} /> },
  ]

  return (
    <div className="fixed top-6 left-0 right-0 z-[100] px-6">
      <nav className={`max-w-7xl mx-auto transition-all duration-500 ease-in-out ${
        scrolled 
        ? "bg-white/70 backdrop-blur-2xl py-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/20 rounded-[2rem]" 
        : "bg-white/40 backdrop-blur-md py-4 border border-white/10 rounded-3xl"
      }`}>
        <div className="px-6 flex items-center justify-between">
          
          {/* --- Brand / Logo --- */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-all duration-500 shadow-lg shadow-blue-500/40">
                <Settings className="text-white animate-spin-slow" size={20} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-black text-slate-900 leading-none">WMK <span className="text-blue-600">TRUST</span></p>
              <p className="text-[10px] text-slate-500 font-bold tracking-tighter uppercase">V3.0 Smart Portal</p>
            </div>
          </Link>

          {/* --- Desktop Floating Links --- */}
          <div className="hidden lg:flex items-center gap-2 p-1 bg-slate-200/30 rounded-2xl border border-white/50">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                  pathname === link.path 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {link.icon} {link.name}
              </Link>
            ))}
          </div>

          {/* --- User/Admin Actions --- */}
          <div className="flex items-center gap-3">
            {admin ? (
              <div className="flex items-center gap-2">
                <Link 
                  href="/dashboard"
                  className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-xs font-black hover:bg-blue-600 transition-all shadow-lg"
                >
                  <LayoutGrid size={14} /> ড্যাশবোর্ড
                </Link>
                <button 
                  onClick={() => { localStorage.clear(); window.location.reload(); }}
                  className="w-11 h-11 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all shadow-inner"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link 
                href="/admin"
                className="group flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-2xl text-xs font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
              >
                LOGIN <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-11 h-11 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-600 shadow-sm"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* --- Mobile Full-Screen Menu Overlay --- */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="p-6 pt-10 space-y-4">
             {navLinks.map((link) => (
               <Link 
                 key={link.path} 
                 href={link.path}
                 onClick={() => setMenuOpen(false)}
                 className="flex items-center justify-between p-5 bg-white/50 border border-white/40 rounded-3xl font-black text-slate-700 active:scale-95 transition-all"
               >
                 <span className="flex items-center gap-4">{link.icon} {link.name}</span>
                 <ArrowRight size={16} className="text-slate-300" />
               </Link>
             ))}
             {admin && (
               <div className="pt-4 grid grid-cols-2 gap-3">
                 <Link href="/dashboard" className="p-4 bg-blue-600 text-white rounded-3xl text-center font-bold text-xs">Dashboard</Link>
                 <Link href="/add-member" className="p-4 bg-slate-900 text-white rounded-3xl text-center font-bold text-xs">Add Member</Link>
               </div>
             )}
          </div>
        </div>
      </nav>
    </div>
  )
}