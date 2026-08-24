import { useNavigate } from "react-router";
import Button from "../ui/Button";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex gap-2">
        <Button onClick={() => navigate("/addevent")}>Add Event</Button>
        <Button type="secondary">Add Venue</Button>
        <Button type="secondary">Add Organization</Button>
      </div>
    </>
  );
}

export default Dashboard;
