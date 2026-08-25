import { toast } from "react-hot-toast"
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query"
import { addEvent as addEventApi } from "../../services/apiEvent"

export function useAddEvent() {

    const navigate = useNavigate();

    const { mutate: addEvent, isLoading: isAdding } = useMutation({
        mutationFn: ({
            title,
            description,
            eventDate,
            eventStartTime,
            eventEndTime,
            image,
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
            image,
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
            navigate("/")
        }
    })

    return { addEvent, isAdding }
}