import { useNavigate } from "react-router";
import { useMyEvents } from "./useMyEvents";
import Spinner from "../../ui/Spinner";
import EventDashboardList from "./EventDashboardList";
import Button from "../../ui/Button";
import EventsFilter from "../../ui/EventsFilter";
import Filter from "../../ui/Filter";
import NoEventsFound from "./NoEventsFound";
import { useEventFilter } from "../../context/EventFilterContext";

function EventDashboard() {
  const navigate = useNavigate();

  const { events, isLoading } = useMyEvents({
    sortCol: "name",
    sortDir: "asc",
  });

  const { filter } = useEventFilter(); //filter set to lowercase in EventsFilter at time of set
  let displayEvents;

  if (filter) {
    displayEvents = events.filter(
      (event) =>
        event?.title?.toLowerCase().includes(filter) ||
        event?.venue?.name?.toLowerCase().includes(filter) ||
        event?.venue?.city?.toLowerCase().includes(filter) ||
        event?.description?.toLowerCase().includes(filter) ||
        event?.category?.value?.toLowerCase().includes(filter),
    );
  } else displayEvents = events;

  if (isLoading) return <Spinner />;

  if (!displayEvents) return <NoEventsFound />;

  return (
    <>
      <div className="flex justify-between">
        <Button
          onClick={() => navigate("/addevent")}

          className="mr-auto"
        >
          Add Event
        </Button>
        <EventsFilter fullWidth={false} />
        <div className="content pl-5 filter">
          <Filter
            buttonSize="small"
            options={[
              { value: "past", label: "Past" },
              { value: "current", label: "Current" },
            ]}
            filterValue="eventDate"
          />
        </div>
        <div className="content pl-5 filter">
          <Filter
            buttonSize="small"
            options={[
              { value: "all", label: "All" },
              { value: "scheduled", label: "Scheduled" },
              { value: "postponed", label: "Postponed" },
              { value: "cancelled", label: "Cancelled" },
            ]}
            filterValue="eventStatus"
          />
        </div>
      </div>
      <div className="mt-2 mb-10 grid grid-cols-[repeat(8,minmax(max-content,1fr))] gap-1 bg-neutral-200 p-1">
        <div className="bg-primary-orange col-span-8 p-1 text-center text-white">
          {displayEvents.length} EVENT{displayEvents.length > 1 && "S"}
        </div>

        <EventDashboardList events={displayEvents} />
      </div>
    </>
  );
}

export default EventDashboard;
