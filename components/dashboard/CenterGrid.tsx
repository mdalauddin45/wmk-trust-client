import CenterCard from "../CenterCard"

export default function CenterGrid(){

const centers = [

{
name:"Center 01",
region:"North",
fund:1200000
},

{
name:"Center 02",
region:"South",
fund:950000
},

{
name:"Center 03",
region:"East",
fund:1500000
},

{
name:"Center 04",
region:"West",
fund:820000
}

]

return(

<div>

<h2 className="text-xl font-bold mb-4">
Data Centers
</h2>

<div className="grid grid-cols-4 gap-6">

{centers.map((c,i)=>(
<CenterCard key={i} {...c}/>
))}

</div>

</div>

)

}
