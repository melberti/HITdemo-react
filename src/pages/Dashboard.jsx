import { useNavigate } from "react-router";
import Button from "../ui/Button";
import VenueDashboard from "../features/venue/VenueDashboard";
import EventDashboard from "../features/event/EventDashboard";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex gap-2">
        <Button onClick={() => navigate("/addevent")}>Add Event</Button>
        <Button onClick={() => navigate("/addvenue")} color="secondary">
          Add Venue
        </Button>
      </div>

      <EventDashboard />
      <VenueDashboard />
    </>
  );
}

export default Dashboard;
