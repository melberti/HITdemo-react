import EventDashboardItem from "./EventDashboardItem";

function EventDashboardList({ events }) {
  return (
    <>
      <div className="tableHeading contents">
        <div>Date</div>
        <div>Title</div>
        <div>Venue</div>
        <div>Category</div>
        <div>Cost</div>
        <div>URL</div>
        <div>Postponed/Cancelled</div>
      </div>
      {events.map((event) => (
        <EventDashboardItem event={event} key={event.id} />
      ))}
    </>
  );
}

export default EventDashboardList;
