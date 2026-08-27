import { useNavigate } from "react-router";
import Button from "../ui/Button";
import VenueDashboard from "../features/venue/VenueDashboard";
import EventDashboard from "../features/event/EventDashboard";
import ImageDashboard from "../features/image/ImageDashboard";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex gap-2">
        <Button onClick={() => navigate("/addevent")}>Add Event</Button>
        <Button onClick={() => navigate("/addvenue")} color="secondary">
          Add Venue
        </Button>
        <Button onClick={() => navigate("/addimage")} color="secondary">
          Add Image
        </Button>
      </div>
      <ImageDashboard />
      <EventDashboard />
      <VenueDashboard />
    </>
  );
}

export default Dashboard;
