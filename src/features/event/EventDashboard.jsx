import { useNavigate, useSearchParams } from "react-router";
import { useMyEvents } from "./useMyEvents";
import { useMedia } from "../../context/MediaQueryContext";

import Spinner from "../../ui/Spinner";
import EventDashboardList from "./EventDashboardList";
import Button from "../../ui/Button";
import StringFilter from "../../ui/StringFilter";
import ButtonFilter from "../../ui/ButtonFilter";
import Empty from "../../ui/Empty";
import { useEventFilter } from "../../context/EventFilterContext";

function EventDashboard() {
  const navigate = useNavigate();
  const { isSmall, isMedium, isLarge } = useMedia();

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

  //past, current, active filtering
  const [searchParams] = useSearchParams();
  const statusFilterValue = searchParams.get("eventStatus");

  if (statusFilterValue === "cancelled") {
    displayEvents = displayEvents.filter((e) => e.isCancelled);
  }
  if (statusFilterValue === "postponed") {
    displayEvents = displayEvents.filter((e) => e.isPostponed);
  }
  if (statusFilterValue === "scheduled") {
    displayEvents = displayEvents.filter(
      (e) => !e.isCancelled && !e.isPostponed,
    );
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="flex justify-between gap-1">
        <Button onClick={() => navigate("/addevent")} className="mr-auto">
          Add Event
        </Button>

        {!displayEvents.length ? (
          <Empty resource="events" />
        ) : (
          <>
            {isLarge && (
              <div className="content orange ml-2 filter">
                <ButtonFilter
                  buttonSize="small"
                  options={[
                    { value: "current", label: "Current" },
                    { value: "past", label: "Past" },
                  ]}
                  filterValue="eventDate"
                />
              </div>
            )}
            {isMedium && (
              <div className="content orange filter">
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
            )}
            <StringFilter
              fullWidth={false}
              filter={eventFilter}
              setFilter={setEventFilter}
              placeholderText="Begin typing event name or performer or venue or category or city"
              color="orange"
            />
          </>
        )}
      </div>

      {displayEvents.length > 0 && (
        <div
          className={`dashboard-table grid-cols-[repeat(${isLarge ? "8" : isSmall ? "5" : "6"},minmax(0,1fr))]`}
        >
          <div
            className={`bg-primary-orange dashboard-heading text-neutral-100 col-span-${isLarge ? "8" : isSmall ? "5" : "6"} p-1 text-center`}
          >
            {displayEvents.length} EVENT{displayEvents.length !== 1 && "S"}
          </div>
          <EventDashboardList events={displayEvents} />
        </div>
      )}
    </>
  );
}

export default EventDashboard;
