import { formatWithDay, formatTime } from "../../utilities/dateTimeFormats";
import {
  HiCalendarDays,
  HiMiniCurrencyDollar,
  HiClock,
  HiMapPin,
  HiMiniTag,
} from "react-icons/hi2";

function EventGridItem({ event }) {
  const {
    title,
    description,
    eventDate,
    eventStartTime,
    image,
    category,
    venue,
    webUrl,
    cost,
  } = event;

  return (
    <li className="border-2 border-neutral-300 p-2">
      <img
        src={image}
        alt="Event image"
        title={title}
        max-width="50"
        max-height="50"
      />
      <h3 className="textPink">{title}</h3>
      <p>{description}</p>
      <div>
        <HiCalendarDays className="icon" />
        {formatWithDay(eventDate)}
        <br />
        <HiClock className="icon" />
        {formatTime(eventStartTime)}
      </div>
      <HiMapPin className="icon" />
      {venue.name}, {venue.city} {venue.state}
      <br />
      <HiMiniTag className="icon" />
      {category.value}
      <br />
      <HiMiniCurrencyDollar className="icon" />
      {cost === 0 ? "FREE!" : `${cost}`}
    </li>
  );
}

export default EventGridItem;
