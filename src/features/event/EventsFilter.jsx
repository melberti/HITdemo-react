import { useEventFilter } from "../../context/EventFilterContext";
import Button from "../../ui/Button";

function EventsFilter() {
  const { filter, setFilter } = useEventFilter(); //filter set to lowercase in EventsFilter at time of set
  let displayEvents = [{}];

  function handleChange(e) {
    setFilter(e.target.value);

    //submit filter, cancelling any prior filter
  }

  return (
    <div className="filter">
      <span className="text-xl font-semibold">Filter:</span>
      <input
        type="text"
        placeholder="Begin typing event name or performer or venue or category or city"
        value={filter}
        onChange={(e) => handleChange(e)}
      />
      <Button color="neutral" onClick={() => setFilter("")}>
        Reset
      </Button>
    </div>
  );
}

export default EventsFilter;
