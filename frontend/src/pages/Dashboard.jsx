import { useEffect } from "react";
import { useDashboard } from "../context/Dashboard.context";
import { useApplication } from "../context/Application.context";
import { NavLink } from "react-router-dom";
import StatCard from "../components/StatCard";
import UpcomingEvents from "../components/UpcomingEvents";
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
  Building2
} from "lucide-react";

function Dashboard() {
  const { stats, getDashboardStats, getUpcomingEvents } = useDashboard();
  const { applications, getApplications } = useApplication();

  useEffect(() => {
    getDashboardStats();
    getApplications();
    getUpcomingEvents();
  }, []);

  const statusColors = {
    Applied: "text-blue-700 bg-blue-50 border-blue-200",
    OA: "text-purple-700 bg-purple-50 border-purple-200",
    Interview: "text-yellow-700 bg-yellow-50 border-yellow-200",
    Offer: "text-green-700 bg-green-50 border-green-200",
    Rejected: "text-red-700 bg-red-50 border-red-200",
    Ghosted: "text-gray-600 bg-gray-100 border-gray-200",
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col gap-1.5 pt-4">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-base text-gray-500">
          Welcome back! Here's the latest overview of your job search.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">
        <StatCard
          title="Applications"
          value={stats.total || 0}
          icon={<Briefcase size={22} />}
          iconBgColor="bg-blue-100"
          iconTextColor="text-blue-600"
        />
        <StatCard
          title="Interviews"
          value={stats.interview || 0}
          icon={<Users size={22} />}
          iconBgColor="bg-yellow-100"
          iconTextColor="text-yellow-600"
        />
        <StatCard
          title="Offers"
          value={stats.offer || 0}
          icon={<Award size={22} />}
          iconBgColor="bg-green-100"
          iconTextColor="text-green-600"
        />
        <StatCard
          title="Rejected"
          value={stats.rejected || 0}
          icon={<XCircle size={22} />}
          iconBgColor="bg-red-100"
          iconTextColor="text-red-600"
        />
        <StatCard
          title="Offer Rate"
          value={`${stats.offerRate || 0}%`}
          icon={<Percent size={22} />}
          iconBgColor="bg-emerald-100"
          iconTextColor="text-emerald-600"
        />
        <StatCard
          title="Interview Rate"
          value={`${stats.interviewRate || 0}%`}
          icon={<ClipboardCheck size={22} />}
          iconBgColor="bg-indigo-100"
          iconTextColor="text-indigo-600"
        />
        <StatCard
          title="Assessments"
          value={stats.oa || 0}
          icon={<FileCheck size={22} />}
          iconBgColor="bg-purple-100"
          iconTextColor="text-purple-600"
        />
        <StatCard
          title="Ghosted"
          value={stats.ghosted || 0}
          icon={<Ghost size={22} />}
          iconBgColor="bg-gray-200"
          iconTextColor="text-gray-600"
        />
      </div>

      {/* Vertical Layout: Upcoming Events First, Then Recent Applications */}
      <div className="flex flex-col gap-8">
        
        {/* Upcoming Events Full Width */}
        <UpcomingEvents />

        {/* Recent Applications Full Width */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center px-6 py-5 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <Building2 className="text-gray-700" size={22} />
              <h2 className="text-lg font-bold text-gray-900">
                Recent Applications
              </h2>
            </div>

            <NavLink
              to="/applications"
              className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              View all
              <ArrowRight size={16} />
            </NavLink>
          </div>

          {!applications || applications.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center">
                <Briefcase size={32} className="text-gray-300 mb-3" />
                <p className="text-sm font-medium text-gray-900">No applications yet</p>
                <p className="text-sm text-gray-500 mt-1">Time to send out some resumes!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {applications.slice(0, 5).map((job) => (
                <div
                  key={job._id}
                  className="flex justify-between items-center px-6 py-4 hover:bg-gray-50/80 transition-colors group"
                >
                  <div>
                    <h3 className="font-bold text-gray-900 text-base group-hover:text-blue-600 transition-colors">
                      {job.companyName}
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5 font-medium">
                      {job.role}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full border text-xs font-bold tracking-wide uppercase ${
                      statusColors[job.status] || statusColors.Ghosted
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}

export default Dashboard;