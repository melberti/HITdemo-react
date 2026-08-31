import { getMyEvents } from "../../services/apiEvent";
import { useQuery } from "@tanstack/react-query";

export function useMyEvents() {
    const { data: events, isLoading } = useQuery({
        queryFn: getMyEvents,
        queryKey: ["myEvents"],
        // Keep data fresh for 10 minutes (no background refetches)
        staleTime: 10 * 60 * 1000,
        // Keep inactive data in memory for 10 minutes before deleting it
        //if user leaves page, cache will remain
        gcTime: 10 * 60 * 1000,
    })

    return { events, isLoading }
}