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
  register,
  width,
  icon,
  customValidation,
  defaultValue,
  hideEmpty = false,
}) {
  const defaultState = isNumericValue ? 0 : "";
  const [selectedVal, setSelectedVal] = useState(defaultState);

  //if a default value was passed (as on edit), set into state
  const selected = defaultValue ? defaultValue : selectedVal.toString();

  //for select box width
  const widthStyle = width === null ? undefined : { width: `${width}px` };
  //no right spacing if an icon has been provided
  const marginStyle = icon ? "mr-0" : undefined;

  function handleChange(e) {
    setSelectedVal(e.target.value);

    //then pass any handler prop
    onChange?.(e);
  }

  const registration = register(labelFor, {
    required: isRequired ? "Required" : false,
    validate: (value) => {
      if (isNumericValue) {
        if (parseInt(value, 10) === 0) return "You must select a value";
      } else if (isRequired && value === "") return "You must select a value";
      else return customValidation?.() || true;
    },
  });

  return (
    <>
      <select
        id={labelFor}
        className={marginStyle}
        style={widthStyle}
        value={selected}
        // defaultValue={selected}
        {...registration}
        onChange={(e) => {
          registration.onChange(e);
          handleChange(e);
        }}
      >
        {!hideEmpty && (
          <option value={isNumericValue ? "0" : ""}>SELECT</option>
        )}

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
