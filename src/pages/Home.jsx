import StringFilter from "../ui/StringFilter";
import EventsGrid from "../features/event/EventsGrid";

function Home() {
  return (
    <>
      <StringFilter placeholderText="Begin typing event name or performer or venue or category or city" />
      <EventsGrid />
    </>
  );
}

export default Home;
