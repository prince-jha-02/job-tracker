import { useState } from "react";
import { Calendar, Clock, Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

function AddEvent({ events, setFormData }) {
  const emptyEvent = {
    title: "",
    type: "Interview",
    scheduledAt: "",
    mode: "Online",
    meetingLink: "",
    location: "",
    notes: "",
    completed: false,
  };

  const [showForm, setShowForm] = useState(false);
  const [event, setEvent] = useState(emptyEvent);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addEvent = () => {
    if (!event.title.trim()) {
      toast.error("Please enter event title");
      return;
    }

    if (!event.scheduledAt) {
      toast.error("Please select date & time");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      events: [...prev.events, event],
    }));

    setEvent(emptyEvent);
    setShowForm(false);
  };

  const deleteEvent = (index) => {
    setFormData((prev) => ({
      ...prev,
      events: prev.events.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="sm:col-span-2 border rounded-xl p-5 mt-2">

      <div className="flex items-center justify-between mb-4">

        <h3 className="text-lg font-semibold">
          Hiring Events
        </h3>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          <Plus size={18} />
          Add Event
        </button>

      </div>

      {/* Existing Events */}

      {events.length > 0 && (

        <div className="space-y-3 mb-4">

          {events.map((ev, index) => (

            <div
              key={index}
              className="border rounded-lg p-4 bg-gray-50"
            >

              <div className="flex justify-between">

                <div>

                  <h4 className="font-semibold">

                    {ev.title}

                  </h4>

                  <p className="text-sm text-gray-500">

                    {ev.type}

                  </p>

                  <div className="flex gap-4 mt-2 text-sm">

                    <span className="flex items-center gap-1">

                      <Calendar size={15} />

                      {new Date(
                        ev.scheduledAt
                      ).toLocaleDateString()}

                    </span>

                    <span className="flex items-center gap-1">

                      <Clock size={15} />

                      {new Date(
                        ev.scheduledAt
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}

                    </span>

                  </div>

                  <p className="mt-2 text-sm">

                    {ev.mode}

                  </p>

                </div>

                <button
                  type="button"
                  onClick={() => deleteEvent(index)}
                  className="text-red-500 hover:text-red-700"
                >

                  <Trash2 size={20} />

                </button>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* Event Form */}

      {showForm && (

        <div className="border rounded-lg p-4 bg-gray-100 space-y-4">

          <input
            name="title"
            placeholder="Title"
            value={event.title}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />

          <div className="grid grid-cols-2 gap-3">

            <select
              name="type"
              value={event.type}
              onChange={handleChange}
              className="border rounded-md px-3 py-2"
            >
              <option>OA</option>
              <option>Interview</option>
              <option>Technical</option>
              <option>HR</option>
              <option>Managerial</option>
              <option>Assignment</option>
              <option>Final</option>
              <option>Other</option>
            </select>

            <select
              name="mode"
              value={event.mode}
              onChange={handleChange}
              className="border rounded-md px-3 py-2"
            >
              <option>Online</option>
              <option>Offline</option>
            </select>

          </div>

          <input
            type="datetime-local"
            name="scheduledAt"
            value={event.scheduledAt}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />

          <input
            name="meetingLink"
            placeholder="Meeting Link"
            value={event.meetingLink}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />

          <input
            name="location"
            placeholder="Location"
            value={event.location}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />

          <textarea
            rows={3}
            name="notes"
            placeholder="Notes"
            value={event.notes}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={() => {
                setEvent(emptyEvent);
                setShowForm(false);
              }}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={addEvent}
              className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Save Event
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default AddEvent;