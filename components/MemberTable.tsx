"use client"

import { useRouter } from "next/navigation"

export default function MemberTable(){

const router = useRouter()

const members = [

{
id:1,
name:"Abdur Rahman",
trustId:"WMK-1001",
lastPayment:500
},

{
id:2,
name:"Maria Sultana",
trustId:"WMK-1002",
lastPayment:500
}

]

return(

<table className="w-full bg-white shadow rounded-xl">

<thead className="bg-slate-100">

<tr>

<th className="p-4">ID</th>
<th>Name</th>
<th>Last Payment</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{members.map(member => (

<tr key={member.id} className="border-t">

<td className="p-4">{member.trustId}</td>

<td>{member.name}</td>

<td>৳{member.lastPayment}</td>

<td>

<button
onClick={()=>router.push(`/member/${member.id}`)}
className="text-blue-600"
>
View Details
</button>

</td>

</tr>

))}

</tbody>

</table>

)

}
