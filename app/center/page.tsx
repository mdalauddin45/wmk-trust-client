"use client"

import { useParams } from "next/navigation"
import MemberTable from "@/components/MemberTable"

export default function CenterPage(){

const params = useParams()

const centerId = params.id

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">
Center {centerId} Members
</h1>

<MemberTable/>

</div>

)

}
