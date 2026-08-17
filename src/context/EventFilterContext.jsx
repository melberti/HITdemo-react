import { useContext, createContext, useState } from "react";

const EventFilterContext = createContext();

function EventFilterProvider({children}) 
{
 
    const [filter, setFilter] = useState("");

    return <EventFilterContext.Provider value={{filter, setFilter}}>{children}</EventFilterContext.Provider>

}

function useEventFilter()
{
    const context = useContext(EventFilterContext)
    if(context === undefined)     
        throw new Error("Event Filter was used outside of EventFilterContext");

return context;

} 

export {useEventFilter, EventFilterProvider};
