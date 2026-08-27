import { useQuery } from "@tanstack/react-query";
import { getImages } from "../../services/apiImage";

export function useImages() {
    const { data: images, isLoading } = useQuery({
        queryFn: ({ signal }) => getImages({ signal }),
        queryKey: "[images]"
    })

    return { images, isLoading }
}