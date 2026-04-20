"use client";

import { ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

interface MemberTableProps {
  members: any[];
  onSelectMember: (member: any) => void;
}

export default function MemberTable({ members, onSelectMember }: MemberTableProps) {
  const [payments, setPayments] = useState<any[]>([]);

  // ✅ পেমেন্ট ডাটা ফেচ করা
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch("https://wmk-trust-backend.onrender.com/payments");
        const data = await res.json();
        setPayments(data);
      } catch (err) {
        console.error("Error fetching payments:", err);
      }
    };
    fetchPayments();
  }, []);

  // ✅ ডাইনামিক পেমেন্ট স্ট্যাটাস চেক ফাংশন
  const checkPaymentStatus = (member: any) => {
    if (!payments || payments.length === 0) return undefined;

    // বর্তমান মাস (যেমন: April) এবং বছর বের করা
    const currentMonthName = new Date().toLocaleString("en-US", { month: "long" }); // "April"
    const currentYear = new Date().getFullYear();

    return payments.find((p) => {
      const pDate = new Date(p.date);
      
      // আইডি ম্যাচিং: ডাটাবেসের memberId (String) এর সাথে মেম্বারের _id বা memberId চেক
      const isSameMember = 
        String(p.memberId) === String(member._id) || 
        String(p.memberId) === String(member.memberId);
      
      // মাস এবং বছর চেক (আপনার স্ক্রিনশট অনুযায়ী month: "April" ফিল্ড আছে)
      const isSameMonth = p.month === currentMonthName && pDate.getFullYear() === currentYear;

      return isSameMember && isSameMonth;
    });
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl md:rounded-[2.5rem] shadow-sm overflow-hidden">
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-[10px] md:text-[11px] uppercase font-black border-b">
                <th className="px-4 md:px-8 py-4 md:py-6">Member ID</th>
                <th className="px-4 md:px-8 py-4 md:py-6">Member Info</th>
                <th className="hidden sm:table-cell px-8 py-6">Payment Status</th>
                <th className="px-4 md:px-8 py-4 md:py-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {members.length > 0 ? (
                members.map((member) => {
                  const paymentData = checkPaymentStatus(member);
                  const isPaid = !!paymentData;
                  const displayAmount = isPaid ? paymentData.amount : 0;

                  return (
                    <tr key={member._id} className="hover:bg-blue-50 transition">
                      <td className="px-4 md:px-8 py-4 md:py-5">
                        <span className="font-mono text-[10px] md:text-xs bg-slate-100 px-2 md:px-3 py-1 rounded-lg">
                          {member.memberId || member.trustId}
                        </span>
                      </td>

                      <td className="px-4 md:px-8 py-4 md:py-5">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="min-w-[32px] h-8 md:w-10 md:h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm md:text-base">
                            {member.name?.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                            <p className="font-bold text-sm md:text-base line-clamp-1">{member.name}</p>
                            
                            {/* Mobile Payment Status */}
                            <div className="sm:hidden mt-1">
                               <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                 isPaid ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                               }`}>
                                 ৳{displayAmount} — {isPaid ? "Paid" : "Due"}
                               </span>
                            </div>
                            <p className="hidden md:block text-xs text-gray-400">Verified Member</p>
                          </div>
                        </div>
                      </td>

                      {/* Desktop Payment Status */}
                      <td className="hidden sm:table-cell px-8 py-5">
                        <div
                          className={`inline-block px-4 py-1 rounded-full text-xs font-bold ${
                            isPaid
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          ৳{displayAmount} — {isPaid ? "Paid" : "Due"}
                        </div>
                      </td>

                      <td className="px-4 md:px-8 py-4 md:py-5 text-right">
                        <button
                          onClick={() => onSelectMember(member)}
                          className="bg-black text-white p-2 md:px-4 md:py-2 rounded-lg md:rounded-xl text-xs hover:bg-blue-600 transition-all inline-flex items-center gap-2"
                        >
                          <span className="hidden md:inline">Details</span>
                          <ExternalLink size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-20 text-gray-400 text-sm">
                    কোনো সদস্য পাওয়া যায়নি
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}