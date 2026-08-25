import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast"

import { getEventsCurrent } from "../../services/apiEvent"


export function useEvents() {
    const { data: events, isLoading } = useQuery({
        queryFn: getEventsCurrent,
        queryKey: ["events"],
        onError: (err) => toast.error(err.message),
    })

    return { events, isLoading }

}