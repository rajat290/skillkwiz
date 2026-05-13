"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";

export default function EmployerCandidateList() {
  const [selectedGender, setSelectedGender] = useState<
    "male" | "female" | "both"
  >("male");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["C#"]);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const candidates = [
    {
      id: 1,
      name: "K. Pradeep Kishor",
      initial: "P",
      company: "SkillKwiz",
      skills: ["C#", "Java", "SQL"],
      percentile: 85,
      location: "Bangalore",
      color: "bg-green-600",
    },
    {
      id: 2,
      name: "Manoj",
      initial: "M",
      company: "SkillKwiz",
      skills: ["C#", "Java", "SQL"],
      percentile: 85,
      location: "Bangalore",
      color: "bg-yellow-600",
    },
    {
      id: 3,
      name: "Kasiro",
      initial: "M",
      company: "SkillKwiz",
      skills: ["C#", "Java", "SQL"],
      percentile: 85,
      location: "Bangalore",
      color: "bg-teal-600",
    },
    {
      id: 4,
      name: "Ravi",
      initial: "R",
      company: "SkillKwiz",
      skills: ["C#", "Java", "SQL"],
      percentile: 85,
      location: "Bangalore",
      color: "bg-blue-800",
    },
  ];

  return (
    <div className="text-white space-y-8">
      {/* Search Header */}
      <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative group w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#4ECDC4] transition-colors" />
            <input
              type="text"
              placeholder="Search by email, phone, or skill..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 focus:border-[#4ECDC4] transition-all"
            />
          </div>
          <div className="w-full md:w-64 relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#4ECDC4] transition-colors" />
            <input
              type="text"
              placeholder="Location"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 focus:border-[#4ECDC4] transition-all"
            />
          </div>
          <button className="w-full md:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] font-bold shadow-lg hover:scale-105 active:scale-95 transition-all">
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
            <div className="bg-white/5 p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-bold text-lg">Filters</h3>
              <button className="text-xs text-[#4ECDC4] hover:underline">Reset</button>
            </div>

            <div className="p-6 space-y-8">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Gender</h4>
                <div className="space-y-3">
                  {["male", "female"].map((g) => (
                    <label key={g} className="flex items-center group cursor-pointer">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          className="peer appearance-none w-5 h-5 border border-white/20 rounded-md checked:bg-[#4ECDC4] checked:border-transparent transition-all"
                          checked={selectedGender === g || selectedGender === "both"}
                          onChange={() => setSelectedGender(selectedGender === "both" ? (g === "male" ? "female" : "male") : (selectedGender === g ? (g === "male" ? "female" : "male") : "both"))}
                        />
                        <div className="absolute text-white scale-0 peer-checked:scale-100 transition-transform left-1">
                          <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                        </div>
                      </div>
                      <span className="ml-3 text-gray-300 group-hover:text-white transition-colors capitalize">{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Top Skills</h4>
                <div className="space-y-3">
                  {["C#", "Java", "SQL", "Python"].map((skill) => (
                    <label key={skill} className="flex items-center group cursor-pointer">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          className="peer appearance-none w-5 h-5 border border-white/20 rounded-md checked:bg-[#4ECDC4] checked:border-transparent transition-all"
                          checked={selectedSkills.includes(skill)}
                          onChange={() => toggleSkill(skill)}
                        />
                        <div className="absolute text-white scale-0 peer-checked:scale-100 transition-transform left-1">
                          <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                        </div>
                      </div>
                      <span className="ml-3 text-gray-300 group-hover:text-white transition-colors">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Candidate List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between px-2">
            <p className="text-sm text-gray-400">Showing <span className="text-white font-bold">{candidates.length}</span> candidates</p>
            <select className="bg-transparent text-sm text-gray-300 border-none focus:ring-0 cursor-pointer">
              <option className="bg-[#1a2b4b]">Sort by: Highest Score</option>
              <option className="bg-[#1a2b4b]">Sort by: Newest</option>
            </select>
          </div>

          <div className="space-y-4">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="group bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-[#4ECDC4]/30 transition-all duration-300">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className={`w-20 h-20 rounded-2xl ${candidate.color} flex items-center justify-center text-white text-3xl font-black shadow-xl shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                    {candidate.initial}
                  </div>
                  
                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <div>
                      <h3 className="text-2xl font-bold group-hover:text-[#4ECDC4] transition-colors">{candidate.name}</h3>
                      <p className="text-sm text-[#4ECDC4] font-medium tracking-wide uppercase">{candidate.company}</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-3 gap-x-6">
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map(s => (
                          <span key={s} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-semibold">{s}</span>
                        ))}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <div className="w-10 h-10 rounded-full border-2 border-[#4ECDC4] flex items-center justify-center mr-3">
                          <span className="text-xs font-bold">{candidate.percentile}%</span>
                        </div>
                        <span className="text-xs uppercase tracking-tighter text-gray-500">Percentile</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <MapPin className="w-4 h-4 mr-1 text-[#4ECDC4]" />
                        {candidate.location}
                      </div>
                    </div>
                  </div>

                  <a
                    href="#"
                    className="w-full md:w-auto bg-white/10 border border-white/20 px-8 py-3 rounded-xl font-bold hover:bg-[#4ECDC4] hover:text-white hover:border-transparent transition-all text-center"
                  >
                    View Report
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
