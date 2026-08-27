import { useForm } from "react-hook-form";
import { useUploadImage } from "./useUploadImage";
import { useState, useRef } from "react";
import { HiOutlinePhoto } from "react-icons/hi2";
import SubmitButton from "../../ui/SubmitButton";
import Button from "../../ui/Button";
import FormError from "../../ui/FormError";

const ALLOWED_TYPES = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

function ImageUpload() {
  const { register, reset, formState, handleSubmit } = useForm();
  const { errors } = formState;
  const { uploadImage, isUploading } = useUploadImage();
  const [filename, setFilename] = useState("");
  const fileInputRef = useRef(null);

  //register the validation for the image input
  const imageRegistration = register("image", {
    required: true,
    validate: {
      acceptedFormats: (files) => {
        // Ensure a file exists before checking its MIME type
        if (!files || files.length === 0) return true;

        const fileType = files[0]?.type;
        //console.log("filetype", fileType);
        return (
          ALLOWED_TYPES.includes(fileType) ||
          "Only JPEG, PNG, and GIF files are allowed"
        );
      },
    },
  });

  //set filename when image is selected
  function handleChange(e) {
    if (fileInputRef.current && fileInputRef.current.files.length === 0) {
      setFilename("");
    } else {
      setFilename(e.target.files[0].name);
    }
  }

  //clear filename if form submission is not valid (bad file format)
  function invalidateSubmit() {
    setFilename("");
  }

  //submit the form
  function submitFunc(data) {
    if (!errors.length) {
      const img = data.image[0]; //get the file

      uploadImage({ img });
    } else {
      setFilename("");
      return errors;
    }
  }

  //clear the form input and the state
  function resetForm() {
    setFilename("");
    reset();
  }

  return (
    <form onSubmit={handleSubmit(submitFunc, invalidateSubmit)}>
      <div className="inputDiv grid grid-cols-1 items-center justify-items-center align-top">
        <h3 className="mb-0 text-center">
          Select an image for upload.
          <br />
          For best results, image should by 4x5 proportionally
          <br />
          and should be landscape-oriented.{" "}
          <HiOutlinePhoto className="mb-1 inline self-baseline text-2xl" />
          <br />
          <span className="text-base font-normal text-neutral-500">
            (.jpg, .jpeg, .gif, .png)
          </span>
        </h3>
        {/* <div>hi mel</div> */}

        {!filename && (
          <div className="align-top">
            <input
              type="file"
              id="image"
              accept="image/*"
              disabled={isUploading}
              {...imageRegistration}
              // ref={(element) => {
              //   imageRegistration.ref(element);
              //   fileInputRef.current = element;
              // }}
              onChange={(e) => {
                imageRegistration.onChange(e);
                handleChange(e);
              }}
            />
            <FormError message={errors?.image?.message} />
          </div>
        )}
        {filename && (
          <>
            <div className="flex flex-row">Selected image: {filename}</div>
            <div className="flex flex-row gap-2">
              <SubmitButton disabled={isUploading}>Upload Image</SubmitButton>
              <Button
                disabled={isUploading}
                onClick={resetForm}
                color="neutral"
              >
                Choose new file
              </Button>
              {/* <ResetButton disabled={isUploading} onClick={resetForm} /> */}
            </div>
          </>
        )}
      </div>
    </form>
  );
}

export default ImageUpload;
