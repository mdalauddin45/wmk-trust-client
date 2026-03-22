import CenterCard from "@/components/CenterCard";

const centers = Array.from({ length: 17 }, (_, i) => ({
  id: i + 1,
  name: `Center ${i + 1}`,
}));

export default function Dashboard() {
  return (
    <div className="grid grid-cols-4 gap-6">
      {centers.map((center) => (
        <CenterCard key={center.id} {...center} />
      ))}
    </div>
  );
}
