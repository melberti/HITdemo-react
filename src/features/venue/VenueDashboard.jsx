import { useNavigate } from "react-router";
import { useMyVenues } from "../../features/venue/useMyVenues";
import { useVenueFilter } from "../../context/VenueFilterContext";
import Spinner from "../../ui/Spinner";
import VenueDashboardList from "./VenueDashboardList";
import Button from "../../ui/Button";
import StringFilter from "../../ui/StringFilter";

function VenueDashboard() {
  const { venues, isLoading } = useMyVenues({
    sortCol: "name",
    sortDir: "asc",
  });

  const navigate = useNavigate();

  const { venueFilter, setVenueFilter } = useVenueFilter();

  let displayVenues;

  if (venueFilter) {
    displayVenues = venues.filter(
      (venue) =>
        venue?.name?.toLowerCase().includes(venueFilter) ||
        venue?.city?.toLowerCase().includes(venueFilter),
    );
  } else displayVenues = venues;

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="flex justify-between">
        <Button onClick={() => navigate("/addvenue")} color="secondary">
          Add Venue
        </Button>
        <StringFilter
          fullWidth={false}
          filter={venueFilter}
          setFilter={setVenueFilter}
          color="pink"
          placeholderText="Begin typing venue name or city"
        />
      </div>
      <div className="mt-2 mb-10 grid grid-cols-6 gap-1 bg-neutral-200 p-1">
        <div className="bg-primary-pink col-span-6 p-1 text-center text-white">
          {venues.length} VENUE{displayVenues.length > 1 && "S"}
        </div>

        <VenueDashboardList venues={displayVenues} />
      </div>
    </>
  );
}

export default VenueDashboard;
