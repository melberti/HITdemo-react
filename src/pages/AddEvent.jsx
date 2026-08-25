import { useForm } from "react-hook-form";
import { urlValidationRegex } from "../utilities/utilities";
import { useCategory } from "../features/event/useCategory";
import { useAddEvent } from "../features/event/useAddEvent";
import { useMyVenues } from "../features/venue/useMyVenues";
import FormContainer from "../ui/FormContainer";
import InputDiv from "../ui/InputDiv";
import SubmitButton from "../ui/SubmitButton";
import ResetButton from "../ui/ResetButton";
import ButtonRow from "../ui/ButtonRow";
import SelectBox from "../ui/SelectBox";
import Spinner from "../ui/Spinner";

function AddEvent() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const { categories, isLoading: isLoadingCategories } = useCategory();
  const { venues, isLoading: isLoadingVenues } = useMyVenues();
  const { addEvent, isAdding } = useAddEvent();
  //TODO: save event

  //to be replaced with use method
  const { isLoading } = false;

  function submitFunc(data) {
    //modify the image property to get what we really need
    //data.image[0] for newly uploaded
    //string for existing without change
    const image = typeof data.image === "string" ? data.image : data.image[0];

    const {
      title,
      description,
      eventDate,
      eventStartTime,
      eventEndTime,
      categoryId,
      venueId,
      eventUrl,
      cost,
    } = data;

    if (!errors.length) {
      addEvent({
        title,
        description,
        eventDate,
        eventStartTime,
        eventEndTime,
        image,
        categoryId,
        venueId,
        eventUrl,
        cost,
      });
    } else {
      return errors;
    }
  }

  if (isLoadingCategories || isLoadingVenues) return <Spinner />;

  return (
    <>
      <h2 className="mb-5 text-center">Add Event</h2>
      <form onSubmit={handleSubmit(submitFunc)}>
        <FormContainer>
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
              {...register("title", { required: "Required" })}
              disabled={isAdding}
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
              {...register("description", {
                required: "Required",
              })}
              disabled={isAdding}
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
              disabled={isAdding}
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
              disabled={isAdding}
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
              })}
              disabled={isAdding}
            />
          </InputDiv>
          <InputDiv
            className="ml-2 flex flex-nowrap justify-items-start gap-3"
            label="Start and End Time"
            labelFor="eventStartTime"
            required={true}
            error={
              errors?.eventStartTime?.message
                ? errors?.eventStartTime?.message
                : errors?.eventEndTime?.message && errors?.eventEndTime.message
            }
          >
            <span className="ml-0 flex flex-nowrap justify-items-start gap-1">
              <input
                type="time"
                id="eventStartTime"
                className="datetime"
                {...register("eventStartTime", {
                  required: "Both start and end times are required",
                })}
                disabled={isAdding}
              />
              <span className="pt-1">to</span>
              <input
                type="time"
                id="eventEndTime"
                className="datetime"
                {...register("eventEndTime", {
                  required: "Both start and end times are required",
                })}
                disabled={isAdding}
              />
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
              defaultValue={0}
              placeholder="Enter 0 for FREE"
              disabled={isAdding}
              {...register("cost", {
                required: "Required",
                valueAsNumber: true,
                validate: (value) =>
                  !isNaN(value) || "Please enter a valid number",
                min: { value: 0, message: "Cost cannot be negative" },
                max: { value: 1000, message: "Cost cannot be more than 1000" },
              })}
            />
          </InputDiv>

          <InputDiv
            label="Image"
            labelFor="image"
            error={errors?.image?.message}
            required={false}
          >
            <input
              type="file"
              id="image"
              accept="image/*"
              disabled={isAdding}
              {...register("image", {
                required: false,
              })}
            />
            <span className="ml-2 text-sm text-neutral-500">
              A default image will be used if none is uploaded
            </span>
          </InputDiv>

          <ButtonRow>
            <SubmitButton disabled={isLoading}>Submit Event</SubmitButton>
            <ResetButton disabled={isLoading} onClick={reset} />
          </ButtonRow>
        </FormContainer>
      </form>
    </>
  );
}

export default AddEvent;
