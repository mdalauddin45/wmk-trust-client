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
  const [centers, setCenters] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ FIXED FETCH
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membersRes, paymentsRes, centersRes] = await Promise.all([
          fetch("https://wmk-trust-backend.onrender.com/api/members"),
          fetch("https://wmk-trust-backend.onrender.com/api/payments"),
          fetch("https://wmk-trust-backend.onrender.com/api/centers")
        ]);

        const membersData = await membersRes.json();
        const paymentsData = await paymentsRes.json();
        const centersData = await centersRes.json();

        setMembers(membersData?.data || []);
        setPayments(paymentsData?.data || []);
        setCenters(centersData?.data || centersData || []);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ FILTER
  const centerMembers = useMemo(() => {
    return members
      .filter((m) => Number(m.centerId) === centerId)
      .filter((m) => {
        const q = search.toLowerCase();
        return (
          m.name?.toLowerCase().includes(q) ||
          String(m.memberId).toLowerCase().includes(q)
        );
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [members, centerId, search]);

  // ✅ CENTER NAME FIX
  const currentCenterName = useMemo(() => {
    const c = centers.find(
      (x) => String(x._id) === String(centerId) || x.name?.includes(centerId)
    );
    return c ? c.name : `Center ${centerId}`;
  }, [centers, centerId]);

  // ✅ STATS FIX
  const stats = useMemo(() => {
    const currentMonth = new Date().toLocaleString("en-US", { month: "long" });

    const paidCount = centerMembers.filter((member) =>
      payments.some(
        (p) =>
          p.memberId === member.memberId &&
          p.month === currentMonth &&
          p.status === "Paid"
      )
    ).length;

    return {
      totalPaid: paidCount,
      totalDue: centerMembers.length - paidCount
    };
  }, [centerMembers, payments]);

  if (loading)
    return <div className="p-10 text-center text-gray-500 font-bold">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm"
            >
              <ArrowLeft size={18} />
              Back to Centers
            </button>

            <h1 className="text-4xl font-black text-slate-900">
              <span className="text-blue-600">{currentCenterName}</span> Dashboard
            </h1>

            <p className="text-slate-500">
              সেন্টারের সকল মেম্বার এবং পেমেন্ট স্ট্যাটাস পরিচালনা করুন।
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="মেম্বার খুঁজুন..."
                className="bg-white border pl-10 pr-4 py-3 rounded-2xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button className="p-3 bg-white border rounded-2xl">
              <Download size={20} />
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Members" value={centerMembers.length} icon={<Users />} color="blue" />
          <StatCard title="Total Paid" value={stats.totalPaid} icon={<CheckCircle2 />} color="emerald" />
          <StatCard title="Total Due" value={stats.totalDue} icon={<AlertCircle />} color="rose" />
        </div>

        {/* TABLE */}
        <MemberTable
          members={centerMembers}
          onSelectMember={(m) => setSelectedMember(m)}
        />
      </div>

      <MemberDetailsModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
}

// stat card
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
        <h3 className="text-3xl font-black">{value}</h3>
      </div>
      <div>{icon}</div>
    </div>
  );
}