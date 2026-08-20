import { useState } from "react";

function SelectBox({ title, options, onChange }) {
  const [selectedVal, setSelectedVal] = useState(0);

  function handleChange(e) {
    setSelectedVal(e.value);

    //then pass any handler prop
    onChange?.();
  }

  return (
    <select onChange={(e) => handleChange(e)} defaultValue={selectedVal}>
      <option value={0}>{title?.toUpperCase()}</option>
      {options.map((opt) => (
        <option value={opt.id} key={opt.id}>
          {opt.value}
        </option>
      ))}
    </select>
  );
}

export default SelectBox;
