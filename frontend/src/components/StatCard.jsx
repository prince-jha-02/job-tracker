import React from "react";

function StatCard({ title, value, icon, iconBgColor, iconTextColor }) {
  return (
    // {/* Changed to flex-col for mobile, sm:flex-row for larger screens */}
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all hover:shadow-md">
      <div className={`p-3 rounded-xl flex-shrink-0 ${iconBgColor} ${iconTextColor}`}>
        {icon}
      </div>
      
      <div className="flex-1 min-w-0 w-full">
        {/* Added break-words just in case it's still too long */}
        <p className="text-sm font-medium text-gray-500 mb-0.5 break-words">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-gray-900 break-words">
          {value}
        </h3>
      </div>
    </div>
  );
}

export default StatCard;