"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutGrid,
  UserPlus,
  CreditCard,
  Zap,
  Settings,
  Menu,
  X,
  LogOut,
  ArrowRight,
  Info,
} from "lucide-react";

export default function Navbar() {
  const [admin, setAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false); // মোডাল স্টেট ট্র্যাকার
  const [showInfo, setShowInfo] = useState(false);
  const [adminInfo, setAdminInfo] = useState<any>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  useEffect(() => {
    // স্ক্রল হ্যান্ডলার
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // এডমিন চেক
    const role = localStorage.getItem("role");
    if (role === "main_admin" || role === "center_admin") {
      setAdmin(true);
    }

    // মোডাল ডিটেক্টর: বডিতে 'overflow: hidden' আছে কিনা তা পর্যবেক্ষণ করবে
    const checkModal = () => {
      const isHidden =
        window.getComputedStyle(document.body).overflow === "hidden";
      setIsModalActive(isHidden);
    };

    // প্রতিবার বডি স্টাইল পরিবর্তন হলে এটি চেক করবে
    const observer = new MutationObserver(checkModal);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { name: "হোম", path: "/", icon: <Home size={18} /> },
    { name: "পেমেন্ট", path: "/add-payment", icon: <CreditCard size={18} /> },
    { name: "প্রকল্প", path: "/projects", icon: <Zap size={18} /> },
    { name: "সদস্য", path: "/add-member", icon: <UserPlus size={18} /> },
    { name: "ড্যাশবোর্ড", path: "/dashboard", icon: <LayoutGrid size={18} /> },
  ];

  return (
    // isModalActive true হলে opacity-0 এবং pointer-events-none হয়ে যাবে
    <div
      className={`fixed top-6 left-0 right-0 px-6 transition-all duration-500 ease-in-out ${
        isModalActive
          ? "z-0 opacity-0 pointer-events-none translate-y-[-20px]"
          : "z-[100] opacity-100 translate-y-0"
      }`}
    >
      <nav
        className={`max-w-7xl mx-auto transition-all duration-500 ease-in-out ${
          scrolled
            ? "bg-white/70 backdrop-blur-2xl py-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/20 rounded-[2rem]"
            : "bg-white/40 backdrop-blur-md py-4 border border-white/10 rounded-3xl"
        }`}
      >
        <div className="px-6 flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-all duration-500 shadow-lg shadow-blue-500/40">
                <Settings className="text-white animate-spin-slow" size={20} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <p className="text-sm font-black text-slate-900">
                WMK <span className="text-blue-600">TRUST</span>
              </p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                V3.0 Smart Portal
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
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

          {/* Actions */}
          <div className="flex items-center gap-3">
            {admin && (
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="w-10 h-10 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all shadow-inner"
              >
                <LogOut size={18} />
              </button>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-11 h-11 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-600 shadow-sm"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            menuOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="p-6 pt-10 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between p-5 rounded-3xl font-black transition-all ${
                  pathname === link.path
                    ? "bg-blue-600 text-white"
                    : "bg-white/50 text-slate-700 border border-white/40 shadow-sm"
                }`}
              >
                <span className="flex items-center gap-4">
                  {link.icon} {link.name}
                </span>
                <ArrowRight
                  size={16}
                  className={
                    pathname === link.path ? "text-white" : "text-slate-300"
                  }
                />
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
