import React from "react";

function StatCard({ title, value, icon, iconBgColor, iconTextColor }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
      <div className={`p-3 rounded-xl flex-shrink-0 ${iconBgColor} ${iconTextColor}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-0.5">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  );
}

export default StatCard;