import { useNavigate } from "react-router";
import { useMyVenues } from "../../features/venue/useMyVenues";
import { useVenueFilter } from "../../context/VenueFilterContext";
import Spinner from "../../ui/Spinner";
import VenueDashboardList from "./VenueDashboardList";
import Button from "../../ui/Button";
import StringFilter from "../../ui/StringFilter";
import Empty from "../../ui/Empty";

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

  const topMarginClass = !displayVenues.length ? "mt-10" : "";

  return (
    <>
      <div className={`flex justify-between ${topMarginClass}`}>
        <Button onClick={() => navigate("/addvenue")} color="secondary">
          Add Venue
        </Button>

        {!displayVenues.length ? (
          <Empty resource="venues" />
        ) : (
          <StringFilter
            fullWidth={false}
            filter={venueFilter}
            setFilter={setVenueFilter}
            color="pink"
            placeholderText="Begin typing venue name or city"
          />
        )}
      </div>

      {displayVenues.length > 0 && (
        <div className="dashboard-table grid-cols-6">
          <div className="bg-primary-pink dashboard-heading col-span-6 p-1 text-center text-neutral-100">
            {venues.length} VENUE{displayVenues.length !== 1 && "S"}
          </div>

          <VenueDashboardList venues={displayVenues} />
        </div>
      )}
    </>
  );
}

export default VenueDashboard;
