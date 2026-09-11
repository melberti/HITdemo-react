import { HiOutlineCursorClick } from "react-icons/hi";
import { useMedia } from "../../context/MediaQueryContext";

import EventDashboardItem from "./EventDashboardItem";

function EventDashboardList({ events }) {
  const { isSmall, isMedium, isLarge } = useMedia();

  return (
    <>
      <div className="tableHeading orange contents">
        <div>Date</div>
        <div>Title</div>
        <div>Venue</div>
        {isLarge && <div>Category</div>}
        {!isSmall && <div>Cost</div>}
        {isLarge && (
          <div>
            Image <HiOutlineCursorClick size={18} className="inline" />
          </div>
        )}
        <div className="text-nowrap">Status</div>
        <div>Action</div>
      </div>
      {events.map((event) => (
        <EventDashboardItem event={event} key={event.id} />
      ))}
    </>
  );
}

export default EventDashboardList;
