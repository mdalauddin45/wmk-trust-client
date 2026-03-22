"use client"

import { useState } from "react"
import { 
  User, MapPin, Phone, ExternalLink, 
  Search, Filter, MoreHorizontal, ArrowUpDown 
} from "lucide-react"
import MemberDetailsModal from "./MemberDetailsModal"


export default function MemberTable() {
  const [selected, setSelected] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const sortedMembers = [...members]
    .filter(m => 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.trustId.includes(searchTerm)
    )
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="space-y-6">
      
  {/* Table */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[11px] uppercase font-black border-b">
                  <th className="px-8 py-6">Member ID</th>
                  <th className="px-8 py-6">Member Info</th>
                  <th className="px-8 py-6">Payment Status</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {centerMembers.map((member) => (
                  <tr key={member._id} className="hover:bg-blue-50 transition">

                    {/* ID */}
                    <td className="px-8 py-5">
                      <span className="font-mono text-xs bg-slate-100 px-3 py-1 rounded-xl">
                        {member.memberId}
                      </span>
                    </td>

                    {/* Name */}
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                          {member.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold">{member.name}</p>
                          <p className="text-xs text-gray-400">Verified Member</p>
                        </div>
                      </div>
                    </td>

                    {/* Payment */}
                    <td className="px-8 py-5">
                      <div
                        className={`px-4 py-1 rounded-full text-xs font-bold ${
                          member.payment > 0
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        ৳{member.payment} — {member.payment > 0 ? "Paid" : "Due"}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-8 py-5 text-right">
                      <button
                        onClick={() => setSelectedMember(member)}
                        className="bg-black text-white px-4 py-2 rounded-xl text-xs hover:bg-blue-600"
                      >
                        Details <ExternalLink size={12} />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      
      {/* Modal Integration */}
      <MemberDetailsModal
        member={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  )
}