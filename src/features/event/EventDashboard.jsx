import { useNavigate } from "react-router";
import { useMyEvents } from "./useMyEvents";
import Spinner from "../../ui/Spinner";
import EventDashboardList from "./EventDashboardList";
import Button from "../../ui/Button";
import StringFilter from "../../ui/StringFilter";
import ButtonFilter from "../../ui/ButtonFilter";
import NoEventsFound from "./NoEventsFound";
import { useEventFilter } from "../../context/EventFilterContext";

function EventDashboard() {
  const navigate = useNavigate();

  const { events, isLoading } = useMyEvents({
    sortCol: "name",
    sortDir: "asc",
  });

  const { eventFilter, setEventFilter } = useEventFilter();

  let displayEvents;

  if (eventFilter) {
    displayEvents = events.filter(
      (event) =>
        event?.title?.toLowerCase().includes(eventFilter) ||
        event?.venue?.name?.toLowerCase().includes(eventFilter) ||
        event?.venue?.city?.toLowerCase().includes(eventFilter) ||
        event?.description?.toLowerCase().includes(eventFilter) ||
        event?.category?.value?.toLowerCase().includes(eventFilter),
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
        <StringFilter
          fullWidth={false}
          filter={eventFilter}
          setFilter={setEventFilter}
          placeholderText="Begin typing event name or performer or venue or category or city"
          color="orange"
        />

        <div className="content orange pl-5 filter">
          <ButtonFilter
            buttonSize="small"
            options={[
              { value: "past", label: "Past" },
              { value: "current", label: "Current" },
            ]}
            filterValue="eventDate"
          />
        </div>
        <div className="content orange pl-5 filter">
          <ButtonFilter
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
