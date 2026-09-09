import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast"
import { addVenue as addVenueApi } from "../../services/apiVenue";


export function useAddVenue() {
    const queryClient = useQueryClient();

    const { isPending: isAdding, mutate: addVenue, newVenue } = useMutation({
        mutationFn: ({ name, address1, city, state, zipCode, url, phone }) => addVenueApi({ name, address1, city, state, zipCode, url, phone, isRetired: false }),
        mutationKey: ["venue"],
        onError: (err) => toast.error(err.message),
        onSuccess: (newVenue) => {
            toast.success("Venue added");

            queryClient.invalidateQueries({ queryKey: ["venues"] });
            queryClient.invalidateQueries({ queryKey: ["myVenues"] });

        },

    })

    return { isAdding, addVenue, newVenue }
}