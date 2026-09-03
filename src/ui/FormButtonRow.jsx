import InputDiv from "./InputDiv";

function FormButtonRow({ children }) {
  return (
    <InputDiv>
      <div className="ml-2 flex flex-nowrap justify-items-start gap-3">
        {children}
      </div>
    </InputDiv>
  );
}

export default FormButtonRow;
