"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, Mail, Eye, EyeOff, ShieldCheck } from "lucide-react"

export default function AdminLogin() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      alert("Email এবং Password দিন")
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch(
        "https://wmk-trust-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Login failed")
      }

      // ✅ safer check
      if (!data.token) {
        throw new Error("Token not received")
      }

      // ✅ SAVE
      localStorage.setItem("token", data.token)
      localStorage.setItem("role", data.admin?.role || "")
      localStorage.setItem("admin", JSON.stringify(data.admin || {}))

      console.log("✅ TOKEN SAVED:", data.token)

      // ✅ redirect
      router.push("/dashboard")

    } catch (error: any) {
      console.error(error)
      alert(error.message || "Server error")
    } finally {
      setIsLoading(false) // 🔥 FIX
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0f1d] relative overflow-hidden">
      
      <div className="relative z-10 w-full max-w-md px-6">
        
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl mb-4">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black text-white">
            WMK <span className="text-blue-500">ADMIN</span>
          </h1>
        </div>

        <div className="bg-slate-900/50 p-8 rounded-[2.5rem]">
          <form onSubmit={handleLogin} className="space-y-6">
            
            <input
              required
              type="email"
              placeholder="Email"
              className="w-full p-4 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              required
              type="password"
              placeholder="Password"
              className="w-full p-4 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}