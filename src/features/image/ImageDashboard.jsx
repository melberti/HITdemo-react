import { useMyImages } from "./useMyImages";
import Spinner from "../../ui/Spinner";
import ImageDashboardList from "./ImageDashboardList";

function ImageDashboard() {
  const { myImages, isLoadingMy } = useMyImages({
    sortCol: "created_at",
    sortDir: "desc",
  });

  if (isLoadingMy) return <Spinner />;

  return (
    <div className="mt-10 gap-1 bg-neutral-200 p-1">
      <div className="col-span-5 bg-[var(--primary-pink)] p-1 text-center text-white">
        {myImages?.length} IMAGE{myImages?.length > 1 && "S"}
      </div>

      <ImageDashboardList images={myImages} />
    </div>
  );
}

export default ImageDashboard;
