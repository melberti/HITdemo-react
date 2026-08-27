import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImage as uploadImageApi } from "../../services/apiImage";
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router";


export function useUploadImage() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { isLoading: isUploading, mutate: uploadImage } = useMutation({
        mutationFn: (image) => uploadImageApi(image),
        onError: (err) => {
            console.log(err);

            toast.error(err.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["images"]);
            queryClient.invalidateQueries(["myImages"]);
            navigate("/dashboard")
        }

        // onMutate: (variables) => {
        //     //console.log("Data passed to mutationFn:", variables);

        // },
    })

    return { uploadImage, isUploading }
}