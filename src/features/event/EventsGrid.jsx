import { useEvents } from "./useEvents";
import EventGridItem from "./EventGridItem";
import Spinner from "../../ui/Spinner";
import NoEventsFound from "./NoEventsFound";
import { useEventFilter } from "../../context/EventFilterContext";

function EventsGrid() {
  const { events, isLoading } = useEvents();

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
    <ul className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {displayEvents?.map((event) => (
        <EventGridItem
          event={event}
          isCancelled={event.isCancelled}
          isPostponed={event.isPostponed}
          key={event.id}
        />
      ))}
    </ul>
  );
}

export default EventsGrid;
