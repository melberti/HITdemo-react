import { eventImageBaseUrl } from "../../services/supabase";
import { useUser } from "../authentication/useUser";
import { formatShortDate } from "../../utilities/dateTimeFormats";

function ImageDashboardItem({ image }) {
  const { user } = useUser();
  const myUserid = user.id;

  const imageUrl = `${eventImageBaseUrl}${myUserid}/${image.name}`;

  return (
    <div className="content image-item col-span-1 min-w-0 p-2">
      {" "}
      <img
        src={imageUrl}
        alt={`Image named ${image.name}`}
        title={image.name}
        className="mb-2 w-full"
      />
      {image.name}
      <br />
      Uploaded {formatShortDate(image.created_at)}
    </div>
  );
}

export default ImageDashboardItem;
