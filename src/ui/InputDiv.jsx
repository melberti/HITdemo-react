import FormError from "./FormError";

function InputDiv({ label, labelFor, error, required = false, children }) {
  if (labelFor === "eventStartTime" || labelFor === "eventEndTime") {
    console.log(error);
  }

  return (
    <div className="inputDiv align-top">
      <label htmlFor={labelFor} className={required ? "required" : ""}>
        {label}
      </label>
      <div className="flex flex-col align-top">
        {children}
        {error !== undefined && <FormError message={error} />}
      </div>
    </div>
  );
}

export default InputDiv;
