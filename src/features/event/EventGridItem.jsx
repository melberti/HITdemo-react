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

function EventGridItem({ event, isCancelled = false, isPostponed = false }) {
  const {
    title,
    description,
    eventDate,
    eventStartTime,
    eventEndTime,
    imageUrl,
    category,
    venue,
    webUrl,
    cost,
  } = event;

  const reduceVisibility = isPostponed || isCancelled;
  const reduceVisibilityClass = reduceVisibility ? "delayedOrCancelled" : "";

  return (
    <li className="relative flex flex-col overflow-hidden border-2 border-neutral-300 p-2">
      <EventOverlay
        isPostponed={event.isPostponed}
        isCancelled={event.isCancelled}
      />
      <img
        src={imageUrl ? imageUrl : defaultImageUrl}
        alt="Event image"
        title={title}
        max-width="50"
        max-height="50"
        className={reduceVisibilityClass}
      />
      <h3 className={`textPink ${reduceVisibilityClass}`}>{title}</h3>
      <p className={reduceVisibilityClass}>{description}</p>
      <div className="mt-auto pt-3">
        <div className={reduceVisibilityClass}>
          <HiCalendarDays className="icon" />
          {formatWithLongDay(eventDate)}
          <br />
          <HiClock className="icon" />
          {formatTime(eventStartTime)}
          <br />
          <HiMapPin className="icon" />
          {venue.name}, {venue.city} {venue.state}
          <br />
          <HiMiniTag className="icon" />
          {category.value}
          <br />
          <HiMiniCurrencyDollar className="icon" />
          {cost === 0 ? "FREE!" : `${cost}`}
        </div>
      </div>
    </li>
  );
}

export default EventGridItem;
