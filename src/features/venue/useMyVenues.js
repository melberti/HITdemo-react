import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast"
import { getMyVenues } from "../../services/apiVenue";

export function useMyVenues() {
    const { data: venues, isLoading, isError, error } = useQuery({
        queryKey: ["myVenues"],
        queryFn: ({ sortCol, sortDir }) => getMyVenues({ sortCol, sortDir })
    })

    if (isError) {
        toast.error(error);
    }

    return { venues, isLoading }
}