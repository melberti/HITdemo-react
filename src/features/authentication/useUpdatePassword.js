import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast"
import { updatePassword as updatePasswordApi } from "../../services/apiAuthentication";

export function useUpdatePassword() {
    const { mutate: updatePassword, isPending: isUpdating } = useMutation({
        mutationFn: ({ currentPassword, newPassword }) => updatePasswordApi({ currentPassword, newPassword }),
        mutationKey: ["user"],
        onSuccess: () => toast.success("Password updated"),
        onError: (err) => toast.error(err.message),
    })

    return { updatePassword, isUpdating }
}