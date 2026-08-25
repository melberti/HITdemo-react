import { useForm } from "react-hook-form";
import { urlValidationRegex } from "../utilities/utilities";
import { useCategory } from "../features/event/useCategory";
import FormContainer from "../ui/FormContainer";
import InputDiv from "../ui/InputDiv";
import SubmitButton from "../ui/SubmitButton";
import ResetButton from "../ui/ResetButton";
import ButtonRow from "../ui/ButtonRow";

function AddEvent() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const { categories, isLoading: isLoadingCategories } = useCategory();
  //TODO: save event

  //to be replaced with use method
  const { isLoading } = false;

  function submitFunc(data) {
    const {
      title,
      description,
      eventDate,
      eventStartTime,
      eventEndTime,
      // image,
      // categoryId,
      // venueId,
      eventUrl,
      cost,
    } = data;

    console.log(
      "submitted:",
      title,
      description,
      eventDate,
      StartTime,
      eventEndTime,
      // image,
      // categoryId,
      // venueId,
      eventUrl,
      cost,
    );

    // if (!errors.length) {
    //   console.log("data", data);
    // } else {
    //   console.log("errors", errors);
    //   return errors;
    // }
  }

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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
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
            <span className="ml-2 flex flex-nowrap justify-items-start gap-1">
              <input
                type="time"
                id="eventStartTime"
                className="datetime"
                {...register("eventStartTime", {
                  required: "Both start and end times are required",
                })}
                disabled={isLoading}
              />
              <span className="pt-1">to</span>
              <input
                type="time"
                id="eventEndTime"
                className="datetime"
                {...register("eventEndTime", {
                  required: "Both start and end times are required",
                })}
                disabled={isLoading}
              />
            </span>
          </InputDiv>

          <ul>
            <li>select categoryId</li>
            <li>select venueId</li>
            <li>upload image</li>
          </ul>

          <InputDiv
            label="Event URL"
            labelFor="eventUrl"
            error={errors?.eventUrl?.message}
          >
            <input
              type="text"
              id="eventUrl"
              disabled={isLoading}
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
              disabled={isLoading}
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
