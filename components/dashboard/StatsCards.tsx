export default function StatsCards(){

const stats = [

{
title:"Total Members",
value:"34,000"
},

{
title:"Total Centers",
value:"17"
},

{
title:"Total Fund",
value:"৳12,40,00,000"
},

{
title:"Monthly Collection",
value:"৳5,20,000"
}

]

return(

<div className="grid grid-cols-4 gap-6">

{stats.map((s,i)=>(

<div
key={i}
className="bg-white p-6 rounded-xl shadow"
>

<p className="text-slate-500 text-sm">
{s.title}
</p>

<h3 className="text-2xl font-bold">
{s.value}
</h3>

</div>

))}

</div>

)

}
