function FormError({ message }) {
  if (!message) return null;
  return <div className="col-start-2 mt-0 ml-3 text-red-700">{message}</div>;
}

export default FormError;
