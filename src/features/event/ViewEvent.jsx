import { Link } from "react-router";
import {
  HiCalendarDays,
  HiMiniCurrencyDollar,
  HiClock,
  HiMapPin,
  HiMiniTag,
} from "react-icons/hi2";
import { IoTicketOutline } from "react-icons/io5";
import EventOverlay from "./EventOverlay";
import { formatWithLongDay, formatTime } from "../../utilities/dateTimeFormats";
import { defaultImageUrl, formatPhoneNumber } from "../../utilities/utilities";

function ViewEvent({ event }) {
  const {
    title,
    description,
    eventDate,
    eventStartTime,
    eventEndTime,
    imageUrl,
    category,
    venue,
    eventUrl,
    cost,
    isPostponed,
    isCancelled,
  } = event;

  const mapsUrl = getMapsLink();

  function getMapsLink() {
    const businessName = venue.name;
    const address = `${venue.address1}, ${venue.city}, ${venue.state} ${venue.zipCode}`;

    const query = encodeURIComponent(`${businessName}, ${address}`);
    const mapsUrl = `https://maps.apple.com/place?q=${query}`;

    // const encodedBusiness = encodeURIComponent(businessName);
    // const encodedAddress = encodeURIComponent(address);
    // const mapsUrl = `https://maps.apple.com/place?q=${encodedBusiness}&address=${encodedAddress}`;

    //console.log(mapsUrl);

    return mapsUrl;
  }

  //https://maps.apple.com/?ll=40.748817,-73.985428&q=Empire+State+Building
  //daddr

  const reduceVisibility = isPostponed || isCancelled;
  const reduceVisibilityClass = reduceVisibility ? "delayedOrCancelled" : "";

  return (
    <div className="content event-grid-item relative flex w-[425px] flex-col overflow-hidden border-2 border-neutral-300 bg-white p-2">
      <EventOverlay
        isPostponed={event.isPostponed}
        isCancelled={event.isCancelled}
      />
      <img
        src={imageUrl ? imageUrl : defaultImageUrl}
        alt="Event image"
        title={title}
        className={`mb-4 ${reduceVisibilityClass}`}
      />
      <h3 className={`event-title ${reduceVisibilityClass}`}>{title}</h3>

      <span className={`${reduceVisibilityClass}`}>
        <p className={reduceVisibilityClass}>{description}</p>

        <div className={`mt-auto pt-3 ${reduceVisibilityClass}`}>
          <div className="items-top grid grid-cols-[15px_1fr] gap-x-2">
            <HiCalendarDays className="icon mt-0.5" />
            <div className="content">{formatWithLongDay(eventDate)}</div>
          </div>

          <div className="items-top grid grid-cols-[15px_1fr] gap-x-2">
            <HiClock className="icon mt-0.5" />
            <div className="content">
              {formatTime(eventStartTime)} to {formatTime(eventEndTime)}
            </div>
          </div>

          <div className="items-top grid grid-cols-[15px_1fr] gap-x-2">
            <HiMapPin className="icon mt-0.5" />
            <div className="content pb-2">
              <Link to={mapsUrl} target="_blank">
                {venue.name}
              </Link>
              <br />
              {venue.address1}
              <br /> {venue.city}, {venue.state} {venue.zipCode}
              <br />
              {formatPhoneNumber(venue.phone)}
              <br />
              {venue.url && <Link to={venue.url}>{venue.url}</Link>}
            </div>
          </div>

          <div className="items-top grid grid-cols-[15px_1fr] gap-x-2">
            <HiMiniTag className="icon mt-0.5" />
            <div className="content">{category.value}</div>
          </div>

          <div className="items-top grid grid-cols-[15px_1fr] gap-x-2">
            <HiMiniCurrencyDollar className="icon mt-0.5" />
            <div className="content">{cost === 0 ? "FREE!" : `${cost}`}</div>
          </div>

          {eventUrl && (
            <div className="items-top mt-2 grid grid-cols-[15px_1fr] gap-x-2">
              <IoTicketOutline className="icon mt-0.5" />
              <div className="content">
                For more information or tickets:{" "}
                <Link to={eventUrl} target="_blank">
                  {eventUrl}
                </Link>
              </div>
            </div>
          )}
        </div>
      </span>
    </div>
  );
}

export default ViewEvent;
