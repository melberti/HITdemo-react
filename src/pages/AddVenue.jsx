import { useForm } from "react-hook-form";
import {
  phoneValidationRegex,
  zipValidationRegex,
  urlValidationRegex,
} from "../utilities/utilities";
import { formatPhoneNumber } from "../utilities/utilities";
import { useAddVenue } from "../features/venue/useAddVenue";
import FormContainer from "../ui/FormContainer";
import ButtonRow from "../ui/ButtonRow";
import SubmitButton from "../ui/SubmitButton";
import ResetButton from "../ui/ResetButton";
import InputDiv from "../ui/InputDiv";
import SelectState from "../ui/SelectState";

function AddVenue() {
  const { register, handleSubmit, formState, clearErrors, reset } = useForm();
  const { errors } = formState;

  const { isAdding, addVenue } = useAddVenue();

  function submitFunc(data) {
    if (!errors.length) {
      const { name, address1, city, state, zipCode, url, phone } = data;
      addVenue({ name, address1, city, state, zipCode, url, phone });
    } else {
      console.log(errors);
      return errors;
    }
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    e.target.value = formatted;
  };

  return (
    <>
      <h2 className="mb-5 text-center">Add Venue</h2>
      <form onSubmit={handleSubmit(submitFunc)}>
        <FormContainer>
          <InputDiv
            label="Name"
            labelFor="name"
            error={errors?.name?.message}
            required={true}
          >
            <input
              type="text"
              id="name"
              {...register("name", { required: "Required" })}
              disabled={isAdding}
            />
          </InputDiv>

          <InputDiv
            label="Address"
            labelFor="address1"
            error={errors?.address1?.message}
            required={true}
          >
            <input
              type="text"
              id="address1"
              {...register("address1", { required: "Required" })}
              disabled={isAdding}
            />
          </InputDiv>

          <InputDiv
            label="City"
            labelFor="city"
            error={errors?.city?.message}
            required={true}
          >
            <input
              type="text"
              id="city"
              {...register("city", { required: "Required" })}
              disabled={isAdding}
            />
          </InputDiv>

          <InputDiv
            label="State"
            labelFor="state"
            error={errors?.state?.message}
            required={true}
          >
            <SelectState
              isRequired={true}
              labelFor="state"
              register={register}
              disabled={isAdding}
            />
          </InputDiv>

          <InputDiv
            label="Zip Code"
            labelFor="zipCode"
            error={errors?.zipCode?.message}
            required={true}
          >
            <input
              type="text"
              id="zipCode"
              inputMode="numeric"
              placeholder="99999"
              disabled={isAdding}
              {...register("zipCode", {
                required: "Required",
                pattern: {
                  value: zipValidationRegex,
                  message: "Must be 5 digits",
                },
                minLength: {
                  value: 5,
                  message: "Must be 5 digits",
                },
                maxLength: {
                  value: 5,
                  message: "Must be 5 digits",
                },
              })}
            />
          </InputDiv>

          <InputDiv
            label="Phone"
            labelFor="phone"
            error={errors?.phone?.message}
            required={true}
          >
            <input
              type="phone"
              id="phone"
              placeholder="999-999-9999"
              disabled={isAdding}
              {...register("phone", {
                required: "Required",
                pattern: {
                  value: phoneValidationRegex,
                  message: "Invalid phone",
                },
              })}
              onChange={(e) => handlePhoneChange(e)}
            />
          </InputDiv>

          <InputDiv
            label="Venue URL"
            labelFor="url"
            error={errors?.url?.message}
          >
            <input
              type="text"
              id="url"
              disabled={isAdding}
              {...register("url", {
                required: false,
                pattern: {
                  value: urlValidationRegex,
                  message: "Invalid URL",
                },
              })}
            />
          </InputDiv>
          <ButtonRow>
            <SubmitButton disabled={isAdding}>Submit Venue</SubmitButton>
            <ResetButton disabled={isAdding} onClick={reset} />
          </ButtonRow>
        </FormContainer>
      </form>
    </>
  );
}

export default AddVenue;
