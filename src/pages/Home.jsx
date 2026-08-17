import EventsFilter from "../features/event/EventsFilter";
import EventsGrid from "../features/event/EventsGrid";

function Home() {
  return (
    <>
<EventsFilter />
      <EventsGrid />
    </>
  );
}

export default Home;
