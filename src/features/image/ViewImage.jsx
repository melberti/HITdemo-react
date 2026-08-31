function ViewImage({ publicUrl, imgName }) {
  return (
    <img
      src={publicUrl}
      width="350"
      alt={`Image named ${imgName}`}
      title={`Click to select ${imgName}`}
    />
  );
}

export default ViewImage;
