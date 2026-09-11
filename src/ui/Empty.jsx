function Empty({ resource }) {
  return (
    <>
      <div className="absolute left-0 w-full self-center text-center">
        No {resource} found.
      </div>
    </>
  );
}

export default Empty;
