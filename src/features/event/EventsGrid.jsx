import EventGridItem from "./EventGridItem"

function EventsGrid({ events }) {
  return (
    <ul className="grid grid-cols-1 gap-10 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {events.map((event) => (
        <EventGridItem event={event} key={event.id } />
      ))}
    </ul>
  );
}

export default EventsGrid;
