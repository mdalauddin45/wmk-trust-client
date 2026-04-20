"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CreditCard,
  Calendar,
  ArrowLeft,
  Download,
  CheckCircle2,
  User,
  Filter,
} from "lucide-react";
import Link from "next/link";

export default function MemberDetails() {
  const params = useParams();

  const [member, setMember] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);

  // ✅ Load Member Info (FIXED)
  useEffect(() => {
    if (!params.id) return;

    fetch(`https://wmk-trust-backend.onrender.com/api/members/${params.id}`)
      .then((res) => res.json())
      .then((data) => setMember(data?.data || data)) // ✅ FIX
      .catch((err) => console.error(err));
  }, [params.id]);

  // ✅ Load Payment History (FIXED)
  useEffect(() => {
    if (!member?.memberId) return;

    fetch(
      `https://wmk-trust-backend.onrender.com/api/payments/member/${member.memberId}`
    )
      .then((res) => res.json())
      .then((data) => setPayments(data?.data || [])) // ✅ FIX
      .catch((err) => console.error(err));
  }, [member]);

  // ✅ Total Amount
  const totalAmount = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-2 text-sm font-medium"
            >
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>

            <h1 className="text-3xl font-black text-slate-900">
              Member <span className="text-blue-600">#{member?.memberId}</span> Profile
            </h1>
          </div>

          <button className="flex items-center gap-2 bg-white border px-5 py-2.5 rounded-xl font-bold">
            <Download size={18} /> Download Statement
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-[2rem] text-white">
            <div className="flex justify-between mb-4">
              <User size={24} />
              <span className="text-xs bg-emerald-500/20 px-3 py-1 rounded-full">
                {member?.status || "Active"}
              </span>
            </div>

            <p>Total Contributed</p>
            <h2 className="text-3xl font-black">৳{totalAmount}</h2>
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-[2rem] flex justify-between">

            <div>
              <p>Monthly Installment</p>
              <h3 className="text-2xl font-black">৳500</h3>
            </div>

            <div>
              <p>Joined Date</p>
              <h3 className="text-xl font-bold">
                {member?.createdAt
                  ? new Date(member.createdAt).toLocaleDateString()
                  : "-"}
              </h3>
            </div>

          </div>
        </div>

        {/* Payment Table */}
        <div className="bg-white rounded-[2.5rem] overflow-hidden">

          <div className="p-6 border-b flex justify-between">
            <h3 className="font-bold flex items-center gap-2">
              <CreditCard size={18} /> Payment History
            </h3>
            <Filter size={18} />
          </div>

          <table className="w-full">
            <thead>
              <tr className="text-xs uppercase">
                <th className="px-8 py-5">Month / Date</th>
                <th className="px-8 py-5">Transaction ID</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Amount</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p, i) => (
                <tr key={i} className="border-t">

                  <td className="px-8 py-5">
                    <div className="flex gap-3">
                      <Calendar size={18} />
                      <div>
                        <p>{p.month || "-"}</p>
                        <p className="text-xs text-gray-400">
                          {p.date ? new Date(p.date).toLocaleDateString() : "-"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-5">
                    <code>{p.tranId || p._id?.toString().slice(-6)}</code>
                  </td>

                  <td className="px-8 py-5">
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 size={14} /> {p.status || "Paid"}
                    </div>
                  </td>

                  <td className="px-8 py-5 text-right">
                    ৳{p.amount}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          <div className="p-6 text-center">
            <button className="text-blue-600 font-bold">
              View Full Report
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}