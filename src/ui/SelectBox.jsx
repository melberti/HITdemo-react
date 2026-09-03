import { useEffect, useState } from "react";

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
  width,
  icon,
  customValidation,
  defaultValue,
  hideEmpty = false,
}) {
  const defaultState = isNumericValue ? 0 : null;
  const [selectedVal, setSelectedVal] = useState(defaultState);

  //if a default value was passed (as on edit), set into state
  const selected = defaultValue ? defaultValue : selectedVal;

  //for select box width
  const widthStyle = width === null ? undefined : { width: `${width}px` };
  //no right spacing if an icon has been provided
  const marginStyle = icon ? "mr-0" : undefined;

  function handleChange(e) {
    setSelectedVal(e.target.value);

    //then pass any handler prop
    onChange?.(e);
  }

  return (
    <>
      <select
        defaultValue={selected}
        className={marginStyle}
        style={widthStyle}
        {...register(labelFor, {
          required: isRequired ? "Required" : false,
          validate: (value) => {
            if (isNumericValue) {
              // Regex checking if the value contains only digits (optional negative sign)
              if (value === "0") return "You must select a value";
            } else if (isRequired && value === "")
              return "You must select a value";
            else return customValidation?.() || true;
            //return true; //if not numeric or numeric validation passed
          },
        })}
        onChange={(e) => handleChange(e)}
      >
        {!hideEmpty && <option value={isNumericValue ? 0 : ""}>SELECT</option>}

        {options.map((opt) => (
          <option value={opt[valueKeyName]} key={opt[keyName]}>
            {opt[textKeyName]}
          </option>
        ))}
      </select>
      <span className="mt-2">{icon}</span>
    </>
  );
}

export default SelectBox;
