import FormError from "./FormError";

function InputDiv({ label, labelFor, children, error }) {
  return (
    <div className="inputDiv">
      <label htmlFor={labelFor}>{label}</label>
      <div className="flex flex-col">
        {children}
        {error && <FormError message={error} />}
      </div>
    </div>
  );
}

export default InputDiv;
