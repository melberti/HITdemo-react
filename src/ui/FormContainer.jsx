function FormContainer({ children }) {
  return (
    <div className="mx-auto grid w-fit grid-cols-[max-content_1fr] items-center justify-center">
      {children}
    </div>
  );
}

export default FormContainer;
