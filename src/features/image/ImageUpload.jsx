import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState, useRef } from "react";
import { HiOutlinePhoto } from "react-icons/hi2";

import { useEventImage } from "../../context/EventImageContext";
import { useUploadImage } from "./useUploadImage";
import { eventImageBaseUrl } from "../../services/supabase";
import { defaultDashboardUrl } from "../../utilities/utilities";

import SubmitButton from "../../ui/SubmitButton";
import Button from "../../ui/Button";
import FormError from "../../ui/FormError";
import SpinnerFullPage from "../../ui/SpinnerFullPage";

const ALLOWED_TYPES = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

function ImageUpload({ onCloseModal }) {
  const { register, reset, formState, handleSubmit } = useForm();
  const { errors } = formState;
  const { uploadImage, isUploading } = useUploadImage();
  const [filename, setFilename] = useState("");
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const isModal = Boolean(onCloseModal);

  const { setImageUrl } = useEventImage();

  //return to dashboard when NOT in a modal
  function close() {
    navigate(defaultDashboardUrl);
  }

  //register the validation for the image input
  const imageRegistration = register("image", {
    required: true,
    validate: {
      acceptedFormats: (files) => {
        // Ensure a file exists before checking its MIME type
        if (!files || files?.length === 0) return true;

        const fileType = files[0]?.type;
        return (
          ALLOWED_TYPES.includes(fileType) ||
          "Only JPEG, PNG, and GIF files are allowed"
        );
      },
    },
  });

  //set filename when image is selected
  function handleChange(e) {
    if (fileInputRef.current && fileInputRef.current.files?.length === 0) {
      setFilename("");
    } else {
      setFilename(e.target?.files[0]?.name);
    }
  }

  //clear filename if form submission is not valid (bad file format)
  function invalidateSubmit() {
    setFilename("");
  }

  //submit the form
  function submitFunc(data) {
    if (!errors.length) {
      const image = data?.image[0]; //get the file
      if (image) {
        uploadImage(
          { image },
          {
            onSuccess: (data) => {
              setImageUrl(`${eventImageBaseUrl}${data.path}`);

              if (isModal) onCloseModal?.();
              else {
                //dump the image name so we aren't hanging onto it when we should not be
                setImageUrl("");
                close();
              }
            },
          },
        );
      }
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

  function submitImageForm(e) {
    e.stopPropagation();
    handleSubmit(submitFunc, invalidateSubmit)(e);
  }

  if (isUploading) return <SpinnerFullPage />;
  return (
    <form onSubmit={submitImageForm}>
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

              onChange={(e) => {
                imageRegistration.onChange(e);
                handleChange(e);
              }}
            />
            <FormError message={errors?.image?.message} />
          </div>
        )}
        {filename && (
          <div className="flex flex-row">Selected image: {filename}</div>
        )}

        <div className="flex flex-row gap-2">
          {filename && (
            <>
              <SubmitButton disabled={isUploading}>Upload file</SubmitButton>

              <Button
                disabled={isUploading}
                onClick={() => resetForm()}
                color="neutral"
              >
                Choose new file
              </Button>
            </>
          )}
          {!isModal && (
            <Button
              color="neutral"
              disabled={isUploading}
              onClick={() => close()}
              type="button"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}

export default ImageUpload;
