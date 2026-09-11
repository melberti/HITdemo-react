import { useMyImages } from "./useMyImages";
import { useNavigate } from "react-router";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import ImageDashboardList from "./ImageDashboardList";
import Empty from "../../ui/Empty";

function ImageDashboard() {
  const { myImages, isLoadingMy } = useMyImages({
    sortCol: "created_at",
    sortDir: "desc",
  });

  const navigate = useNavigate();

  if (isLoadingMy) return <Spinner />;

  const topMarginClass = !myImages.length ? "mt-10" : "";

  return (
    <>
      <div className={`flex justify-between ${topMarginClass}`}>
        <Button onClick={() => navigate("/addimage")} color="secondary">
          Add Image
        </Button>

        {!myImages.length && <Empty resource="images" />}
      </div>

      {myImages.length > 0 && (
        <div className="mt-2 mb-10 grid h-full grid-rows-[auto_1fr] gap-1">
          <div className="bg-primary-pink image-banner dashboard-heading border-4 p-1 text-center text-neutral-100">
            {myImages?.length} IMAGE{myImages?.length !== 1 && "S"}
          </div>

          <ImageDashboardList images={myImages} />
        </div>
      )}
    </>
  );
}

export default ImageDashboard;
