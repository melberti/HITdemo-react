import { useEventFilter } from "../context/EventFilterContext";
import Button from "../ui/Button";

function EventsFilter({ fullWidth = true }) {
  const { filter, setFilter } = useEventFilter(); //filter set to lowercase in EventsFilter at time of set

  function handleChange(e) {
    setFilter(e.target.value);
  }

  return (
    <div className={`items-center filter ${fullWidth ? "w-full" : "w-auto"}`}>
      <span className="text-l font-semibold">Filter:</span>
      <input
        type="text"
        placeholder="Begin typing event name or performer or venue or category or city"
        value={filter}
        onChange={(e) => handleChange(e)}
      />
      <Button color="neutral" size="small" onClick={() => setFilter("")}>
        Reset
      </Button>
    </div>
  );
}

export default EventsFilter;
