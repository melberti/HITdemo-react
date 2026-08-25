import { getMyEvents } from "../../services/apiEvent";
import { useQuery } from "@tanstack/react-query";

export function useMyEvents() {
    const { data: events, isLoading } = useQuery({
        queryFn: getMyEvents,
        queryKey: ["myEvents"]
    })

    return { events, isLoading }
}