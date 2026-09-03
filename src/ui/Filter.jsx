import { useSearchParams } from "react-router";
import Button from "./Button";

function Filter({ filterValue, options, buttonSize = "normal" }) {
  //filterValue is URL key
  //options will be a list of possible filters
  //each will have label, value
  const [filterParams, setFilterParams] = useSearchParams();
  const currentFilter = filterParams.get(filterValue) || options[0].value;

  function handleClick(value) {
    filterParams.set(filterValue, value);
    setFilterParams(filterParams);
  }

  const maxIndex = options.length - 1;

  if (!options) return null;
  return (
    <div className="flex w-auto items-end justify-end rounded-sm">
      {options.map((o, index) => {
        const buttonClass = ` ${o.value === currentFilter ? "active" : ""} ${index === 0 ? "rounded-l-lg rounded-r-none" : index === maxIndex ? "rounded-r-lg rounded-l-none" : "rounded-none"}`;

        return (
          <Button
            size={buttonSize}
            onClick={() => handleClick(o.value)}
            key={o.value}
            disabled={o.value === currentFilter}
            className={buttonClass}
            color="filter-button"
            type="button"
          >
            {o.label}
          </Button>
        );
      })}
    </div>
  );
}

export default Filter;
