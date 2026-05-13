import { Edit, Mail, Phone, Building2, MapPin } from "lucide-react";
import Image from "next/image";

export default function EmployerProfile() {
  return (
    <div className="text-white space-y-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
        {/* Profile Image Container */}
        <div className="relative group shrink-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
            <Image
              src="/images/profile-pic.png"
              alt="Robert Jane"
              width={192}
              height={192}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          <button className="absolute bottom-2 right-2 bg-gradient-to-r from-[#4ECDC4] to-[#2d8a84] p-3 rounded-full shadow-xl hover:scale-110 active:scale-90 transition-all border border-white/20">
            <Edit className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h1 className="text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Robert Jane
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 bg-[#4ECDC4]/10 border border-[#4ECDC4]/20 px-4 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#4ECDC4] animate-pulse"></span>
                <span className="text-xs font-bold text-[#4ECDC4] uppercase tracking-widest">Active Partner</span>
              </div>
            </div>
            <p className="text-2xl text-gray-300 mt-2 flex items-center justify-center md:justify-start gap-2">
              <Building2 className="w-6 h-6 text-[#4ECDC4]" />
              Amazon Global
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Department</p>
              <p className="text-lg font-semibold">Human Resources</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Position</p>
              <p className="text-lg font-semibold">Senior Talent Manager</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-2">
            <div className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors cursor-pointer">
              <div className="bg-white/10 p-2 rounded-lg">
                <Mail className="w-4 h-4 text-[#4ECDC4]" />
              </div>
              <span className="text-sm">robert.jane@amazon.com</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors cursor-pointer">
              <div className="bg-white/10 p-2 rounded-lg">
                <Phone className="w-4 h-4 text-[#4ECDC4]" />
              </div>
              <span className="text-sm">+91 6380101407</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors cursor-pointer">
              <div className="bg-white/10 p-2 rounded-lg">
                <MapPin className="w-4 h-4 text-[#4ECDC4]" />
              </div>
              <span className="text-sm">Bangalore, India</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
