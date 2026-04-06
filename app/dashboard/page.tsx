"use client";

import { useEffect, useState, useMemo } from "react";
import CenterCard from "@/components/CenterCard";

export default function Dashboard() {
  const [centers, setCenters] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ১. লোকাল স্টোরেজ থেকে এডমিন/ইউজার ডাটা লোড করা
    const adminData = localStorage.getItem("admin"); // আপনার কি (key) অনুযায়ী 'admin' ব্যবহার করা হয়েছে

    if (adminData) {
      try {
        const parsedUser = JSON.parse(adminData);
        setUser(parsedUser);
        console.log("✅ Admin Info Loaded:", parsedUser);
      } catch (err) {
        console.error("❌ Error parsing admin data:", err);
      }
    } else {
      console.log("❌ No admin found in localStorage");
    }

    // ২. ব্যাকএন্ড থেকে সেন্টারের ডাটা ফেচ করা
    fetch("http://localhost:5000/centers")
      .then((res) => res.json())
      .then((data) => {
        setCenters(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Fetch error:", err);
        setLoading(false);
      });
  }, []);

  // ✅ রোল অনুযায়ী ফিল্টারিং লজিক
  const filteredCenters = useMemo(() => {
    if (!user || centers.length === 0) return [];

    // মেইন এডমিন হলে সব সেন্টার দেখাবে
    if (user.role === "main_admin") {
      return centers;
    }

    // সেন্টার এডমিন হলে তার নির্ধারিত সেন্টার ফিল্টার করবে
    if (user.role === "center_admin") {
      return centers.filter((center) => {
        // ডাটাবেস অনুযায়ী ইউজারের 'center' ফিল্ডে আইডি থাকে (যেমন: "10")
        // এবং সেন্টারের 'centerId' নাম্বার হতে পারে (যেমন: 10)
        return String(center.centerId) === String(user.center);
      });
    }

    return [];
  }, [centers, user]);

  // ৩. লোডিং স্টেট হ্যান্ডলিং
  if (loading) {
    return (
      <div className="p-10 text-center text-slate-500 font-medium">
        Loading WMK Trust Dashboard...
      </div>
    );
  }

  // ৪. ইউজার লগইন না থাকলে এরর মেসেজ
  if (!user) {
    return (
      <div className="p-10 text-center text-rose-500 font-bold">
        Error: User information not found. Please log in again.
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Welcome, <span className="text-blue-600">{user.name}</span>
        </h1>
        <p className="text-slate-500 mt-1">
          {user.role === "main_admin"
            ? "সবগুলো সেন্টারের বর্তমান অবস্থা এখান থেকে পর্যবেক্ষণ করুন।"
            : `আপনার নির্ধারিত সেন্টার ইউনিটের (${user.center}) ডাটা ম্যানেজ করুন।`}
        </p>
      </div>

      {/* Dynamic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredCenters.length > 0 ? (
          filteredCenters.map((center) => (
            <CenterCard
              key={center._id}
              id={center.centerId}
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