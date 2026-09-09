import { useContext, createContext, useState } from "react";

//if location is not /addevent then clear venueId from context
//wrap this context around entire protected route

const EventVenueContext = createContext();

function EventVenueProvider({ children }) {
  const [venueId, setVenueId] = useState("");

  //TODO: use state to set page name if needed and use an effect to clear the venueUrl when page name is not addvenue

  return (
    <EventVenueContext.Provider value={{ venueId, setVenueId }}>
      {children}
    </EventVenueContext.Provider>
  );
}

function useEventVenue() {
  const context = useContext(EventVenueContext);
  if (context === undefined) {
    throw new Error("Event Venue was used outside of EventVenueContext");
  }

  return context;
}

export { useEventVenue, EventVenueProvider };
