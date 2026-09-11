import ImageDashboardItem from "./ImageDashboardItem";

function ImageDashboardList({ images }) {
  return (
    <div
      id="mel"
      className="mx-1 my-2 grid min-w-0 grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),1fr))] gap-3"
    >
      {images.map((image) => (
        <ImageDashboardItem image={image} key={image.id} />
      ))}
    </div>
  );
}

export default ImageDashboardList;

// const { error: storageError } = await supabase.storage
//   .from("cabin-images")
//   .upload(imageName, cabin.image);
