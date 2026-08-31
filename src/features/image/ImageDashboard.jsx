import { useMyImages } from "./useMyImages";
import { useNavigate } from "react-router";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import ImageDashboardList from "./ImageDashboardList";

function ImageDashboard() {
  const { myImages, isLoadingMy } = useMyImages({
    sortCol: "created_at",
    sortDir: "desc",
  });

  const navigate = useNavigate();

  if (isLoadingMy) return <Spinner />;

  return (
    <>
      <Button onClick={() => navigate("/addimage")} color="secondary">
        Add Image
      </Button>
      <div className="mt-2 mb-10 gap-1 bg-neutral-200 p-1">
        <div className="col-span-5 bg-(--primary-pink) p-1 text-center text-white">
          {myImages?.length} IMAGE{myImages?.length > 1 && "S"}
        </div>

        <ImageDashboardList images={myImages} />
      </div>
    </>
  );
}

export default ImageDashboard;
