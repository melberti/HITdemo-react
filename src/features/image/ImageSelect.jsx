import { eventImageBaseUrl } from "../../services/supabase";
import { useMyImages } from "./useMyImages";
import { useUser } from "../authentication/useUser";
import { useEventImage } from "../../context/EventImageContext";

import Spinner from "../../ui/Spinner";

function ImageSelect() {
  const { setImageUrl } = useEventImage();

  const { myImages, isLoadingMy } = useMyImages();

  const { user } = useUser();
  const myUserid = user.id;

  if (isLoadingMy) return <Spinner />;

  return (
    <>
      <h2>Click any image to select</h2>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {myImages.map((img) => {
          const publicUrl = `${eventImageBaseUrl}${myUserid}/${img.name}`;
          return (
            <div key={img.id}>
              <img
                src={publicUrl}
                width="120"
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
