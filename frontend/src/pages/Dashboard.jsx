import { useEffect } from "react";
import { useDashboard } from "../context/Dashboard.context";
import { useApplication } from "../context/Application.context";
import { NavLink, useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";

import {
  Briefcase,
  Users,
  Award,
  XCircle,
  Percent,
  FileCheck,
  Ghost,
  ClipboardCheck,
  ArrowRight,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const { stats, getDashboardStats } = useDashboard();
  const { applications, getApplications } = useApplication();

  useEffect(() => {
    getDashboardStats();
    getApplications();
  }, []);

  // Matching the status colors from your compact cards
  const statusColors = {
    Applied: "text-blue-700 bg-blue-50 border-blue-100",
    OA: "text-purple-700 bg-purple-50 border-purple-100",
    Interview: "text-yellow-700 bg-yellow-50 border-yellow-100",
    Offer: "text-green-700 bg-green-50 border-green-100",
    Rejected: "text-red-700 bg-red-50 border-red-100",
    Ghosted: "text-gray-600 bg-gray-100 border-gray-200",
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Welcome back! Here's your job search overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
        <StatCard
          title="Applications"
          value={stats.total}
          icon={<Briefcase size={18} />}
          bgColor="bg-blue-50"
          textColor="text-blue-600"
        />
        <StatCard
          title="Interviews"
          value={stats.interview}
          icon={<Users size={18} />}
          bgColor="bg-yellow-50"
          textColor="text-yellow-600"
        />
        <StatCard
          title="Offers"
          value={stats.offer}
          icon={<Award size={18} />}
          bgColor="bg-green-50"
          textColor="text-green-600"
        />
        <StatCard
          title="Rejected"
          value={stats.rejected}
          icon={<XCircle size={18} />}
          bgColor="bg-red-50"
          textColor="text-red-600"
        />
        <StatCard
          title="Offer Rate"
          value={`${stats.offerRate || 0}%`}
          icon={<Percent size={18} />}
          bgColor="bg-emerald-50"
          textColor="text-emerald-600"
        />
        <StatCard
          title="Interview Rate"
          value={`${stats.interviewRate || 0}%`}
          icon={<ClipboardCheck size={18} />}
          bgColor="bg-indigo-50"
          textColor="text-indigo-600"
        />
        <StatCard
          title="Assessments"
          value={stats.oa}
          icon={<FileCheck size={18} />}
          bgColor="bg-purple-50"
          textColor="text-purple-600"
        />
        <StatCard
          title="Ghosted"
          value={stats.ghosted}
          icon={<Ghost size={18} />}
          bgColor="bg-gray-100"
          textColor="text-gray-600"
        />
      </div>

      {/* Recent Applications */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            Recent Applications
          </h2>
          <NavLink
            to="/applications"
            className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            View all
            <ArrowRight size={16} />
          </NavLink>
        </div>

        {applications.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">
            No applications yet. Start tracking!
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {applications.slice(0, 5).map((job) => (
              <div
                key={job._id}
                className="flex justify-between items-center px-5 py-3.5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {job.companyName}
                  </h3>
                  <p className="text-xs text-gray-500">{job.role}</p>
                </div>

                <div className="flex items-center gap-4">
                  {job.appliedDate && (
                    <span className="hidden sm:block text-xs text-gray-400">
                      {new Date(job.appliedDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  )}
                  <span
                    className={`px-2.5 py-1 rounded border text-[11px] font-medium ${
                      statusColors[job.status] || statusColors["Applied"]
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Dashboard;