"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import MemberDetailsModal from "@/components/MemberDetailsModal";
import MemberTable from "@/components/MemberTable"; // Import the table component
import {
  ArrowLeft,
  Search,
  Users,
  CheckCircle2,
  AlertCircle,
  Download,
} from "lucide-react";

export default function CenterPage() {
  const params = useParams();
  const router = useRouter();
  const centerId = Number(params.id);

  const [members, setMembers] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Load members
  useEffect(() => {
    fetch("http://localhost:5000/members")
      .then((res) => res.json())
      .then((data) => {
        setMembers(data);
        setLoading(false);
        console.log("Members loaded:", data);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // ✅ Filter & Search logic
  const centerMembers = useMemo(() => {
    return members
      .filter((member) => {
        if (member.centerId !== undefined && member.centerId !== null) {
          return Number(member.centerId) === centerId;
        }
        if (member.center) {
          const extracted = parseInt(member.center.split(" ")[1]);
          return extracted === centerId;
        }
        return false;
      })
      .filter((m) => {
        const query = search.toLowerCase();
        return (
          m.name?.toLowerCase().includes(query) ||
          m.memberId?.toLowerCase().includes(query) ||
          m.trustId?.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [members, centerId, search]);

  const totalPaid = centerMembers.filter((m) => m.payment > 0).length;
  const totalDue = centerMembers.length - totalPaid;

  if (loading) return <div className="p-10 text-center text-gray-500">Loading members...</div>;

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <button
              onClick={() => router.back()}
              className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm transition-all"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back to Centers
            </button>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Center <span className="text-blue-600">#{centerId}</span> Dashboard
            </h1>
            <p className="text-slate-500 font-medium">এখান থেকে সেন্টারের সকল মেম্বার এবং পেমেন্ট স্ট্যাটাস পরিচালনা করুন।</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text" placeholder="মেম্বার খুঁজুন..."
                className="bg-white border border-slate-200 pl-10 pr-4 py-3 rounded-2xl w-full md:w-64 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm"
                value={search} onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
              <Download size={20} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Members" value={centerMembers.length} icon={<Users />} color="blue" />
          <StatCard title="Total Paid" value={totalPaid} icon={<CheckCircle2 />} color="emerald" />
          <StatCard title="Total Due" value={totalDue} icon={<AlertCircle />} color="rose" />
        </div>

        {/* Updated Table Component */}
        <MemberTable 
          members={centerMembers} 
          onSelectMember={(member) => setSelectedMember(member)} 
        />
      </div>

      <MemberDetailsModal member={selectedMember} onClose={() => setSelectedMember(null)} />
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  const colors: any = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    rose: "bg-rose-50 text-rose-600",
  };
  return (
    <div className={`p-6 rounded-2xl ${colors[color]} flex justify-between`}>
      <div>
        <p className="text-xs font-bold">{title}</p>
        <h3 className="text-3xl font-bold">{value}</h3>
      </div>
      <div>{icon}</div>
    </div>
  );
}