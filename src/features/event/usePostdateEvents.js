import { postDateEvents as postDateEventsApi } from "../../services/apiEvent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast"

export function usePostdateEvents() {

    const queryClient = useQueryClient();

    const { isLoading: isUpdating, mutate: postDateEvents } = useMutation({
        mutationFn: postDateEventsApi,
        onSuccess: () => {
            queryClient.invalidateQueries(["events"]);
            queryClient.invalidateQueries(["myEvents"]);
            toast.success("Event dates updated. If you still do not see events, run once more.", {
                duration: 6000,
            })
        },

    })


    return { postDateEvents, isUpdating }
}