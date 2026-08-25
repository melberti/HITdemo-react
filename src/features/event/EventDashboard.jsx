import { useMyEvents } from "./useMyEvents";
import { useAddEvent } from "./useAddEvent";
import Spinner from "../../ui/Spinner";
import EventDashboardList from "./EventDashboardList";

function EventDashboard() {
  const { events, isLoading } = useMyEvents({
    sortCol: "name",
    sortDir: "asc",
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="mt-10 grid grid-cols-7 gap-1 bg-neutral-200 p-1">
      <div className="col-span-7 bg-[var(--primary-orange)] p-1 text-center text-white">
        {events.length} EVENTS
      </div>

      <EventDashboardList events={events} />
    </div>
  );
}

export default EventDashboard;
