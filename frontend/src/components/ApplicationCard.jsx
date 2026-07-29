import { MapPin, Calendar, IndianRupee, Briefcase } from "lucide-react";
import { useApplication } from "../context/Application.context";
import { useState } from "react";
import EventModal from "./EventModal";

function ApplicationCard({ job, setShowForm, setEditingJob }) {
  const { deleteApplication, updateApplication } = useApplication();

  const [showEventModal, setShowEventModal] = useState(false);

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

      {/* Event Section */}

      <div className="mt-2">

        {job.event ?.scheduledAt? (

          <div className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-[10px] uppercase tracking-wide text-blue-500 font-semibold">
                  Upcoming Event
                </p>

                <h3 className="text-sm font-semibold text-gray-800 mt-1">
                  {job.event.title}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  {new Date(job.event.scheduledAt).toLocaleString()}
                </p>

                {job.event.location && (

                  <p className="text-xs text-gray-500">

                    📍 {job.event.location}

                  </p>

                )}

              </div>

            </div>

          </div>

        ) : (

          <div className="rounded-lg border border-dashed border-gray-300 px-3 py-3 flex justify-between items-center">

            <div>

              <p className="text-sm font-medium text-gray-600">
                No upcoming event
              </p>

              <p className="text-xs text-gray-400">
                Schedule your next OA or interview
              </p>

            </div>

            <button
              onClick={() => setShowEventModal(true)}
              className="text-xs bg-black text-white px-3 py-2 rounded-md hover:bg-gray-800"
            >
              Add Event
            </button>

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
            className="text-xs font-medium px-3 py-1 bg-white border rounded"
          >
            Edit
          </button>

          <button
            onClick={() => setShowEventModal(true)}
            className="text-xs font-medium px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {job.event ? "Event" : "Add Event"}
          </button>

          <button
            onClick={handleDelete}
            className="text-xs font-medium px-3 py-1 bg-white border border-red-200 rounded text-red-500"
          >
            Delete
          </button>

        </div>
      </div>

      {
  showEventModal && (

    <EventModal
      application={job}
      setShowEventModal={setShowEventModal}
    />

  )
}

    </div>
  );
}

export default ApplicationCard;