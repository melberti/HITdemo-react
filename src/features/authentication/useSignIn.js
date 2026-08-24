import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast"
import { signIn as signInApi } from "../../services/apiAuthentication";

export function useSignIn() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: signIn, isLoading } = useMutation({
        mutationFn: ({ email, password }) => signInApi({ email, password }),
        mutationKey: ["user"],
        onError: (err) => {
            {
                toast.error(err.message)
                return null;
            }
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data.user);
            navigate("/dashboard", { replace: true });
        }
    })

    return { signIn, isLoading }
}