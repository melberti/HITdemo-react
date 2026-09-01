import { Link } from "react-router";
import { formatWithDayShortMonth } from "../../utilities/dateTimeFormats";
import { defaultImageUrl, getFilenameFromUrl } from "../../utilities/utilities";
import { useUser } from "../authentication/useUser";
import { useUpdateEvent } from "./useUpdateEvent";
import Modal from "../../ui/Modal";
import ViewImage from "../image/ViewImage";
import Button from "../../ui/Button";
import ConfirmAction from "../../ui/ConfirmAction";

function EventDashboardItem({ event }) {
  const { user } = useUser();
  const userId = user?.id;

  const imageUrl = event.imageUrl || defaultImageUrl;

  const { updateEvent, isUpdating } = useUpdateEvent();

  function postponeEvent() {
    console.log("calling postpone");
    //const eventToUpdate = { ...event, isPostponed: true };
    updateEvent({ ...event, isPostponed: true });
  }

  function cancelEvent() {
    console.log("calling cancel");
    //const eventToUpdate = { ...event, isCancelled: true };
    updateEvent({ ...event, isCancelled: true });
  }

  const statusClassName = event.isPostponed
    ? "postponed"
    : event.isCancelled
      ? "cancelled"
      : null;

  return (
    <Modal>
      <div className="contents">
        <div>{formatWithDayShortMonth(event.eventDate)}</div>
        <div>{event.title}</div>
        <div>
          {event.venue.name}, {event.venue.city}
        </div>
        <div className="whitespace-nowrap">{event.category.value}</div>
        <div>{event.cost == 0 ? "FREE" : `$${event.cost}`}</div>
        <div className="whitespace-nowrap">
          {imageUrl !== defaultImageUrl && (
            <Modal.Open opens="imageUrl">
              <Link>{getFilenameFromUrl(imageUrl, userId)}</Link>
            </Modal.Open>
          )}
        </div>
        <div className={`${statusClassName} whitespace-nowrap`}>
          {event.isPostponed ? (
            "POSTPONED"
          ) : event.isCancelled ? (
            "CANCELLED"
          ) : (
            <div className="content flex gap-2">
              <Modal.Open opens="postpone">
                <Button size="small" color="postpone" type="button">
                  Postpone Event
                </Button>
              </Modal.Open>
              <Modal.Open opens="cancel">
                <Button color="cancel" size="small" type="button">
                  Cancel Event
                </Button>
              </Modal.Open>
            </div>
          )}
        </div>
      </div>

      <Modal.Window name="imageUrl">
        <ViewImage
          publicUrl={imageUrl}
          imgName={getFilenameFromUrl(imageUrl)}
        />
      </Modal.Window>

      <Modal.Window name="postpone">
        <ConfirmAction
          action="postpone"
          objectName={event.title}
          onConfirm={() => postponeEvent()}
        />
      </Modal.Window>
      <Modal.Window name="cancel">
        <ConfirmAction
          action="cancel"
          objectName={event.title}
          onConfirm={() => cancelEvent()}
        />
      </Modal.Window>
    </Modal>
  );
}

export default EventDashboardItem;
