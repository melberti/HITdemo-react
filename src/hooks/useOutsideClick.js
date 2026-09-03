import { useEffect, useRef } from "react";

export default function useOutsideClick(handler, listenOnCapture = true) {
    const ref = useRef(); //reference to a component/element

    //any time the handler or listenOnCapture props change (modal change)
    //this effect will fire, which:
    //   registers a handleClick function which, if the click is executed outside of the modal window, will execute the handler
    //and
    //   adds an event listener for that click
    useEffect(
        function () {
            function handleClick(e) {
                //nested modal should not close all modals, only self
                if (e.target.closest(".modal")) return;

                if (ref.current) {
                    if (!ref.current.contains(e.target)) {
                        handler();
                    }
                }
            }

            document.addEventListener("click", handleClick, listenOnCapture);

            //clean up
            //remove listener as component un-mounts
            //by returning callback function
            return () =>
                document.removeEventListener("click", handleClick, listenOnCapture);
        },
        [handler, listenOnCapture],
    );
    return ref;
}
