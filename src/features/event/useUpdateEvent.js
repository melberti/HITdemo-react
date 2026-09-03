import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast"
import { updateEvent as updateEventApi } from "../../services/apiEvent"

export function useUpdateEvent() {
    const queryClient = useQueryClient();

    const { mutate: updateEvent, isPending: isUpdating } = useMutation({
        mutationFn: (event) => updateEventApi(event),
        onSuccess: () => {
            queryClient.invalidateQueries(["myEvents"]);
            queryClient.invalidateQueries(["events"]);
            toast.success("Event updated");
        },
        // onMutate: (variables) => {
        //     console.log('mutating, vars=', variables)
        // }
    })

    return { updateEvent, isUpdating }
}