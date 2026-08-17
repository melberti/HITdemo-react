import { useEvents } from "./useEvents";
import EventGridItem from "./EventGridItem"
import Spinner from "../../ui/Spinner";
import NoEventsFound from "./NoEventsFound";
import { useEventFilter } from "../../context/EventFilterContext";

function EventsGrid() {

   const {events, isLoading} = useEvents();

const {filter} = useEventFilter(); //filter set to lowercase in EventsFilter at time of set
let displayEvents;


if(filter){
  console.log('filtering events on ', filter);
displayEvents = events.filter((event) => event?.title?.toLowerCase().includes(filter) || event?.venue?.name?.toLowerCase().includes(filter) || event?.venue?.city?.toLowerCase().includes(filter) || event?.description?.toLowerCase().includes(filter));
}
else displayEvents = events;


    
  if(isLoading) return <Spinner />

  if(!events) return <NoEventsFound />

     console.log('events', events);

console.log('displayevents', displayEvents)

  return (
    <ul className="grid grid-cols-1 gap-10 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {displayEvents?.map((event) => (
        <EventGridItem event={event} key={event.id } />
      ))}
    </ul>
  );
}

export default EventsGrid;
