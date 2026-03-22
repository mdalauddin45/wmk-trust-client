"use client"

import { useEffect, useState } from "react"
import CenterCard from "@/components/CenterCard"

export default function Dashboard() {
  const [centers, setCenters] = useState<any[]>([])

  useEffect(() => {
    fetch("http://localhost:5000/centers") // 🔥 backend API
      .then(res => res.json())
      .then(data => setCenters(data))
      .catch(err => console.error(err))
  }, [])
  return (
    <div className="grid grid-cols-4 gap-6">
      {centers?.map((center) => (
        <CenterCard
          key={center?._id }
          id={center?.centerId}
          name={center?.name}
        />
      ))}
    </div>
  )
}