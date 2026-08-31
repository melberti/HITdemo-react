import { Link } from "react-router";

import { formatWithDayShortMonth } from "../../utilities/dateTimeFormats";
import { defaultImageUrl, getFilenameFromUrl } from "../../utilities/utilities";
import { useUser } from "../authentication/useUser";
import Modal from "../../ui/Modal";
import ViewImage from "../image/ViewImage";

function EventDashboardItem({ event }) {
  const { user } = useUser();
  const userId = user?.id;

  const imageUrl = event.imageUrl || defaultImageUrl;

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
      <div className="whitespace-nowrap">
        {imageUrl !== defaultImageUrl && (
          <Modal>
            <Modal.Open opens="imageUrl">
              <Link>{getFilenameFromUrl(imageUrl, userId)}</Link>
            </Modal.Open>
            <Modal.Window name="imageUrl">
              <ViewImage
                publicUrl={imageUrl}
                imgName={getFilenameFromUrl(imageUrl)}
              />
            </Modal.Window>
          </Modal>
        )}
      </div>
      <div>
        {event.isPostponed ? "Postponed" : event.isCancelled ? "Cancelled" : ""}
      </div>
    </div>
  );
}

export default EventDashboardItem;
