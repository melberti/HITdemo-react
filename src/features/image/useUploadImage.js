import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImage as uploadImageApi } from "../../services/apiImage";
import { toast } from "react-hot-toast"

export function useUploadImage() {
    const queryClient = useQueryClient();

    const { isPending: isUploading, mutate: uploadImage } = useMutation({
        mutationFn: ({ image }) => uploadImageApi({ image })
        ,
        onError: (err) => {
            console.log(err);

            toast.error(err.message)
        },

        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["myImages"] }),

    })

    return { uploadImage, isUploading }
}