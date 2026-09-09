import Button from "./Button";

function StringFilter({
  fullWidth = true,
  color = "orange",
  filter,
  setFilter,
  placeholderText,
}) {
  function handleChange(e) {
    setFilter(e.target.value);
  }

  return (
    <div
      className={`${color} items-center filter ${fullWidth ? "w-full" : "w-auto"}`}
    >
      <span className="text-l font-semibold">Filter:</span>
      <input
        type="text"
        id="filterString"
        placeholder={placeholderText}
        value={filter}
        onChange={(e) => handleChange(e)}
      />
      <Button color="neutral" size="small" onClick={() => setFilter("")}>
        Reset
      </Button>
    </div>
  );
}

export default StringFilter;
