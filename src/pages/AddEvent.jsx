import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { FaRegClock } from "react-icons/fa";

import {
  defaultImageUrl,
  urlValidationRegex,
  getTimeOptions,
  getStatusOptions,
  getDateForCompare,
  defaultDashboardUrl,
} from "../utilities/utilities";

import { useEventImage } from "../context/EventImageContext";
import { useCategory } from "../features/event/useCategory";
import { useAddEvent } from "../features/event/useAddEvent";
import { useUpdateEvent } from "../features/event/useUpdateEvent";
import { useMyVenues } from "../features/venue/useMyVenues";
import FormContainer from "../ui/FormContainer";
import InputDiv from "../ui/InputDiv";
import Button from "../ui/Button";
import SubmitButton from "../ui/SubmitButton";
import ResetButton from "../ui/ResetButton";
import FormButtonRow from "../ui/FormButtonRow";
import SelectBox from "../ui/SelectBox";
import Spinner from "../ui/Spinner";
import Modal from "../ui/Modal";
import ImageUpload from "../features/image/ImageUpload";
import ImageSelect from "../features/image/ImageSelect";
import { useEffect } from "react";

function AddEvent({ event, onCloseModal }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setError,
    setValue,
    formState,
  } = useForm();
  const { errors } = formState;

  const { categories, isLoading: isLoadingCategories } = useCategory();
  const { venues, isLoading: isLoadingVenues } = useMyVenues();
  const { addEvent, isAdding } = useAddEvent();
  const { updateEvent, isUpdating } = useUpdateEvent();
  const { imageUrl, setImageUrl } = useEventImage();

  const timeOptions = getTimeOptions();
  const statusOptions = getStatusOptions();

  const disabled =
    isLoadingCategories || isLoadingVenues || isAdding || isUpdating;

  //if editing (if we have an event)
  //set imageUrl to the event's image
  useEffect(
    function () {
      if (event?.imageUrl) {
        setImageUrl(event.imageUrl);
      }
    },
    [event?.imageUrl, setImageUrl],
  );

  //if new imageUrl selected, update the form with it
  useEffect(
    function () {
      setValue("imageUrl", imageUrl, { shouldDirty: false });
    },
    [imageUrl, setValue],
  );

  //for validating event Date
  const today = getDateForCompare(new Date());

  function close() {
    onCloseModal?.();
    navigate(defaultDashboardUrl);
  }

  function submitFunc(data) {
    const {
      id,
      title,
      description,
      eventDate,
      eventStartTime,
      eventEndTime,
      imageUrl,
      categoryId,
      venueId,
      eventUrl,
      cost,
      status,
    } = data;

    if (!errors.length) {
      if (id) {
        //edit event
        const isPostponed = status === "Postponed";
        const isCancelled = status === "Cancelled;";

        updateEvent(
          {
            id,
            title,
            description,
            eventDate,
            eventStartTime,
            eventEndTime,
            imageUrl,
            categoryId,
            venueId,
            eventUrl,
            cost,
            isPostponed,
            isCancelled,
          },
          { onSuccess: close },
        );
      } else
        addEvent({
          title,
          description,
          eventDate,
          eventStartTime,
          eventEndTime,
          imageUrl,
          categoryId,
          venueId,
          eventUrl,
          cost,
        });
    } else {
      return errors;
    }
  }

  function selectImageClick(e) {
    e.preventDefault();
    setImageUrl("");
  }

  //CUSTOM VALIDATIONS AND ERROR MESSAGES
  function validateDate(value) {
    const selectedDate = getDateForCompare(value);

    return (
      selectedDate >= today || "Date must be today or later logAndCheckValue"
    );
  }

  //passed into custom registration method for eventEndTime
  function validateEndTime() {
    const startTime = getValues("eventStartTime");
    const endTime = getValues("eventEndTime");
    if (!startTime) return true; // Skip validation if start time isn't set yet

    // Direct string comparison works for standard HTML time inputs ("HH:MM")
    return endTime > startTime || "End time must be after start time";
  }

  const timeError = getTimeError();
  //check messages returned by validation for start and end time
  //they share a single error output
  function getTimeError() {
    if (
      errors?.eventEndTime?.message &&
      errors?.eventEndTime?.message != "Required"
    )
      return errors?.eventEndTime?.message;

    if (
      errors?.eventStartTime?.message !== undefined ||
      errors?.eventEndTime?.message !== undefined
    )
      return "Both start and end time are required";

    return "";
  }

  const selectedStatus = event?.isCancelled
    ? "Cancelled"
    : event?.isPostponed
      ? "Postponed"
      : "Active";

  if (isLoadingCategories || isLoadingVenues) return <Spinner />;

  return (
    <>
      <h2 className="mb-5 text-center">
        {event?.id ? "Edit" : event ? "Clone" : "Add"} Event
      </h2>
      <form onSubmit={handleSubmit(submitFunc)}>
        <FormContainer>
          {event && (
            <input type="hidden" id="id" value={event.id} {...register("id")} />
          )}

          {(event?.isCancelled || event?.isPostponed) && (
            <InputDiv
              label="Status"
              labelFor="status"
              error={errors?.status?.message}
              required={true}
            >
              <SelectBox
                id="status"
                defaultValue={selectedStatus}
                register={register}
                disabled={disabled}
                options={statusOptions}
                keyName="text"
                valueKeyName="text"
                textKeyName="text"
                isRequired={true}
                labelFor="status"
                isNumericValue={false}
                hideEmpty={true}
              ></SelectBox>
            </InputDiv>
          )}

          <InputDiv
            label="Event Title"
            labelFor="title"
            error={errors?.title?.message}
            required={true}
          >
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={event?.title}
              {...register("title", { required: "Required" })}
              disabled={disabled}
            />
          </InputDiv>
          <InputDiv
            label="Description"
            labelFor="description"
            error={errors?.description?.message}
            required={true}
          >
            <textarea
              rows={5}
              columns={100}
              id="description"
              defaultValue={event?.description}
              {...register("description", {
                required: "Required",
              })}
              disabled={disabled}
            />
          </InputDiv>

          <InputDiv
            label="Category"
            labelFor="categoryId"
            error={errors?.categoryId?.message}
            required={true}
          >
            <SelectBox
              options={categories}
              keyName="id"
              valueKeyName="id"
              textKeyName="value"
              isRequired={true}
              labelFor="categoryId"
              isNumericValue={true}
              register={register}
              disabled={disabled}
              defaultValue={event?.category?.id}
            />
          </InputDiv>

          <InputDiv
            label="Venue"
            labelFor="venueId"
            error={errors?.venueId?.message}
            required={true}
          >
            <SelectBox
              options={venues}
              keyName="id"
              valueKeyName="id"
              textKeyName="name"
              isRequired={true}
              labelFor="venueId"
              isNumericValue={true}
              register={register}
              disabled={disabled}
              defaultValue={event?.venue?.id}
            />
          </InputDiv>

          <InputDiv
            label="Event Date"
            labelFor="eventDate"
            error={errors?.eventDate?.message}
            required={true}
          >
            <input
              type="date"
              id="eventDate"
              className="datetime"
              {...register("eventDate", {
                required: "Required",
                validate: (value) => validateDate(value),
              })}
              disabled={disabled}
              defaultValue={event?.eventDate}
            />
          </InputDiv>
          <InputDiv
            className="ml-2 flex flex-nowrap justify-items-start gap-3"
            label="Start and End Time"
            labelFor="eventStartTime"
            required={true}
            error={timeError}
          >
            <span className="ml-0 flex flex-nowrap justify-items-start gap-1">
              <SelectBox
                options={timeOptions}
                keyName="id"
                valueKeyName="id"
                textKeyName="text"
                isRequired={true}
                labelFor="eventStartTime"
                isNumericValue={false}
                register={register}
                disabled={disabled}
                width="125"
                icon={<FaRegClock />}
                defaultValue={event?.eventStartTime}
              />
              {/* <input
                type="time"
                id="x"
                className="datetime"

                disabled={disabled}
              /> */}
              <span className="ml-3 pt-1">to</span>
              <SelectBox
                options={timeOptions}
                keyName="id"
                valueKeyName="id"
                textKeyName="text"
                isRequired={true}
                labelFor="eventEndTime"
                isNumericValue={false}
                register={register}
                disabled={isAdding}
                width="125"
                icon={<FaRegClock />}
                customValidation={validateEndTime}
                defaultValue={event?.eventEndTime}
              />
              {/* <input
                type="time"
                id="eventEndTime"
                className="datetime"
                {...register("eventEndTime", {
                  required: "Both start and end times are required",
                })}
                disabled={isAdding}
              /> */}
            </span>
          </InputDiv>

          <InputDiv
            label="Event URL"
            labelFor="eventUrl"
            error={errors?.eventUrl?.message}
          >
            <input
              type="text"
              id="eventUrl"
              disabled={isAdding}
              {...register("eventUrl", {
                required: false,
                pattern: {
                  value: urlValidationRegex,
                  message: "Invalid URL",
                },
              })}
              defaultValue={event?.eventUrl}
            />
          </InputDiv>
          <InputDiv
            label="Event Cost"
            labelFor="cost"
            error={errors?.cost?.message}
            required={true}
          >
            <input
              type="text"
              id="cost"
              placeholder="Enter 0 for FREE"
              disabled={isAdding}
              defaultValue={event?.cost || 0}
              {...register("cost", {
                required: "Required",
                valueAsNumber: true,
                validate: (value) =>
                  !isNaN(value) || "Please enter a valid number",
                min: { value: 0, message: "Cost cannot be negative" },
                max: {
                  value: 1000,
                  message: "Cost cannot be more than 1000",
                },
              })}
            />
          </InputDiv>

          <InputDiv
            label="Image"
            labelFor="imageUrl"
            error={errors?.image?.message}
            required={false}
          >
            <input
              type="hidden"
              id="imageUrl"
              value={imageUrl}
              {...register("imageUrl", {
                required: false,
              })}
            ></input>
            <div className="ml-2 flex flex-nowrap justify-items-start gap-1">
              {imageUrl ? (
                <>
                  <img
                    src={imageUrl}
                    width="120"
                    alt={`${imageUrl} selected`}
                    title={imageUrl}
                    className="block"
                  />
                  <Button
                    color="neutral"
                    size="small"
                    onClick={() => setImageUrl("")}
                  >
                    Remove Selection
                  </Button>
                </>
              ) : (
                <img
                  src={defaultImageUrl}
                  width="120"
                  alt={`${defaultImageUrl} selected`}
                  title={defaultImageUrl}
                  className="block"
                />
              )}
              {!imageUrl && (
                <Modal>
                  <div className="grid grid-cols-1">
                    <Modal.Open opens="select">
                      <Button
                        color="secondary"
                        size="small"
                        type="button"
                        onClick={(e) => selectImageClick(e)}
                      >
                        Select an image
                      </Button>
                    </Modal.Open>
                    <Modal.Open opens="upload">
                      <Button color="secondary" size="small" type="button">
                        Upload an image
                      </Button>
                    </Modal.Open>
                  </div>
                  <Modal.Window name="select">
                    <ImageSelect />
                  </Modal.Window>

                  <Modal.Window name="upload">
                    <ImageUpload />
                  </Modal.Window>
                </Modal>
              )}
            </div>
          </InputDiv>

          <FormButtonRow>
            <SubmitButton disabled={isAdding}>Submit Event</SubmitButton>
            <ResetButton disabled={isAdding} onClick={reset} />
            <Button color="neutral" disabled={isAdding} onClick={close}>
              Cancel
            </Button>
          </FormButtonRow>
        </FormContainer>
      </form>
    </>
  );
}

export default AddEvent;
