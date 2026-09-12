import { Link } from "react-router";
import StringFilter from "../ui/StringFilter";
import EventsGrid from "../features/event/EventsGrid";
import { useAuthTimeout } from "../context/AuthTimeoutContext";

function Home() {
  const { session } = useAuthTimeout();

  const isAuthenticated = !!session;

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        {!isAuthenticated && (
          <h2>
            <Link to="/signup">Sign up</Link> or{" "}
            <Link to="/signin">sign in</Link> to create events now!
          </h2>
        )}
        <StringFilter placeholderText="Begin typing event name or performer or venue or category or city" />
        <EventsGrid />
      </div>
    </>
  );
}

export default Home;
