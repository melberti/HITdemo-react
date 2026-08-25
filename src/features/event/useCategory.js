import { getCategories } from "../../services/apiCategory"
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export function useCategory() {

    const { data: categories, isLoading } = useQuery({
        queryFn: getCategories,
        queryKey: ["categories"],
        onError: (err) => toast.error(err.message),
    })

    return { categories, isLoading }
}