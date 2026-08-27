import ImageDashboardItem from "./ImageDashboardItem";

function ImageDashboardList({ images }) {
  return (
    <>
      <ul className="bt-5 m-3 grid grid-cols-1 gap-8 bg-neutral-200 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {images.map((image) => (
          <ImageDashboardItem image={image} key={image.id} />
        ))}
      </ul>
    </>
  );
}

export default ImageDashboardList;

// const { error: storageError } = await supabase.storage
//   .from("cabin-images")
//   .upload(imageName, cabin.image);
