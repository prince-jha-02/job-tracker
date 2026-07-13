import { useState, useEffect } from "react";
import ApplicationCard from "../components/ApplicationCard";
import AddApplicationModal from "../components/AddApplicationModal";
import { useApplication } from "../context/Application.context";

function Applications() {

  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const { applications, getApplications } = useApplication();

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Applications
        </h1>

        <button
          onClick={() => {
            setEditingJob(null);
            setShowForm(true);
          }}
          className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
        >
          + Add Job
        </button>

      </div>

      <div className="grid gap-5">

        {applications.map((job) => (

          <ApplicationCard
            key={job._id}
            job={job}
            setShowForm={setShowForm}
            setEditingJob={setEditingJob}
          />

        ))}

      </div>

      {showForm && (

        <AddApplicationModal
          setShowForm={setShowForm}
          editingJob={editingJob}
        />

      )}

    </div>
  );
}

export default Applications;