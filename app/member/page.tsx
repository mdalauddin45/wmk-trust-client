"use client"

import { useParams } from "next/navigation"

export default function MemberDetails(){

const params = useParams()

const payments = [

{
month:"January",
amount:500
},

{
month:"February",
amount:500
},

{
month:"March",
amount:500
}

]

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">
Member {params.id} Payment History
</h1>


<table className="w-full bg-white shadow rounded-xl">

<thead className="bg-slate-100">

<tr>

<th className="p-4">Month</th>
<th>Amount</th>

</tr>

</thead>

<tbody>

{payments.map((p,i)=>(

<tr key={i} className="border-t">

<td className="p-4">{p.month}</td>

<td>৳{p.amount}</td>

</tr>

))}

</tbody>

</table>

</div>

)

}
