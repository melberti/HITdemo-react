import { useSearchParams } from "react-router";
import { getMyEvents } from "../../services/apiEvent";
import { useQuery } from "@tanstack/react-query";
import { getTodayAsISO } from "../../utilities/dateTimeFormats"

export function useMyEvents() {

    const [searchParams] = useSearchParams();
    const today = getTodayAsISO();

    //filters
    const dateFilterValue = searchParams.get("eventDate");

    if (!dateFilterValue) {
        searchParams.set("eventDate", "current")
    }

    const dateFilters = dateFilterValue ? (dateFilterValue === "past"
        ? [{ field: "eventDate", value: today, method: "lt" }]
        : [{ field: "eventDate", value: today, method: "gte" }]) : [{}];



    //careful... because we defined filter here, the callback arg cannot be included
    const { data: events, isLoading } = useQuery({
        queryFn: () => getMyEvents(dateFilters),
        queryKey: ["myEvents", dateFilterValue],        // Keep data fresh for 10 minutes (no background refetches)
        staleTime: 10 * 60 * 1000,
        // Keep inactive data in memory for 10 minutes before deleting it
        //if user leaves page, cache will remain
        gcTime: 10 * 60 * 1000,
    })

    return { events, isLoading }
}