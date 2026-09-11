import { useMyImages } from "./useMyImages";
import ImageDashboardItem from "./ImageDashboardItem";
import Spinner from "../../ui/Spinner";

function Test() {
  const { myImages, isLoadingMy } = useMyImages({
    sortCol: "created_at",
    sortDir: "desc",
  });

  if (isLoadingMy) return <Spinner />;
  return (
    <>
      <div className="grid h-full grid-rows-[auto_1fr] bg-neutral-200">
        {/* <!-- Banner row --> */}
        <div className="bg-primary-pink w-full p-2 text-center text-white">
          TEST
        </div>

        {/* <!-- Content area --> */}
        <div className="mx-3 mt-3 grid h-full grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {myImages.map((image) => (
            <ImageDashboardItem image={image} key={image.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Test;
