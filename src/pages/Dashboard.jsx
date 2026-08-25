import { useNavigate } from "react-router";
import { useMyVenues } from "../features/venue/useMyVenues";
import { formatPhoneNumber } from "../utilities/utilities";
import { formatWithDay } from "../utilities/dateTimeFormats";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";

function Dashboard() {
  const navigate = useNavigate();

  const { venues, isLoading } = useMyVenues({
    sortCol: "name",
    sortDir: "asc",
  });

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="flex gap-2">
        <Button onClick={() => navigate("/addevent")}>Add Event</Button>
        <Button onClick={() => navigate("/addvenue")} color="secondary">
          Add Venue
        </Button>
      </div>

      <div className="mt-10 grid grid-cols-5 gap-1 bg-neutral-200 p-1">
        <div className="col-span-5 bg-[var(--primary-pink)] p-1 text-center text-white">
          {venues.length} VENUES
        </div>

        <div className="tableHeading mel contents">
          <div>Name</div>
          <div>Address</div>
          <div>Phone</div>
          <div>Url</div>
          <div>Create Date</div>
        </div>
        {venues.map((venue) => (
          <div className="contents" key={venue.id}>
            <div>{venue.name}</div>
            <div>
              {venue.address1}
              <br />
              {venue.city}, {venue.state} {venue.zipCode}
            </div>
            <div>{formatPhoneNumber(venue.phone)}</div>
            <div>{venue.url}5</div>
            <div>{formatWithDay(venue.created_at)}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
