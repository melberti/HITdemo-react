import InputDiv from "./InputDiv";

function ButtonRow({ children }) {
  return (
    <div className="inputDiv flex flex-nowrap justify-center gap-3">
      {children}
    </div>
  );
}

export default ButtonRow;
