import { useNavigate } from "react-router";
import Button from "../ui/Button";
import VenueDashboard from "../features/venue/VenueDashboard";
import EventDashboard from "../features/event/EventDashboard";
import ImageDashboard from "../features/image/ImageDashboard";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate("/addevent")}>Add Event</Button>
      <EventDashboard />
      <VenueDashboard />
      <ImageDashboard />
    </>
  );
}

export default Dashboard;
