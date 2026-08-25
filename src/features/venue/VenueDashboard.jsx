import { useMyVenues } from "../../features/venue/useMyVenues";
import Spinner from "../../ui/Spinner";
import VenueDashboardList from "./VenueDashboardList";

function VenueDashboard() {
  const { venues, isLoading } = useMyVenues({
    sortCol: "name",
    sortDir: "asc",
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="mt-10 grid grid-cols-5 gap-1 bg-neutral-200 p-1">
      <div className="col-span-5 bg-[var(--primary-pink)] p-1 text-center text-white">
        {venues.length} VENUES
      </div>

      <VenueDashboardList venues={venues} />
    </div>
  );
}

export default VenueDashboard;
