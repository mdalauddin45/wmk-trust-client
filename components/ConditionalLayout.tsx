// components/ConditionalLayout.tsx
"use client"
import { usePathname } from "next/navigation"
import Navbar from "@/components/Navbar"

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideNavbarOn = ["/admin"]
  const isHidden = hideNavbarOn.includes(pathname)

  return (
    <>
      {!isHidden && <Navbar />}
      <main className={`
        relative transition-all duration-500
        ${isHidden 
          ? "w-full min-h-screen" 
          : "max-w-7xl mx-auto px-4 md:px-8 pt-36 pb-20 z-0"
        }
      `}>
        {children}
      </main>

      {!isHidden && (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-blue-400/5 blur-[120px] pointer-events-none -z-10" />
      )}
    </>
  )
}