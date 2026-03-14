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
      <body className="bg-slate-50 antialiased font-sans">
        
        {/* কন্ডিশনাল নেববার: যদি এডমিন পাথ না হয় তবেই দেখাবে */}
        {!isHidden && <Navbar />}

        {/* Page Content */}
        {/* এডমিন পেজের জন্য আমরা max-w লিমিট সরিয়ে দিচ্ছি যাতে ফুল স্ক্রিন ডিজাইন পাওয়া যায় */}
        <main className={isHidden ? "w-full" : "max-w-7xl mx-auto px-6 py-6"}>
          {children}
        </main>

      </body>
    </html>
  )
}