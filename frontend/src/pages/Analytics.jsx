import { useEffect } from "react";

import {
  Briefcase,
  Calendar,
  TrendingUp,
  Clock,
  Building2,
  MapPin,
  UserCheck,
  Target,
} from "lucide-react";

import { useDashboard } from "../context/Dashboard.context";

import StatCard from "../components/StatCard";
import InsightCard from "../components/InsightCard";
import StatusPieChart from "../components/StatusPieChart";
import MonthlyLineChart from "../components/MonthlyLineChart";
import SourceBarChart from "../components/SourceBarChart";

function Analytics() {
  const {
    analytics,
    loading,
    getAnalytics,
  } = useDashboard();

  useEffect(() => {
    getAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">

        <div className="text-xl font-semibold">
          Loading Analytics...
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10">

      {/* Heading */}

      <div>

        <h1 className="text-4xl font-bold">
          Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          Track your job application performance.
        </p>

      </div>

      {/* Stat Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="This Month"
          value={analytics.insights.thisMonthApplications}
          icon={<Calendar size={28} />}
          bgColor="bg-blue-100"
          textColor="text-blue-600"
        />

        <StatCard
          title="Last Month"
          value={analytics.insights.lastMonthApplications}
          icon={<Briefcase size={28} />}
          bgColor="bg-green-100"
          textColor="text-green-600"
        />

        <StatCard
          title="Growth"
          value={`${analytics.insights.monthlyGrowth}%`}
          icon={<TrendingUp size={28} />}
          bgColor="bg-purple-100"
          textColor="text-purple-600"
        />

        <StatCard
          title="Pending"
          value={analytics.insights.pendingApplications}
          icon={<Clock size={28} />}
          bgColor="bg-red-100"
          textColor="text-red-600"
        />

      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-semibold mb-6">

            Status Distribution

          </h2>

          <StatusPieChart
            data={analytics.statusStats}
          />

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-semibold mb-6">

            Monthly Applications

          </h2>

          <MonthlyLineChart
            data={analytics.monthlyApplications}
          />

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-semibold mb-6">

          Applications By Platform

        </h2>

        <SourceBarChart
          data={analytics.sourceStats}
        />

      </div>

      {/* Insights */}

      <div>

        <h2 className="text-3xl font-bold mb-6">

          Insights

        </h2>

        <div className="grid lg:grid-cols-2 gap-6">

          <InsightCard
            icon={<Target size={24} />}
            title="Most Applied Role"
            value={
              analytics.insights.mostAppliedRole
                ? analytics.insights.mostAppliedRole._id
                : "N/A"
            }
          />

          <InsightCard
            icon={<Building2 size={24} />}
            title="Top Company"
            value={
              analytics.insights.topCompany
                ? analytics.insights.topCompany._id
                : "N/A"
            }
          />

          <InsightCard
            icon={<MapPin size={24} />}
            title="Top Location"
            value={
              analytics.insights.topLocation
                ? analytics.insights.topLocation._id
                : "N/A"
            }
          />

          <InsightCard
            icon={<UserCheck size={24} />}
            title="Best Platform"
            value={
              analytics.insights.bestSource
                ? analytics.insights.bestSource._id
                : "N/A"
            }
          />

        </div>

      </div>

      {/* Salary */}

      <div className="bg-white rounded-2xl shadow p-8">

        <h2 className="text-2xl font-semibold mb-6">

          Salary Statistics

        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <StatCard
            title="Average"
            value={`₹${Math.round(
              analytics.salaryStats.averageSalary
            ).toLocaleString()}`}
            icon={<TrendingUp size={28} />}
            bgColor="bg-yellow-100"
            textColor="text-yellow-700"
          />

          <StatCard
            title="Highest"
            value={`₹${analytics.salaryStats.highestSalary.toLocaleString()}`}
            icon={<TrendingUp size={28} />}
            bgColor="bg-green-100"
            textColor="text-green-700"
          />

          <StatCard
            title="Lowest"
            value={`₹${analytics.salaryStats.lowestSalary.toLocaleString()}`}
            icon={<TrendingUp size={28} />}
            bgColor="bg-red-100"
            textColor="text-red-700"
          />

        </div>

      </div>

    </div>
  );
}

export default Analytics;