import { eventImageBaseUrl } from "../../services/supabase";
import { useMyImages } from "./useMyImages";
import { useUser } from "../authentication/useUser";
import { useEventImage } from "../../context/EventImageContext";

import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

function ImageSelect() {
  const { setImageUrl } = useEventImage();

  const { myImages, isLoadingMy } = useMyImages();

  const { user } = useUser();
  const myUserid = user.id;

  if (isLoadingMy) return <Spinner />;

  if (!myImages.length) return <Empty resource="images" />;

  return (
    <>
      <h2>Click any image to select</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
        {myImages.map((img) => {
          const publicUrl = `${eventImageBaseUrl}${myUserid}/${img.name}`;
          return (
            <div key={img.id}>
              <img
                src={publicUrl}
                alt={`Image named ${img.name}`}
                title={`Click to select ${img.name}`}
                onClick={() => setImageUrl(publicUrl)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ImageSelect;
