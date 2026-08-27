import { useQuery } from "@tanstack/react-query";
import { getMyImages } from "../../services/apiImage";

export function useMyImages() {
    const { data: myImages, isLoading: isLoadingMy } = useQuery({
        queryFn: ({ signal }) => getMyImages({ signal }),
        queryKey: ["myImages"]
    })

    return { myImages, isLoadingMy }
}