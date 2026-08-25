import { formatWithDayShortMonth } from "../../utilities/dateTimeFormats";

function EventDashboardItem({ event }) {
  return (
    <div className="contents">
      <div>{formatWithDayShortMonth(event.eventDate)}</div>
      <div>{event.title}</div>
      <div>
        {event.venue.name}, {event.venue.city}
      </div>
      <div>{event.category.value}</div>
      <div>
        {event.cost} {event.cost == 0 && "/ FREE"}
      </div>
      <div>{event.url}</div>
      <div>
        {event.isPostponed ? "Postponed" : event.isCancelled ? "Cancelled" : ""}
      </div>
    </div>
  );
}

export default EventDashboardItem;
