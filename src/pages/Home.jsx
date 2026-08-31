import EventsFilter from "../features/event/EventsFilter";
import EventsGrid from "../features/event/EventsGrid";
import { Link } from "react-router";
import { usePostdateEvents } from "../features/event/usePostdateEvents";

function Home() {
  const { postDateEvents } = usePostdateEvents();

  function handleLinkClick() {
    postDateEvents();
  }

  return (
    <>
      <div className="content descriptor mx-2 mb-8">
        <p>
          <span className="siteName">Hear There Everywhere</span> is a
          fictitious music events web site loosely based on my friend Elisa
          Zuckerberg's real events web site{" "}
          <a href="https://hearitthere.com" target="new">
            Hear It There
          </a>
          . It is intended as a demo of my React knowledge and features a
          Supabase back-end. It also makes use of context, lazy
          loading/suspense, Tanstack Query and Tailwind.{" "}
          <span className="font-semibold">If you do not see events, </span>
          <Link onClick={handleLinkClick}>
            click here to update with future dates
          </Link>
          .
        </p>
        <p>
          All original bands and events are fictitious; original venues may or
          may not exist and are located in the greater Syracuse, NY area.
          Original images have been generated with AI. I cannot take
          responsibility for images uploaded or events/venues created by users
          of this demo web site.
        </p>
      </div>
      <EventsFilter />
      <EventsGrid />
    </>
  );
}

export default Home;
