import VenueDashboard from "../features/venue/VenueDashboard";
import EventDashboard from "../features/event/EventDashboard";
import ImageDashboard from "../features/image/ImageDashboard";

function Dashboard() {
  return (
    <>
      <h1 className="mt-2 mb-6 text-center">My Dashboard</h1>
      <EventDashboard />
      <VenueDashboard />
      <ImageDashboard />
    </>
  );
}

export default Dashboard;
