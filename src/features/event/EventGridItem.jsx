import { formatWithLongDay, formatTime } from "../../utilities/dateTimeFormats";
import {
  HiCalendarDays,
  HiMiniCurrencyDollar,
  HiClock,
  HiMapPin,
  HiMiniTag,
} from "react-icons/hi2";

import { defaultImageUrl } from "../../utilities/utilities";
import EventOverlay from "./EventOverlay";
import Modal from "../../ui/Modal";
import ViewEvent from "./ViewEvent";

function EventGridItem({ event, isCancelled = false, isPostponed = false }) {
  const {
    title,
    description,
    eventDate,
    eventStartTime,
    imageUrl,
    category,
    venue,
    cost,
  } = event;

  const reduceVisibility = isPostponed || isCancelled || venue.isRetired;
  const reduceVisibilityClass = reduceVisibility ? "delayedOrCancelled" : "";

  return (
    <Modal>
      <Modal.Open opens="view">
        <li className="relative flex flex-col overflow-hidden border-2 border-neutral-300 p-2">
          <EventOverlay
            isPostponed={event.isPostponed}
            isCancelled={event.isCancelled || event.venue.isRetired}
          />
          <img
            src={imageUrl ? imageUrl : defaultImageUrl}
            alt="Event image"
            title={title}
            max-width="50"
            max-height="50"
            className={reduceVisibilityClass}
          />
          <h4 className={`textPink ${reduceVisibilityClass}`}>{title}</h4>
          {/* <p className={reduceVisibilityClass}>{description}</p> */}
          <div className="mb-auto pt-3">
            {/* className={reduceVisibilityClass} */}
            <div className="items-top grid grid-cols-[15px_1fr] gap-x-2">
              <HiCalendarDays className="icon mt-0.5" />
              <div className="content whitespace-nowrap">
                {formatWithLongDay(eventDate)}
              </div>
            </div>
            <div className="items-top grid grid-cols-[15px_1fr] gap-x-2">
              <HiClock className="icon mt-0.5" />
              <div className="content"> {formatTime(eventStartTime)}</div>
            </div>
            <div className="items-top grid grid-cols-[15px_1fr] gap-x-2">
              <HiMapPin className="icon mt-0.5" />
              <div className="content">
                {venue.name}
                <br /> {venue.city}, {venue.state}
              </div>
            </div>
            <div className="items-top grid grid-cols-[15px_1fr] gap-x-2">
              <HiMiniTag className="icon mt-0.5" />
              <div className="content">{category.value}</div>
            </div>
            <div className="items-top gap--x2 grid grid-cols-[15px_1fr] gap-x-2">
              <HiMiniCurrencyDollar className="icon mt-0.5" />
              <div className="content">{cost === 0 ? "FREE!" : `${cost}`}</div>
            </div>
          </div>
        </li>
      </Modal.Open>

      <Modal.Window name="view">
        <ViewEvent event={event} />
      </Modal.Window>
    </Modal>
  );
}

export default EventGridItem;
