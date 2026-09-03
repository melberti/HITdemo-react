import VenueDashboard from "../features/venue/VenueDashboard";
import EventDashboard from "../features/event/EventDashboard";
import ImageDashboard from "../features/image/ImageDashboard";

function Dashboard() {
  return (
    <>
      <EventDashboard />
      <VenueDashboard />
      <ImageDashboard />
    </>
  );
}

export default Dashboard;
