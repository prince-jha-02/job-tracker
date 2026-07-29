import {
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ArrowRight,
  Download,
} from "lucide-react";
import { FaChrome } from "react-icons/fa";
import LoginCard from "./LoginCard";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  return (
    
    <section className="relative h-70% bg-[#FAFAFA] overflow-hidden flex items-center">
      {/* Subtle Background Pattern/Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-100 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* LEFT CONTENT */}
          <div className="max-w-2xl">
            
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm text-xs font-medium text-slate-700 mb-5 transition-all hover:shadow-md">
              <FaChrome className="text-blue-500" size={14} />
              <span>Chrome Extension Available</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
              Track every <br />
              <span className="text-indigo-600 relative whitespace-nowrap">
                job application
                <svg className="absolute -bottom-1 left-0 w-full h-2.5 text-indigo-200 -z-10" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,10 Q50,0 100,10" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
              <br /> like a pro.
            </h1>

            <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-lg">
              Manage your entire job search in one beautiful workspace. Save listings from LinkedIn and Indeed with one click, and visualize your progress effortlessly.
            </p>

            {/* FEATURES */}
            <div className="grid sm:grid-cols-2 gap-y-3 gap-x-6 mt-6">
              {[
                "Track Applications",
                "Analytics Dashboard",
                "Chrome Extension",
                "Interview Tracking",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center">
                    <CheckCircle2 className="text-indigo-600" size={12} strokeWidth={3} />
                  </div>
                  <span className="text-slate-700 text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap items-center gap-3 mt-8">
              {/* Updated Download Link */}
              <a 
                href="/extension/job-tracker-extension.zip" 
                download
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Download size={16} />
                Download Extension
              </a>

              <button onClick={()=>navigate("/features")} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-gray-200 text-slate-700 hover:bg-gray-50 hover:border-gray-300 text-sm font-medium transition-all active:scale-95 shadow-sm">
                Learn More
                <ArrowRight size={16} className="text-slate-400" />
              </button>
            </div>

            {/* STATS */}
            <div className="flex items-center gap-8 mt-10 pt-6 border-t border-gray-200/60">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">24/7</h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Uptime Tracking</p>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">100%</h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Free to Use</p>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">1 Click</h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Save Jobs</p>
              </div>
            </div>

          </div>

          {/* RIGHT CONTENT */}
          <div className="relative w-full max-w-md mx-auto lg:ml-auto">
            <LoginCard />

            {/* Floating Glassmorphism Cards */}
            <div className="hidden lg:flex absolute -left-12 top-6 bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] px-4 py-3 items-center gap-3 transition-transform hover:-translate-y-1">
              <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                <BarChart3 size={20} />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider mb-0.5">Analytics</p>
                <h3 className="font-bold text-slate-900 text-xs">Real-Time Stats</h3>
              </div>
            </div>

            <div className="hidden lg:flex absolute -right-8 bottom-10 bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] px-4 py-3 items-center gap-3 transition-transform hover:-translate-y-1">
              <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                <BriefcaseBusiness size={20} />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider mb-0.5">Extension</p>
                <h3 className="font-bold text-slate-900 text-xs">Save Instantly</h3>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;