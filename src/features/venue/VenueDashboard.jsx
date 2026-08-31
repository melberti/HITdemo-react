import { useMyVenues } from "../../features/venue/useMyVenues";
import Spinner from "../../ui/Spinner";
import VenueDashboardList from "./VenueDashboardList";
import Button from "../../ui/Button";
import { useNavigate } from "react-router";

function VenueDashboard() {
  const { venues, isLoading } = useMyVenues({
    sortCol: "name",
    sortDir: "asc",
  });

  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  return (
    <>
      <Button onClick={() => navigate("/addvenue")} color="secondary">
        Add Venue
      </Button>
      <div className="mt-2 mb-10 grid grid-cols-5 gap-1 bg-neutral-200 p-1">
        <div className="col-span-5 bg-(--primary-pink) p-1 text-center text-white">
          {venues.length} VENUE{venues.length > 1 && "S"}
        </div>

        <VenueDashboardList venues={venues} />
      </div>
    </>
  );
}

export default VenueDashboard;
