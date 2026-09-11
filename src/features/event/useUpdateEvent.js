import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast"
import { updateEvent as updateEventApi } from "../../services/apiEvent"
import { useEventVenue } from "../../context/EventVenueContext";

export function useUpdateEvent() {
    const queryClient = useQueryClient();
    const { setVenueId } = useEventVenue();

    const { mutate: updateEvent, isPending: isUpdating } = useMutation({
        mutationFn: (event) => updateEventApi(event),
        onSuccess: () => {
            queryClient.invalidateQueries(["myEvents"]);
            queryClient.invalidateQueries(["events"]);
            toast.success("Event updated");
            setVenueId("");
        },

    })

    return { updateEvent, isUpdating }
}