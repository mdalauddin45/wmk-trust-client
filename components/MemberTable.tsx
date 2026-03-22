"use client";

import { ExternalLink } from "lucide-react";

interface MemberTableProps {
  members: any[];
  onSelectMember: (member: any) => void;
}

export default function MemberTable({ members, onSelectMember }: MemberTableProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl md:rounded-[2.5rem] shadow-sm overflow-hidden">
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-[10px] md:text-[11px] uppercase font-black border-b">
                <th className="px-4 md:px-8 py-4 md:py-6">Member ID</th>
                <th className="px-4 md:px-8 py-4 md:py-6">Member Info</th>
                {/* মোবাইল স্ক্রিনে এই কলামটি হাইড থাকবে, বড় স্ক্রিনে দেখাবে */}
                <th className="hidden sm:table-cell px-8 py-6">Payment Status</th>
                <th className="px-4 md:px-8 py-4 md:py-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {members.length > 0 ? (
                members.map((member) => (
                  <tr key={member._id} className="hover:bg-blue-50 transition">
                    {/* ID */}
                    <td className="px-4 md:px-8 py-4 md:py-5">
                      <span className="font-mono text-[10px] md:text-xs bg-slate-100 px-2 md:px-3 py-1 rounded-lg md:xl">
                        {member.memberId || member.trustId}
                      </span>
                    </td>

                    {/* Name & Payment Status (Combined for Mobile) */}
                    <td className="px-4 md:px-8 py-4 md:py-5">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="min-w-[32px] h-8 md:w-10 md:h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm md:text-base">
                          {member.name?.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <p className="font-bold text-sm md:text-base line-clamp-1">{member.name}</p>
                          {/* শুধুমাত্র মোবাইলে পেমেন্ট স্ট্যাটাস নামের নিচে দেখাবে */}
                          <div className="sm:hidden mt-1">
                             <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                member.payment > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                             }`}>
                               ৳{member.payment || 0} — {member.payment > 0 ? "Paid" : "Due"}
                             </span>
                          </div>
                          <p className="hidden md:block text-xs text-gray-400">Verified Member</p>
                        </div>
                      </div>
                    </td>

                    {/* Payment Status (Desktop only) */}
                    <td className="hidden sm:table-cell px-8 py-5">
                      <div
                        className={`inline-block px-4 py-1 rounded-full text-xs font-bold ${
                          member.payment > 0
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        ৳{member.payment || 0} — {member.payment > 0 ? "Paid" : "Due"}
                      </div>
                    </td>

                    {/* Action */}
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
                ))
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