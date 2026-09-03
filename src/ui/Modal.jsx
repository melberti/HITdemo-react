import {
  useContext,
  createContext,
  useState,
  cloneElement,
  useEffect,
} from "react";
import { createPortal } from "react-dom";

import useOutsideClick from "../hooks/useOutsideClick";
import Button from "./Button";
import Overlay from "./Overlay";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";

const ModalContext = createContext();
const openModalStack = [];

function useEscapeToClose(isOpen, close) {
  useEffect(() => {
    if (!isOpen) return;

    const modal = { close };
    openModalStack.push(modal);

    function handleKeyDown(event) {
      if (event.key === "Escape" && openModalStack.at(-1) === modal) {
        event.stopPropagation();
        close();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      const index = openModalStack.indexOf(modal);
      if (index !== -1) openModalStack.splice(index, 1);
    };
  }, [isOpen, close]);
}

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

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ opens: opensWindowName, className, children }) {
  //the function that opens the window
  const { open } = useContext(ModalContext);

  //clone the button passed in as children, and add properties to it
  return cloneElement(children, {
    ...(className !== undefined ? { className } : {}),
    onClick: () => {
      open(opensWindowName);
    },
  });
}

function Window({ name, children }) {
  const { openName, close } = useContext(ModalContext);

  useLockBodyScroll(name === openName);
  useEscapeToClose(name === openName, close);

  //because we need to reference the same "ref" object
  //both inside the click hook and in the JSX below
  //return it from the useClick hook
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  //need some styles for the div; see styledModal in wild oasis

  return createPortal(
    <Overlay>
      <div ref={ref} className="modal">
        <Button onClick={close} type="button" color="neutral" size="small">
          Close
        </Button>
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
