import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signUp as signUpApi } from "../../services/apiAuthentication";

export function useSignUp() {

    const { mutate: signUp, isLoading } = useMutation({

        mutationFn: ({ email, password, firstName, lastName }) => signUpApi({ email, password, firstName, lastName }),
        mutationKey: ["user"],
        onError: (err) => {
            toast.error(err.message);
            return null;
        },
    })

    return { signUp, isLoading }
}