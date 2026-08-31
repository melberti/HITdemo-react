import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router"
import { addVenue as addVenueApi } from "../../services/apiVenue";


export function useAddVenue() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { isLoading: isAdding, mutate: addVenue } = useMutation({
        mutationFn: ({ name, address1, city, state, zipCode, url, phone }) => addVenueApi({ name, address1, city, state, zipCode, url, phone }),
        mutationKey: ["venue"],
        onError: (err) => toast.error(err.message),
        onSuccess: () => {
            toast.success("Venue added");
            queryClient.invalidateQueries(["myVenues"])
            navigate("/dashboard");
        }
    })

    return { isAdding, addVenue }
}