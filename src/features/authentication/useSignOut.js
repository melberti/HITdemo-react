import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { signOut as signOutApi } from "../../services/apiAuthentication";

export function useSignOut() {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: signOut, isPending } = useMutation({

        mutationFn: signOutApi,
        mutationKey: ["user"],
        onError: (err) => {
            toast.error(err.message);
            return null;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["user"]);

            navigate("/", { replace: true });
        }
    })

    return { signOut, isPending }
}