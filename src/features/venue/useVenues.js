import { useQuery } from "@tanstack/react-query";

import { getVenues as getVenuesApi } from "../../services/apiVenue";

export function useVenues() {
    const { data: venues, isLoading, error } = useQuery({
        queryFn: getVenuesApi(),
        queryKey: ["venues"]
    })

    if (error) throw new Error(error);

    return { venues, isLoading }
}