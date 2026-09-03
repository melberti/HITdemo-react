import { HiOutlineCursorClick } from "react-icons/hi";

import EventDashboardItem from "./EventDashboardItem";

function EventDashboardList({ events }) {
  return (
    <>
      <div className="tableHeading orange contents">
        <div>Date</div>
        <div>Title</div>
        <div>Venue</div>
        <div>Category</div>
        <div>Cost</div>
        <div>
          Image <HiOutlineCursorClick size={18} className="inline" />
        </div>
        <div>Status</div>
        <div>Action</div>
      </div>
      {events.map((event) => (
        <EventDashboardItem event={event} key={event.id} />
      ))}
    </>
  );
}

export default EventDashboardList;
