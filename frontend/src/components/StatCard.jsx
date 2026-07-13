function StatCard({ title, value, icon, bgColor, textColor }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all duration-200 flex flex-col justify-between group">
      
      <div className="flex justify-between items-start mb-2">
        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
          {title}
        </p>
        <div
          className={`w-8 h-8 rounded-md flex items-center justify-center transition-transform group-hover:scale-105 ${bgColor}`}
        >
          <div className={textColor}>
            {icon}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          {value}
        </h2>
      </div>
      
    </div>
  );
}

export default StatCard;