import { useContext, createContext, useState } from "react";

//if location is not /addevent then clear imageId from context
//wrap this context around entire protected route

const EventImageContext = createContext();

function EventImageProvider({ children }) {
  const [imageUrl, setImageUrl] = useState("");

  //TODO: use state to set page name if needed and use an effect to clear the imageUrl when page name is not addimage

  return (
    <EventImageContext.Provider value={{ imageUrl, setImageUrl }}>
      {children}
    </EventImageContext.Provider>
  );
}

function useEventImage() {
  const context = useContext(EventImageContext);
  if (context === undefined) {
    throw new Error("Event Image was used outside of EventImageContext");
  }

  return context;
}

export { useEventImage, EventImageProvider };
