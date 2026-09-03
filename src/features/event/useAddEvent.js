import { toast } from "react-hot-toast"
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addEvent as addEventApi } from "../../services/apiEvent"
import { defaultDashboardUrl } from "../../utilities/utilities"

export function useAddEvent() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: addEvent, isPending: isAdding } = useMutation({
        mutationFn: ({
            title,
            description,
            eventDate,
            eventStartTime,
            eventEndTime,
            imageUrl,
            categoryId,
            venueId,
            eventUrl,
            cost,
        }) => addEventApi({
            title,
            description,
            eventDate,
            eventStartTime,
            eventEndTime,
            imageUrl,
            categoryId,
            venueId,
            eventUrl,
            cost,
        }),
        onError: (err) => {
            toast.error(err.message);
        },
        onSuccess: () => {
            toast.success("Event added");
            queryClient.invalidateQueries(["myEvents"])
            queryClient.invalidateQueries(["events"])
            navigate(defaultDashboardUrl)
        }

    })

    return { addEvent, isAdding }
}