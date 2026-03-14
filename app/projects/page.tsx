"use client"

import { 
  HeartHandshake, 
  Users2, 
  Laptop, 
  GraduationCap, 
  Stethoscope, 
  Trees, 
  Briefcase 
} from "lucide-react"

export default function ProjectsSection() {
  const projects = [
    {
      title: "সদস্য আর্থিক সহায়তা",
      enTitle: "Member Financial Support",
      desc: "সদস্যদের আপদকালীন সময়ে সুদমুক্ত ঋণ ও আর্থিক অনুদান প্রদান।",
      icon: <HeartHandshake className="text-rose-600" />,
      tag: "সক্রিয়",
      color: "border-rose-200 bg-rose-50"
    },
    {
      title: "সামাজিক উন্নয়ন",
      enTitle: "Community Development",
      desc: "এলাকা ভিত্তিক রাস্তাঘাট মেরামত ও সামাজিক অবকাঠামো নির্মাণে সহায়তা।",
      icon: <Users2 className="text-blue-600" />,
      tag: "সক্রিয়",
      color: "border-blue-200 bg-blue-50"
    },
    {
      title: "ডিজিটাল ফিন্যান্স",
      enTitle: "Digital Finance Management",
      desc: "অটোমেটেড পেমেন্ট ট্র্যাকিং এবং পেপারলেস ট্রাস্ট ম্যানেজমেন্ট সিস্টেম।",
      icon: <Laptop className="text-purple-600" />,
      tag: "টেকনিক্যাল",
      color: "border-purple-200 bg-purple-50"
    },
    {
      title: "শিক্ষা সহায়তা প্রোগ্রাম",
      enTitle: "Education Support",
      desc: "মেধাবী ও অসচ্ছল শিক্ষার্থীদের বার্ষিক বৃত্তি এবং শিক্ষা উপকরণ প্রদান।",
      icon: <GraduationCap className="text-amber-600" />,
      tag: "বৃত্তি",
      color: "border-amber-200 bg-amber-50"
    },
    {
      title: "স্বাস্থ্য সুরক্ষা সেবা",
      enTitle: "Health Care Support",
      desc: "সদস্য ও তাদের পরিবারের জন্য ফ্রি মেডিকেল ক্যাম্প ও ওষুধ সহায়তা।",
      icon: <Stethoscope className="text-emerald-600" />,
      tag: "স্বাস্থ্য",
      color: "border-emerald-200 bg-emerald-50"
    },
    {
      title: "পরিবেশ ও বৃক্ষরোপণ",
      enTitle: "Green Earth Project",
      desc: "প্রতি বছর ১০,০০০ ফলজ ও বনজ বৃক্ষরোপণ এবং পরিবেশ রক্ষা সচেতনতা।",
      icon: <Trees className="text-green-600" />,
      tag: "পরিবেশ",
      color: "border-green-200 bg-green-50"
    },
    {
      title: "স্বাবলম্বী প্রকল্প",
      enTitle: "Self-Reliance Program",
      desc: "বেকার যুবকদের কারিগরি প্রশিক্ষণ ও ক্ষুদ্র ব্যবসা শুরুর মূলধন সহায়তা।",
      icon: <Briefcase className="text-indigo-600" />,
      tag: "উদ্যোক্তা",
      color: "border-indigo-200 bg-indigo-50"
    }
  ]

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 -mr-32 -mt-32"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 font-bangla">
            আমাদের চলমান প্রকল্পসমূহ
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            WMK Trust তার সদস্যদের এবং সমাজের কল্যাণে বহুমুখী দীর্ঘমেয়াদী উন্নয়নমূলক কাজ করে যাচ্ছে।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {projects.map((p, i) => (
            <div
              key={i}
              className={`group relative p-8 rounded-3xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-white ${p.color}`}
            >
              {/* Icon Container */}
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {p.icon}
              </div>

              {/* Tag */}
              <span className="absolute top-6 right-6 text-[10px] font-bold uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm text-slate-500">
                {p.tag}
              </span>

              {/* Content */}
              <h3 className="font-bold text-xl mb-1 text-slate-800 font-bangla">
                {p.title}
              </h3>
              <p className="text-xs text-slate-400 mb-4 font-mono uppercase tracking-tighter">
                {p.enTitle}
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                {p.desc}
              </p>

              {/* Progress Simulation (New Feature) */}
              <div className="mt-6 pt-6 border-t border-white/50">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2 uppercase">
                  <span>প্রগতি</span>
                  <span>৮০%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-[80%] h-full bg-blue-600 rounded-full"></div>
                </div>
              </div>

              {/* Link Arrow */}
              <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-blue-600 text-xl font-bold">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}