import { Link } from "react-router";
import { formatWithDayShortMonth } from "../../utilities/dateTimeFormats";
import {
  defaultImageUrl,
  getFilenameFromUrl,
  getDateForCompare,
} from "../../utilities/utilities";
import { useUser } from "../authentication/useUser";
import { useUpdateEvent } from "./useUpdateEvent";
import Modal from "../../ui/Modal";
import ViewImage from "../image/ViewImage";
import Button from "../../ui/Button";
import ConfirmAction from "../../ui/ConfirmAction";
import AddEvent from "../../pages/AddEvent";

function EventDashboardItem({ event }) {
  const { user } = useUser();
  const userId = user?.id;

  const imageUrl = event.imageUrl || defaultImageUrl;

  const { updateEvent, isUpdating } = useUpdateEvent();

  function postponeEvent() {
    //if postponing, remove cancelled flag
    updateEvent({ ...event, isPostponed: true, isCancelled: false });
  }

  function cancelEvent() {
    //if cancelling, remove postponed flat
    updateEvent({ ...event, isCancelled: true, isPostponed: false });
  }

  const statusClassName = event.isPostponed
    ? "postponed"
    : event.isCancelled
      ? "cancelled"
      : null;

  const objectName = `${event.title} at ${event.venue.name} for ${formatWithDayShortMonth(event.eventDate)}`;

  const today = getDateForCompare(new Date());
  const eventDateForCompare = getDateForCompare(event.eventDate);

  const cloneEvent = {
    ...event,
    isPostponed: false,
    isCancelled: false,
    id: "",
  };

  return (
    <Modal>
      <div className="contents">
        <div>{formatWithDayShortMonth(event.eventDate)}</div>
        <div>{event.title}</div>
        <div>
          {event.venue.name},<br />
          {event.venue.city} {event.venue.state}
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
          {event.isPostponed
            ? "POSTPONED"
            : event.isCancelled
              ? "CANCELLED"
              : ""}
        </div>

        <div className="content flex gap-2">
          {eventDateForCompare >= today && (
            <Modal.Open opens="edit">
              <Button color="primary" size="small" type="button">
                Edit
              </Button>
            </Modal.Open>
          )}
          <Modal.Open opens="clone">
            <Button color="secondary" size="small" type="button">
              Clone
            </Button>
          </Modal.Open>

          {eventDateForCompare >= today &&
            !event.isPostponed &&
            !event.isCancelled && (
              <Modal.Open opens="postpone">
                <Button size="small" color="postpone" type="button">
                  Postpone
                </Button>
              </Modal.Open>
            )}
          {eventDateForCompare >= today && !event.isCancelled && (
            <Modal.Open opens="cancel">
              <Button color="cancel" size="small" type="button">
                Cancel
              </Button>
            </Modal.Open>
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
          objectName={objectName}
          onConfirm={() => postponeEvent()}
        />
      </Modal.Window>
      <Modal.Window name="cancel">
        <ConfirmAction
          action="cancel"
          objectName={objectName}
          onConfirm={() => cancelEvent()}
        />
      </Modal.Window>
      <Modal.Window name="edit">
        <AddEvent event={event} />
      </Modal.Window>{" "}
      <Modal.Window name="clone">
        <AddEvent event={cloneEvent} />
      </Modal.Window>{" "}
    </Modal>
  );
}

export default EventDashboardItem;
