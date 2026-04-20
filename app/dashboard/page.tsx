"use client";

import { useEffect, useState, useMemo } from "react";
import CenterCard from "@/components/CenterCard";

export default function Dashboard() {
  const [centers, setCenters] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ load user
    const adminData = localStorage.getItem("admin");

    if (adminData) {
      try {
        const parsedUser = JSON.parse(adminData);
        setUser(parsedUser);
      } catch (err) {
        console.error("Parse error:", err);
      }
    }

    // ✅ FIXED API
    fetch("https://wmk-trust-backend.onrender.com/api/centers")
      .then((res) => res.json())
      .then((data) => {
        setCenters(data?.data || data || []); // ✅ FIX
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  // ✅ FIXED FILTER
  const filteredCenters = useMemo(() => {
    if (!user || centers.length === 0) return [];

    // main admin → all
    if (user.role === "main_admin") {
      return centers;
    }

    // center admin → match by name বা id
    if (user.role === "center_admin") {
      return centers.filter((center) => {
        return (
          String(center._id) === String(user.center) ||
          center.name?.includes(user.center)
        );
      });
    }

    return [];
  }, [centers, user]);

  if (loading) {
    return (
      <div className="p-10 text-center text-slate-500 font-medium">
        Loading WMK Trust Dashboard...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-10 text-center text-rose-500 font-bold">
        Error: User information not found. Please log in again.
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Welcome, <span className="text-blue-600">{user.name}</span>
        </h1>
        <p className="text-slate-500 mt-1">
          {user.role === "main_admin"
            ? "সবগুলো সেন্টারের বর্তমান অবস্থা এখান থেকে পর্যবেক্ষণ করুন।"
            : `আপনার নির্ধারিত সেন্টার (${user.center}) ম্যানেজ করুন।`}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredCenters.length > 0 ? (
          filteredCenters.map((center) => (
            <CenterCard
              key={center._id}
              id={center._id} // ✅ FIX
              name={center.name}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-200 rounded-[2rem] bg-white">
            <p className="text-slate-400 font-medium">
              আপনার অ্যাকাউন্টের জন্য কোনো সেন্টার খুঁজে পাওয়া যায়নি।
            </p>
          </div>
        )}
      </div>
    </div>
  );
}