"use client";

import { useEffect, useState } from "react";
import { CreditCard, X } from "lucide-react";

export default function MemberDetailsModal({ member, onClose }: any) {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Scroll lock
  useEffect(() => {
    if (member) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [member]);

  // ✅ Fetch payments dynamically
  useEffect(() => {
    if (!member?._id) return;

    setLoading(true);

    fetch(`http://localhost:5000/payments/${member._id}`)
      .then((res) => res.json())
      .then((data) => setPayments(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [member]);

  if (!member) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-[500px] rounded-[3rem] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-700 to-indigo-800 p-8 text-white">
          <button onClick={onClose} className="absolute top-6 right-6">
            <X size={20} />
          </button>

          <div className="text-center">
            <h2 className="text-2xl font-black">{member.name}</h2>
            <p className="text-xs mt-2">
              ID: {member.memberId || member.trustId}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {/* Contact */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-gray-400">Location</p>
              <p className="font-bold">{member.address}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-gray-400">Phone</p>
              <p className="font-bold">{member.phone}</p>
            </div>
          </div>

          {/* Payments */}
          <div>
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <CreditCard size={18} /> Transaction Log
            </h3>

            <div className="max-h-[220px] overflow-y-auto space-y-2">
              {loading && (
                <p className="text-center text-gray-400">Loading...</p>
              )}

              {payments.length > 0
                ? payments.map((p, i) => (
                    <div
                      key={i}
                      className="flex justify-between p-3 border rounded-xl"
                    >
                      <div>
                        <p className="font-bold">
                          {new Date(p.date).toLocaleString("default", {
                            month: "long",
                          })}
                        </p>
                        <p className="text-xs text-gray-400">Monthly Fee</p>
                      </div>

                      <div className="text-right">
                        <p className="font-bold">৳{p.amount}</p>
                        <span className="text-green-500 text-xs">Paid</span>
                      </div>
                    </div>
                  ))
                : !loading && (
                    <div className="text-center text-gray-400 py-6">
                      No history available
                    </div>
                  )}
            </div>
          </div>

          {/* Button */}
          <button
            onClick={onClose}
            className="w-full bg-black text-white py-3 rounded-xl"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
