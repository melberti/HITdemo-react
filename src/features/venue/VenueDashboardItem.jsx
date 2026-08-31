import { formatPhoneNumber } from "../../utilities/utilities";
import { formatWithLongDay } from "../../utilities/dateTimeFormats";

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
      <div>{formatWithLongDay(venue.created_at)}</div>
    </div>
  );
}

export default VenueDashboardItem;
