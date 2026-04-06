"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import MemberDetailsModal from "@/components/MemberDetailsModal";
import MemberTable from "@/components/MemberTable";
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
  const [payments, setPayments] = useState<any[]>([]);
  const [centers, setCenters] = useState<any[]>([]); // ✅ সেন্টার লিস্টের জন্য স্টেট
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membersRes, paymentsRes, centersRes] = await Promise.all([
          fetch("http://localhost:5000/members"),
          fetch("http://localhost:5000/payments"),
          fetch("http://localhost:5000/centers") // ✅ সেন্টারের এপিআই কল
        ]);
        
        const membersData = await membersRes.json();
        const paymentsData = await paymentsRes.json();
        const centersData = await centersRes.json();
        
        setMembers(membersData);
        setPayments(paymentsData);
        setCenters(centersData);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ ফিল্টার লজিক
  const centerMembers = useMemo(() => {
    return members
      .filter((member) => {
        const mId = member.centerId !== undefined ? Number(member.centerId) : null;
        if (mId !== null) return mId === centerId;
        
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
          String(m.memberId).toLowerCase().includes(query)
        );
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [members, centerId, search]);

  // ✅ ডাইনামিক সেন্টার নাম (সেন্টার কালেকশন থেকে)
  const currentCenterName = useMemo(() => {
    const centerObj = centers.find(c => Number(c.centerId) === centerId);
    return centerObj ? centerObj.name : `Center #${centerId}`;
  }, [centers, centerId]);

  const stats = useMemo(() => {
    const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
    const currentYear = new Date().getFullYear();

    const paidCount = centerMembers.filter((member) => {
      return payments.some((p) => {
        const pDate = new Date(p.date);
        const isSameMember = String(p.memberId) === String(member._id) || String(p.memberId) === String(member.memberId);
        const isCurrentMonth = p.month === currentMonth && pDate.getFullYear() === currentYear;
        return isSameMember && isCurrentMonth;
      });
    }).length;

    return {
      totalPaid: paidCount,
      totalDue: centerMembers.length - paidCount
    };
  }, [centerMembers, payments]);

  if (loading) return <div className="p-10 text-center text-gray-500 font-bold">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
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
              {/* ✅ এখানে ডাইনামিক নাম বসছে (যেমন: Fatikchari Rural Unit) */}
              <span className="text-blue-600">{currentCenterName}</span>{" "}
              Dashboard
            </h1>
            <p className="text-slate-500 font-medium">
              সেন্টারের সকল মেম্বার এবং পেমেন্ট স্ট্যাটাস পরিচালনা করুন।
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="মেম্বার খুঁজুন..."
                className="bg-white border border-slate-200 pl-10 pr-4 py-3 rounded-2xl w-full md:w-64 outline-none shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 shadow-sm">
              <Download size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Members" value={centerMembers.length} icon={<Users />} color="blue" />
          <StatCard title="Total Paid" value={stats.totalPaid} icon={<CheckCircle2 />} color="emerald" />
          <StatCard title="Total Due" value={stats.totalDue} icon={<AlertCircle />} color="rose" />
        </div>

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
    <div className={`p-6 rounded-2xl ${colors[color]} flex justify-between items-center`}>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-3xl font-black">{value}</h3>
      </div>
      <div className="opacity-80">{icon}</div>
    </div>
  );
}