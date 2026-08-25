
import { useQuery } from "@tanstack/react-query";
import { getStates } from "../../services/apiCityState";
import { toast } from "react-hot-toast"

export function useStates() {

    const { data: states, isLoading, isError, error } = useQuery({
        queryFn: getStates,
        queryKey: ["states"],
        onError: (err) => {
            console.log(err.message)
            toast.error(err.message);
            return null;
        }
    })

    return { states, isLoading, isError }
}