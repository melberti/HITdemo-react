import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router"
import { updateVenue as updateVenueApi } from "../../services/apiVenue";
import { defaultDashboardUrl } from "../../utilities/utilities"


export function useUpdateVenue() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { isPending: isUpdating, mutate: updateVenue } = useMutation({
        mutationFn: ({ id, name, address1, city, state, zipCode, url, phone, isRetired }) => updateVenueApi({ id, name, address1, city, state, zipCode, url, phone, isRetired }),
        mutationKey: ["venue"],
        onError: (err) => toast.error(err.message),
        onSuccess: () => {
            toast.success("Venue updated");
            queryClient.invalidateQueries(["myVenues"])
            navigate(defaultDashboardUrl);
        }
    })

    return { isUpdating, updateVenue }
}