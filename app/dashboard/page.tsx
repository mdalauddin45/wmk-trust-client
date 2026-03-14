"use client"

import DashboardHeader from "@/components/dashboard/DashboardHeader"
import StatsCards from "@/components/dashboard/StatsCards"
import CenterGrid from "@/components/dashboard/CenterGrid"
import MemberTable from "@/components/MemberTable"

export default function Dashboard(){

return(

<div className="p-10 space-y-10">

<DashboardHeader/>

<StatsCards/>

<CenterGrid/>

<MemberTable/>

</div>

)

}
