"use client"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { usePathname } from "next/navigation"

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const hideNavbarOn = ["/admin"]
  const isHidden = hideNavbarOn.includes(pathname)

  return (
    <html lang="en">
      <body className="bg-slate-50 antialiased font-sans text-slate-900 overflow-x-hidden">
        
        {/* কন্ডিশনাল নেববার */}
        {!isHidden && <Navbar />}

        {/* Main Content Container:
          ১. isHidden হলে (Admin Page): কোনো মার্জিন বা প্যাডিং থাকবে না (Full Screen).
          ২. ইউজার পেজ হলে: pt-32 বা pt-40 দেওয়া হয়েছে যাতে Floating Navbar-এর নিচে কার্ডগুলো শুরু হয়।
          ৩. relative z-0 নিশ্চিত করে কার্ডগুলো Navbar (z-100) এর নিচ দিয়ে যাবে।
        */}
        <main className={`
          relative transition-all duration-500
          ${isHidden 
            ? "w-full min-h-screen" 
            : "max-w-7xl mx-auto px-4 md:px-8 pt-36 pb-20 z-0"
          }
        `}>
          {children}
        </main>

        {/* নিচের ডেকোরেটিভ গ্রেডিয়েন্ট (ঐচ্ছিক - প্রিমিয়াম লুকের জন্য) */}
        {!isHidden && (
          <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-blue-400/5 blur-[120px] pointer-events-none -z-10" />
        )}

      </body>
    </html>
  )
}