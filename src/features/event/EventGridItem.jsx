import { formatWithDay } from "../../utilities/dateFormats";

function EventGridItem({ event }) {
  const {
    title,
    description,
    date,
    time,
    image,
    category,
    venue,
    webUrl,
    cost,
  } = event;

  return (
    <li className="border-2 border-(--primary-pink)">
      <img
        src={image}
        alt="Event image"
        title={title}
        max-width="50"
        max-height="50"
      />
      <h3>{title}</h3>
      <p>
        {description}
        <br />
        Category: {category}
        <br />
        {formatWithDay(date)} @ {time}
        <br />
        {venue}
        <br />
        {cost === 0 ? "FREE!" : `${cost}`}
      </p>
    </li>
  );
}

export default EventGridItem;
