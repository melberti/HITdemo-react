import { Link } from "react-router";
import StringFilter from "../ui/StringFilter";
import EventsGrid from "../features/event/EventsGrid";

function Home() {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <h2>
          <Link to="/signup">Sign up</Link> or <Link to="/signin">sign in</Link>{" "}
          to create events now!
        </h2>
        <StringFilter placeholderText="Begin typing event name or performer or venue or category or city" />
        <EventsGrid />
      </div>
    </>
  );
}

export default Home;
