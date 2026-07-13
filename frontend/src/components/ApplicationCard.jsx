import { MapPin, Calendar, IndianRupee, Briefcase } from "lucide-react";
import { useApplication } from "../context/Application.context";

function ApplicationCard({ job, setShowForm, setEditingJob }) {
  const { deleteApplication, updateApplication } = useApplication();

  const handleDelete = async () => {
    if (window.confirm("Delete this application?")) {
      await deleteApplication(job._id);
    }
  };

  const handleStatusChange = async (e) => {
    await updateApplication(job._id, { status: e.target.value });
  };

  const formattedDate = new Date(job.appliedDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });

  const colors = {
    Applied: "text-blue-700 bg-blue-50",
    OA: "text-purple-700 bg-purple-50",
    Interview: "text-yellow-700 bg-yellow-50",
    Offer: "text-green-700 bg-green-50",
    Rejected: "text-red-700 bg-red-50",
    Ghosted: "text-gray-600 bg-gray-100",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md p-3 hover:border-gray-300 transition-colors flex flex-col gap-2">
      
      {/* Top Row: Title & Status */}
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-1.5 truncate">
          <h2 className="text-sm font-semibold text-gray-900 truncate">
            {job.companyName}
          </h2>
          <span className="text-gray-300 text-xs">•</span>
          <span className="text-xs text-gray-500 truncate">{job.role}</span>
        </div>

        <select
          value={job.status}
          onChange={handleStatusChange}
          className={`text-[10px] font-medium px-1.5 py-0.5 rounded cursor-pointer outline-none border-none ${colors[job.status]}`}
        >
          <option>Applied</option>
          <option>OA</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
          <option>Ghosted</option>
        </select>
      </div>

      {/* Middle Row: Metadata & Tags (Single Line) */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar size={12} className="text-gray-400" />
          <span>{formattedDate}</span>
        </div>

        {job.location && (
          <div className="flex items-center gap-1">
            <MapPin size={12} className="text-gray-400" />
            <span className="truncate max-w-[80px]">{job.location}</span>
          </div>
        )}

        {job.salary && (
          <div className="flex items-center gap-1">
            <IndianRupee size={12} className="text-gray-400" />
            <span>{job.salary.toLocaleString()}</span>
          </div>
        )}

        {job.source && (
          <div className="flex items-center gap-1">
            <Briefcase size={12} className="text-gray-400" />
            <span>{job.source}</span>
          </div>
        )}

        {/* Tags reduced to simple text to save space */}
        {job.tags?.length > 0 && (
          <div className="flex items-center gap-1 ml-auto text-[10px] text-gray-400">
            {job.tags.slice(0, 2).map((tag, i) => (
              <span key={i}>#{tag}</span>
            ))}
            {job.tags.length > 2 && <span>+{job.tags.length - 2}</span>}
          </div>
        )}
      </div>

      {/* Bottom Row: Notes & Actions */}
      <div className="flex justify-between items-center gap-4 mt-2">
        {job.notes ? (
          <p className="text-[11px] text-gray-400 truncate w-2/3">
            <span className="font-semibold text-gray-300 mr-1">N:</span>
            {job.notes}
          </p>
        ) : (
          <div className="w-2/3" /> /* Empty spacer */
        )}

        {/* Updated: Larger, clearly defined buttons */}
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => {
              setEditingJob(job);
              setShowForm(true);
            }}
            className="text-xs font-medium px-3 py-1 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-xs font-medium px-3 py-1 bg-white border border-red-100 rounded text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

    </div>
  );
}

export default ApplicationCard;