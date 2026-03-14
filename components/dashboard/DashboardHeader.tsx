"use client"

import { useState } from "react"
import PaymentModal from "../PaymentModal"

export default function DashboardHeader(){

const [open,setOpen] = useState(false)

return(

<div className="flex justify-between items-center">

<div>

<h1 className="text-3xl font-bold">
Finance Dashboard
</h1>

<p className="text-slate-500">
17 Data Centers • 34,000 Members
</p>

</div>

<button
onClick={()=>setOpen(true)}
className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
>
Add Payment
</button>

<PaymentModal
isOpen={open}
onClose={()=>setOpen(false)}
/>

</div>

)

}
