"use client"

import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"

export default function HomePage() {

const router = useRouter()

return (

<div className="min-h-screen bg-slate-50">

<Navbar/>

{/* Hero Section */}

<section className="bg-blue-900 text-white py-24">

<div className="max-w-7xl mx-auto px-6">

<h1 className="text-5xl font-bold mb-6">
জনকল্যাণে আমরা <br/>
<span className="text-blue-400">
নিশ্চিত আগামীর লক্ষ্যে
</span>
</h1>

<p className="max-w-xl text-lg text-slate-200 mb-8">
WMK Trust দেশের বিভিন্ন ডাটা সেন্টারের মাধ্যমে
হাজার হাজার মানুষের আর্থিক ব্যবস্থাপনা পরিচালনা করছে।
</p>

<div className="flex gap-4">

<button
onClick={()=>router.push("/dashboard")}
className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
>
Finance Dashboard
</button>

<button
onClick={()=>router.push("/about")}
className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-900 transition"
>
About WMK
</button>

</div>

</div>

</section>


{/* Stats Section */}

<section className="py-20">

<div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">

<div className="bg-white p-8 rounded-xl shadow">

<h3 className="text-xl font-bold mb-3">
17 Data Centers
</h3>

<p className="text-slate-600">
সারা দেশে ১৭টি ডাটা সেন্টারের মাধ্যমে
সেবা পরিচালনা করা হচ্ছে।
</p>

</div>


<div className="bg-white p-8 rounded-xl shadow">

<h3 className="text-xl font-bold mb-3">
34,000+ Members
</h3>

<p className="text-slate-600">
সদস্যদের আর্থিক ডাটা সম্পূর্ণভাবে
ডিজিটাল সিস্টেমে সংরক্ষিত।
</p>

</div>


<div className="bg-white p-8 rounded-xl shadow">

<h3 className="text-xl font-bold mb-3">
Financial Transparency
</h3>

<p className="text-slate-600">
প্রতিটি তহবিল লেনদেন স্বচ্ছভাবে
মনিটর করা হয়।
</p>

</div>

</div>

</section>


{/* Footer */}

<footer className="bg-white border-t py-10">

<div className="max-w-7xl mx-auto px-6 flex justify-between">

<p className="text-slate-500">
© 2026 WMK Trust
</p>

<p className="text-slate-500">
Financial Management Portal
</p>

</div>

</footer>


</div>

)

}
