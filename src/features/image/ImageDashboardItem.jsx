import { eventImageBaseUrl } from "../../services/supabase";
import { useUser } from "../authentication/useUser";
import { formatShortDate } from "../../utilities/dateTimeFormats";

function ImageDashboardItem({ image }) {
  const { user } = useUser();
  const myUserid = user.id;

  const imageUrl = `${eventImageBaseUrl}${myUserid}/${image.name}`;

  return (
    <li className="relative flex flex-col overflow-hidden border-2 border-neutral-300 bg-white p-2">
      {" "}
      <img
        src={imageUrl}
        alt={`Image named ${image.name}`}
        title={image.name}
        className="mb-2"
      />
      {image.name}
      <br />
      Uploaded {formatShortDate(image.created_at)}
    </li>
  );
}

export default ImageDashboardItem;
