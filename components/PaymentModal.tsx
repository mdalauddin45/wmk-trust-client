"use client"

import { useState } from "react"

type Props = {
isOpen: boolean
onClose: () => void
}

export default function PaymentModal({isOpen,onClose}:Props){

const [memberId,setMemberId] = useState("")
const [amount,setAmount] = useState("")
const [month,setMonth] = useState("")

if(!isOpen) return null

function handleSubmit(e:React.FormEvent){

e.preventDefault()

console.log({
memberId,
amount,
month
})

alert("Payment Submitted")

setMemberId("")
setAmount("")
setMonth("")

onClose()

}

return(

<div className="fixed inset-0 z-50 flex items-center justify-center">

{/* Background */}

<div
className="absolute inset-0 bg-black/50"
onClick={onClose}
/>


{/* Modal */}

<div className="relative bg-white rounded-xl w-full max-w-md p-6 shadow-lg">

{/* Header */}

<div className="flex justify-between items-center mb-6">

<h2 className="text-lg font-bold">
Submit Monthly Payment
</h2>

<button
onClick={onClose}
className="text-slate-500 hover:text-black"
>
✕
</button>

</div>


{/* Form */}

<form onSubmit={handleSubmit} className="space-y-4">

<div>

<label className="block text-sm font-medium mb-1">
Member ID
</label>

<input
type="text"
required
value={memberId}
onChange={(e)=>setMemberId(e.target.value)}
className="w-full border rounded-lg px-3 py-2"
/>

</div>


<div>

<label className="block text-sm font-medium mb-1">
Month
</label>

<input
type="month"
required
value={month}
onChange={(e)=>setMonth(e.target.value)}
className="w-full border rounded-lg px-3 py-2"
/>

</div>


<div>

<label className="block text-sm font-medium mb-1">
Amount
</label>

<input
type="number"
required
value={amount}
onChange={(e)=>setAmount(e.target.value)}
className="w-full border rounded-lg px-3 py-2"
/>

</div>


<button
type="submit"
className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
>
Submit Payment
</button>

</form>

</div>

</div>

)

}
