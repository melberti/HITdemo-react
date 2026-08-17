import { formatWithDay, formatTime } from "../../utilities/dateFormats";
import { HiCalendarDays, HiMiniCurrencyDollar, HiAdjustmentsHorizontal, HiClock   } from "react-icons/hi2";

import { SlLocationPin } from "react-icons/sl";

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

  console.log('eventDate', eventDate)

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
      <p>
        {description}
        </p>

      <div>
        <HiCalendarDays color="var(--primary-pink)" style={{display: "inline"}} />{formatWithDay(eventDate)}
        <br/><HiClock  color="var(--primary-pink)" style={{display: "inline"}}/>{ formatTime(eventStartTime) }
        </div>  
        <SlLocationPin color="var(--primary-pink)" style={{display: "inline"}} />{venue.name}, {venue.city} {venue.state}
       
        <HiAdjustmentsHorizontal  color="var(--primary-pink)" style={{display: "inline"}} />{category.value}
        <br />
        <HiMiniCurrencyDollar color="var(--primary-pink)" style={{display: "inline"}} />{cost === 0 ? "FREE!" : `${cost}`}
      
    </li>
  );
}

export default EventGridItem;
