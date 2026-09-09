import { useContext, createContext, useState } from "react";

const VenueFilterContext = createContext();

function VenueFilterProvider({ children }) {
  const [venueFilter, setVenueFilter] = useState("");

  return (
    <VenueFilterContext.Provider value={{ venueFilter, setVenueFilter }}>
      {children}
    </VenueFilterContext.Provider>
  );
}

function useVenueFilter() {
  const context = useContext(VenueFilterContext);
  if (context === undefined)
    throw new Error("Venue Filter was used outside of VenueFilterContext");

  return context;
}

export { useVenueFilter, VenueFilterProvider };
