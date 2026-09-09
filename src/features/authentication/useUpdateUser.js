import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuthentication";
import { toast } from "react-hot-toast"

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isPending: isUpdating, error } = useMutation({
        mutationFn: ({ firstName, lastName, email }) => updateUserApi({ firstName, lastName, email }),
        mutationKey: ["user"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("Profile updated");
        },
        onError: (err) => { toast.error(err.message) },
        //onMutate: (vars) => console.log(vars)
    })

    return { updateUser, isUpdating, error }
}