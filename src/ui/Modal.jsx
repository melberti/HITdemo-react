import { useContext, createContext, useState, cloneElement } from "react";
import { createPortal } from "react-dom";

import useOutsideClick from "../hooks/useOutsideClick";
import Button from "./Button";
import Overlay from "./Overlay";

const ModalContext = createContext();

//Modal is a context, as well as a compound component
function Modal({ children }) {
  //which window is currently open?
  const [openName, setOpenName] = useState("");

  //handler functions
  const close = () => setOpenName("");
  const open = setOpenName;
  // calling open will do the same as calling setOpenName

  //an object definition cannot be passed as context value, so define as var
  const contextValue = { openName, open, close };
  //console.log("modal open window=" + openName);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ opens: opensWindowName, children }) {
  //the function that opens the window
  const { open } = useContext(ModalContext);

  //clone the button passed in as children, and add properties to it
  return cloneElement(children, {
    onClick: () => {
      open(opensWindowName);
    },
  });
}

function Window({ name, children }) {
  //console.log("modal.window name " + name);

  const { openName, close } = useContext(ModalContext);

  //because we need to reference the same "ref" object
  //both inside the click hook and in the JSX below
  //return it from the useClick hook
  const ref = useOutsideClick(close);

  // console.log(`name: ${name} openName: ${openName}`);
  if (name !== openName) return null;

  //need some styles for the div; see styledModal in wild oasis

  return createPortal(
    <Overlay>
      <div ref={ref} className="modal">
        <Button onClick={close}>Close</Button>
        <div className="mt-5">
          {cloneElement(children, { onCloseModal: close })}
        </div>
      </div>
    </Overlay>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
