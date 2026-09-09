import VenueDashboardItem from "./VenueDashboardItem";

function VenueDashboardList({ venues }) {
  return (
    <>
      <div className="tableHeading pink contents">
        <div>Name</div>
        <div>Address</div>
        <div>Phone</div>
        <div>Url</div>
        <div>Create Date</div>
        <div>Action</div>
      </div>
      {venues.map((venue) => (
        <VenueDashboardItem venue={venue} key={venue.id} />
      ))}
    </>
  );
}

export default VenueDashboardList;
