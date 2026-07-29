import { useDashboard } from "../context/Dashboard.context";
import { CalendarDays, Clock, MapPin, CalendarX2 } from "lucide-react";

function UpcomingEvents() {
    const { upcomingEvents } = useDashboard();

    // Format date nicely
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).format(date);
    };

    // Calculate urgency and return color schemes
    const getUrgencyStyles = (dateString) => {
        const eventDate = new Date(dateString);
        const today = new Date();
        
        // Normalize dates to midnight for accurate day calculation
        const eventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
        const currentDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        
        const diffDays = Math.round((eventDay - currentDay) / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return {
                card: "border-l-gray-400 bg-gray-50",
                badge: "bg-gray-200 text-gray-700",
                label: "Past"
            };
        } else if (diffDays <= 1) {
            return {
                card: "border-l-red-500 bg-red-50/30",
                badge: "bg-red-100 text-red-700",
                label: diffDays === 0 ? "Today" : "Tomorrow"
            };
        } else if (diffDays <= 3) {
            return {
                card: "border-l-orange-400 bg-orange-50/30",
                badge: "bg-orange-100 text-orange-700",
                label: `In ${diffDays} days`
            };
        } else {
            return {
                card: "border-l-blue-500 bg-white",
                badge: "bg-blue-50 text-blue-700",
                label: `In ${diffDays} days`
            };
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 px-1">
                <CalendarDays className="text-gray-700" size={22} />
                <h2 className="text-lg font-bold text-gray-900">
                    Upcoming Events
                </h2>
            </div>

            {upcomingEvents?.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-8 flex flex-col items-center justify-center text-center shadow-sm">
                    <div className="p-4 bg-gray-50 rounded-full text-gray-400 mb-3">
                        <CalendarX2 size={28} />
                    </div>
                    <p className="text-sm font-semibold text-gray-900">No upcoming events</p>
                    <p className="text-sm text-gray-500 mt-1">You have no interviews or assessments scheduled right now.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {upcomingEvents.map((event) => {
                        const urgency = getUrgencyStyles(event.event.scheduledAt);
                        
                        return (
                            <div
                                key={event._id}
                                className={`group relative border border-gray-100 p-5 rounded-xl shadow-sm hover:shadow-md transition-all border-l-4 flex flex-col gap-3 ${urgency.card}`}
                            >
                                <div className="flex justify-between items-start gap-2">
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-base group-hover:text-blue-600 transition-colors">
                                            {event.companyName}
                                        </h3>
                                        <p className="text-sm font-medium text-gray-600 mt-0.5">
                                            {event.event.title}
                                        </p>
                                    </div>
                                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wide ${urgency.badge}`}>
                                        {urgency.label}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-2 mt-1">
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Clock size={16} className="text-gray-400" />
                                        <span className="font-medium">{formatDate(event.event.scheduledAt)}</span>
                                    </div>
                                    
                                    {event.event.location && (
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <MapPin size={16} className="text-gray-400" />
                                            <span className="truncate">{event.event.location}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default UpcomingEvents;