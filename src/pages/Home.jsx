import EventsFilter from "../features/event/EventsFilter";
import EventsGrid from "../features/event/EventsGrid";

function Home() {
  return (
    <>
      <h2 className="descriptor mx-50 mb-8">
        <span className="siteName">Hear There Everywhere</span> is a music
        events web site loosely based on my friend Elisa Zuckerberg's real
        events web site{" "}
        <a href="https://hearitthere.com" target="new">
          Hear It There
        </a>
        . This demo is built with React and has a Supabase back-end. All bands
        and events are fictitious; venues may or may not exist and are located
        in the greater Syracuse, NY area.
      </h2>
      <EventsFilter />
      <EventsGrid />
    </>
  );
}

export default Home;
