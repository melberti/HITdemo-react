import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast"
import { getCityByZip } from "../../services/apiCityState";

export function useCityByZip() {
    const { data: city, isLoading } = useQuery({
        queryFn: (zip) => getCityByZip(zip),
        queryKey: ["city"],
        onError: (err) => {
            toast.error(err.message);
            return;
        }
    })

    return { city, isLoading }

}