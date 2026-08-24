import InputDiv from "./InputDiv";

function ButtonRow({ children }) {
  return (
    <InputDiv>
      <div className="ml-2 flex flex-nowrap justify-items-start gap-3">
        {children}
      </div>
    </InputDiv>
  );
}

export default ButtonRow;
