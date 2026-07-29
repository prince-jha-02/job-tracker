import { useState, useEffect } from "react";
import { useApplication } from "../context/Application.context";

function EventModal({
  application,
  setShowEventModal,
}) {

  const { updateEvent } = useApplication();

  const [formData, setFormData] = useState({
    title: "",
    scheduledAt: "",
    location: "",
  });

  useEffect(() => {

    if (application.event) {

      setFormData({
        title: application.event.title || "",
        scheduledAt: application.event.scheduledAt
          ? application.event.scheduledAt.slice(0,16)
          : "",
        location: application.event.location || "",
      });

    }

  }, [application]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const success = await updateEvent(
      application._id,
      formData
    );

    if (success) {
      setShowEventModal(false);
    }

  };

  const inputStyles =
    "w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black";

  return (

    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-2xl"
      >

        {/* Header */}

        <div className="flex justify-between items-center border-b px-6 py-4">

          <div>

            <h2 className="text-xl font-bold">

              {application.event
                ? "Update Event"
                : "Schedule Event"}

            </h2>

            <p className="text-sm text-gray-500 mt-1">

              {application.companyName}

            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowEventModal(false)
            }
            className="text-2xl text-gray-400 hover:text-black"
          >
            ×
          </button>

        </div>

        {/* Body */}

        <div className="p-6 space-y-5">

          <div>

            <label className="block text-sm font-medium mb-1">

              Event Title

            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Technical Interview"
              className={inputStyles}
              required
            />

          </div>

          <div>

            <label className="block text-sm font-medium mb-1">

              Date & Time

            </label>

            <input
              type="datetime-local"
              name="scheduledAt"
              value={formData.scheduledAt}
              onChange={handleChange}
              className={inputStyles}
              required
            />

          </div>

          <div>

            <label className="block text-sm font-medium mb-1">

              Location

            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Google Meet / Office"
              className={inputStyles}
            />

          </div>

        </div>

        {/* Footer */}

        <div className="border-t bg-gray-50 px-6 py-4 flex justify-end gap-3">

          <button
            type="button"
            onClick={() =>
              setShowEventModal(false)
            }
            className="px-5 py-2 border rounded-md"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            {application.event
              ? "Update Event"
              : "Save Event"}
          </button>

        </div>

      </form>

    </div>

  );

}

export default EventModal;