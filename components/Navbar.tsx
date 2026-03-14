"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {

const pathname = usePathname()

const linkClass = (path:string) =>
`font-medium transition ${
pathname === path
? "text-blue-600"
: "text-slate-600 hover:text-blue-600"
}`

return (

<nav className="bg-white border-b shadow-sm">

<div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

{/* Logo */}

<div className="flex items-center gap-2">

<div className="bg-blue-600 text-white px-3 py-1 rounded-md font-bold">
WMK
</div>

<span className="font-bold text-lg text-slate-800">
TRUST
</span>

</div>


{/* Navigation Links */}

<div className="flex gap-8">

<Link href="/" className={linkClass("/")}>
Home
</Link>

<Link href="/about" className={linkClass("/about")}>
About
</Link>

<Link href="/dashboard" className={linkClass("/dashboard")}>
Finance
</Link>

</div>


{/* Admin badge */}

<div className="hidden md:block">

<span className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm font-semibold">
Admin Mode
</span>

</div>

</div>

</nav>

)

}
