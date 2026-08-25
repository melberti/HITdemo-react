import { useState } from "react";

function SelectBox({
  options,
  onChange,
  keyName = "id",
  valueKeyName = "id",
  textKeyName = "value",
  isRequired = false,
  labelFor,
  isNumericValue = false,
  minNumericValue = 0,
  maxNumericValue = 1000,
  register,
}) {
  const defaultState = isNumericValue ? 0 : null;
  const [selectedVal, setSelectedVal] = useState(defaultState);

  function handleChange(e) {
    setSelectedVal(e.target.value);

    //then pass any handler prop
    onChange?.(e);
  }

  return (
    <select
      defaultValue={selectedVal}
      {...register(labelFor, {
        required: isRequired ? "Required" : false,
        validate: (value) => {
          if (isNumericValue) {
            // Regex checking if the value contains only digits (optional negative sign)
            if (value === "0") return "You must select a value";
          } else if (isRequired && value === "")
            return "You must select a value";
          return true; //if not numeric or numeric validation passed
        },
      })}
      onChange={(e) => handleChange(e)}
    >
      <option value={isNumericValue ? 0 : ""}>SELECT</option>
      {options.map((opt) => (
        <option value={opt[valueKeyName]} key={opt[keyName]}>
          {opt[textKeyName]}
        </option>
      ))}
    </select>
  );
}

export default SelectBox;
