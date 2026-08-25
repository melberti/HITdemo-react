import { formatPhoneNumber } from "../../utilities/utilities";
import { formatWithDay } from "../../utilities/dateTimeFormats";

function VenueDashboardItem({ venue }) {
  return (
    <div className="contents">
      <div>{venue.name}</div>
      <div>
        {venue.address1}
        <br />
        {venue.city}, {venue.state} {venue.zipCode}
      </div>
      <div>{formatPhoneNumber(venue.phone)}</div>
      <div>{venue.url}</div>
      <div>{formatWithDay(venue.created_at)}</div>
    </div>
  );
}

export default VenueDashboardItem;
