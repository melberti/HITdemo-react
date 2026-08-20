import { useQuery } from "@tanstack/react-query"
import { getUser } from "../../services/apiAuthentication"

export function useUser() {

    const { data: user, isLoading } = useQuery({
        queryFn: getUser,
        queryKey: ["user"],
    })

    return { user, isLoading }
}