import { useEffect, useState } from "react";
import { useApplication } from "../context/Application.context";

function AddApplicationModal({ setShowForm, editingJob }) {
  const { createApplication, updateApplication } = useApplication();

  const initialState = {
    companyName: "",
    role: "",
    location: "",
    source: "",
    status: "Applied",
    appliedDate: "",
    salary: "",
    jobUrl: "",
    notes: "",
    tags: [],
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingJob) {
      setFormData({
        ...editingJob,
        appliedDate: editingJob.appliedDate
          ? editingJob.appliedDate.slice(0, 10)
          : "",
      });
    } else {
      setFormData(initialState);
    }
  }, [editingJob]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "tags") {
      setFormData({
        ...formData,
        tags: value
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let success;

    if (editingJob) {
      success = await updateApplication(editingJob._id, formData);
    } else {
      success = await createApplication(formData);
    }

    if (success) {
      setShowForm(false);
    }
  };

  // Shared classes for all inputs to keep JSX clean
  const inputStyles =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all";
  const labelStyles = "block text-xs font-semibold text-gray-600 mb-1";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-2xl rounded-xl shadow-2xl flex flex-col max-h-full overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="text-xl font-bold text-gray-800">
            {editingJob ? "Edit Application" : "Add Application"}
          </h2>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="text-gray-400 hover:text-gray-700 text-xl font-bold px-2"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Body - 2 Column Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
          <div>
            <label className={labelStyles}>Company Name *</label>
            <input
              type="text"
              name="companyName"
              placeholder="e.g. Google"
              value={formData.companyName}
              onChange={handleChange}
              className={inputStyles}
              required
            />
          </div>

          <div>
            <label className={labelStyles}>Role *</label>
            <input
              type="text"
              name="role"
              placeholder="e.g. Frontend Engineer"
              value={formData.role}
              onChange={handleChange}
              className={inputStyles}
              required
            />
          </div>

          <div>
            <label className={labelStyles}>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputStyles}
            >
              <option>Applied</option>
              <option>OA</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
              <option>Ghosted</option>
            </select>
          </div>

          <div>
            <label className={labelStyles}>Source</label>
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className={inputStyles}
            >
              <option value="">Select Source</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Naukri">Naukri</option>
              <option value="Indeed">Indeed</option>
              <option value="Internshala">Internshala</option>
              <option value="Company Website">Company Website</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className={labelStyles}>Location</label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Remote, New York"
              value={formData.location}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>

          <div>
            <label className={labelStyles}>Salary</label>
            <input
              type="number"
              name="salary"
              placeholder="e.g. 120000"
              value={formData.salary}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>

          <div>
            <label className={labelStyles}>Applied Date</label>
            <input
              type="date"
              name="appliedDate"
              value={formData.appliedDate}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>

          <div>
            <label className={labelStyles}>Job URL</label>
            <input
              type="url"
              name="jobUrl"
              placeholder="https://..."
              value={formData.jobUrl}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelStyles}>Tags</label>
            <input
              type="text"
              name="tags"
              placeholder="e.g. react, startup, high-priority (comma separated)"
              value={formData.tags.join(", ")}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelStyles}>Notes</label>
            <textarea
              name="notes"
              placeholder="Any additional details..."
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              className={`${inputStyles} resize-none`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors shadow-sm"
          >
            {editingJob ? "Update Application" : "Save Application"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddApplicationModal;