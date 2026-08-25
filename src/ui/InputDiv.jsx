import FormError from "./FormError";

function InputDiv({ label, labelFor, error, required = false, children }) {
  return (
    <div className="inputDiv">
      <label htmlFor={labelFor} className={required ? "required" : ""}>
        {label}
      </label>
      <div className="flex flex-col">
        {children}
        {error !== undefined && <FormError message={error} />}
      </div>
    </div>
  );
}

export default InputDiv;
