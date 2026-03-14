type Props = {
name:string
region:string
fund:number
}

export default function CenterCard({name,region,fund}:Props){

return(

<div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">

<h3 className="font-bold text-lg">
{name}
</h3>

<p className="text-sm text-slate-500">
Region: {region}
</p>

<p className="mt-3 font-bold text-blue-600">
৳{fund}
</p>

</div>

)

}
