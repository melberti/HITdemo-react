import { useContext, createContext, useState } from "react";

const EventFilterContext = createContext();

function EventFilterProvider({ children }) {
  const [eventFilter, setEventFilter] = useState("");

  return (
    <EventFilterContext.Provider value={{ eventFilter, setEventFilter }}>
      {children}
    </EventFilterContext.Provider>
  );
}

function useEventFilter() {
  const context = useContext(EventFilterContext);
  if (context === undefined)
    throw new Error("Event Filter was used outside of EventFilterContext");

  return context;
}

export { useEventFilter, EventFilterProvider };
