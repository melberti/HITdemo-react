import { useForm } from "react-hook-form";
import { urlValidationRegex } from "../utilities/utilities";
import FormContainer from "../ui/FormContainer";
import InputDiv from "../ui/InputDiv";
import SubmitButton from "../ui/SubmitButton";
import CancelButton from "../ui/CancelButton";
import ButtonRow from "../ui/ButtonRow";

function AddEvent() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  //to be replaced with use method
  const { isLoading } = false;

  function submitFunc(data) {
    if (!errors.length) {
      const {
        title,
        description,
        eventDate,
        eventTime,
        image,
        categoryId,
        venueId,
        eventUrl,
        cost,
      } = data;

      console.log(
        title,
        description,
        eventDate,
        eventTime,
        image,
        categoryId,
        venueId,
        eventUrl,
        cost,
      );

      console.log("data", data);
    } else {
      console.log("errors", errors);
    }
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
          >
            <input
              type="text"
              id="title"
              {...register("title", { required: true })}
            />
          </InputDiv>
          <InputDiv
            label="Description"
            labelFor="description"
            error={errors?.description?.message}
          >
            <input
              type="textbox"
              width={200}
              height={100}
              id="description"
              {...register("description", { required: true })}
            />
          </InputDiv>
          <InputDiv
            className="ml-2 flex flex-nowrap justify-items-start gap-3"
            label="Date and Time"
            labelFor="eventDate"
            error={
              errors?.eventDate?.message
                ? errors?.eventDate?.message
                : errors?.eventTime?.message && errors?.eventTime.message
            }
          >
            <span className="ml-2 flex flex-nowrap justify-items-start gap-1">
              <input
                type="date"
                id="eventDate"
                className="datetime"
                {...register("eventDate", { required: true })}
              />

              <input
                type="time"
                id="eventTime"
                className="datetime"
                {...register("eventTime", { required: true })}
              />
            </span>
          </InputDiv>

          <ul>
            <li>select categoryId</li>
            <li>select venueId</li>
            <li>select organizerId</li>
            <li>upload image</li>
          </ul>

          <InputDiv label="Event URL" labelFor="eventUrl">
            <input
              type="text"
              id="eventUrl"
              error={errors?.eventUrl?.message}
              {...register("eventUrl", {
                required: false,
                pattern: {
                  value: urlValidationRegex,
                  message: "Invalid URL",
                },
              })}
            />
          </InputDiv>

          <InputDiv label="Event Cost (0 for free)" labelFor="cost">
            <input
              type="number"
              id="cost"
              defaultValue={0}
              error={errors?.cost?.message}
              {...register("cost", { required: true })}
            />
          </InputDiv>

          <ButtonRow>
            <SubmitButton isLoading={isLoading}>Submit Event</SubmitButton>
            <CancelButton isLoading={isLoading} onClick={reset} />
          </ButtonRow>
        </FormContainer>
      </form>
    </>
  );
}

export default AddEvent;
