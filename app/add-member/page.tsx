"use client";

import { useEffect, useState } from "react";
import { UserPlus, Phone } from "lucide-react";
import toast from "react-hot-toast";

export default function AddMember() {
  const [allMembers, setAllMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [registeredId, setRegisteredId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    center: "",
    mobile: "",
    bloodGroup: "",
    status: "Active",
  });

  // ✅ FIXED FETCH (TOKEN ADDED)
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://wmk-trust-backend.onrender.com/api/members",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        setAllMembers(data?.data || []);
        
      } catch (err) {
        console.error(err);
      }
    };

    fetchMembers();
  }, []);

  // input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.center) {
      alert("সেন্টার সিলেক্ট করুন");
      return;
    }

    setLoading(true);

    const newMember = {
      name: formData.name,
      centerId: Number(formData.center),
      mobile: formData.mobile,
      bloodGroup: formData.bloodGroup,
      status: formData.status,
    };

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://wmk-trust-backend.onrender.com/api/members",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
          body: JSON.stringify(newMember),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      // ✅ FIX: correct update
      setAllMembers((prev) => [...prev, data.data]);

      setRegisteredId(data.data.memberId); // backend generated ID
      setShowSuccess(true);

      setFormData({
        name: "",
        center: "",
        mobile: "",
        bloodGroup: "",
        status: "Active",
      });
      toast.success("✅ Member added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("❌ Error adding member");
    } finally {
      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100">
        <div className="bg-blue-600 p-8 text-white text-center">
          <UserPlus className="w-12 h-12 mx-auto mb-3 opacity-90" />
          <h1 className="text-3xl font-bold">নতুন সদস্য ফরম</h1>
        </div>

        <div className="p-8">
          {/* COUNTER */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-2xl">
              <p className="text-xs">Next ID</p>
              <p className="text-xl font-bold">
                WMK-{1000 + allMembers.length + 1}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl">
              <p className="text-xs">Total Members</p>
              <p className="text-xl font-bold">
                {allMembers.length === 0 ? "Loading..." : allMembers.length}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              required
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />

            <input
              required
              name="mobile"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />

            <select
              required
              name="center"
              value={formData.center}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            >
              <option value="">Center</option>
              {[...Array(10)].map((_, i) => (
                <option key={i} value={i + 1}>
                  Center {i + 1}
                </option>
              ))}
            </select>

            <button className="w-full bg-blue-600 text-white py-3 rounded-xl">
              {loading ? "Processing..." : "Submit"}
            </button>
          </form>
        </div>
      </div>

      {/* SUCCESS */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-2xl text-center">
            <h2 className="text-xl font-bold mb-2">Success</h2>
            <p>ID: {registeredId}</p>
            <button onClick={() => setShowSuccess(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}