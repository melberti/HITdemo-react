import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  phoneValidationRegex,
  zipValidationRegex,
  urlValidationRegex,
  defaultDashboardUrl,
} from "../utilities/utilities";
import { formatPhoneNumber } from "../utilities/utilities";
import { useAddVenue } from "../features/venue/useAddVenue";
import { useUpdateVenue } from "../features/venue/useUpdateVenue";
import { useStates } from "../features/venue/useStates";
import SelectBox from "../ui/SelectBox";
import FormContainer from "../ui/FormContainer";
import FormButtonRow from "../ui/FormButtonRow";
import SubmitButton from "../ui/SubmitButton";
import ResetButton from "../ui/ResetButton";
import Button from "../ui/Button";
import InputDiv from "../ui/InputDiv";
import Spinner from "../ui/Spinner";

function AddVenue({ venue, onCloseModal, beforeOnClose }) {
  const isModal = Boolean(onCloseModal);

  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const { isAdding, addVenue } = useAddVenue();
  const { isUpdating, updateVenue } = useUpdateVenue();
  const { states, isLoading } = useStates();

  const navigate = useNavigate();

  function invalidSubmit(validationErrors) {}

  function submitFunc(data) {
    const { id, name, address1, city, state, zipCode, url, phone } = data;

    if (id) {
      updateVenue(
        {
          id,
          name,
          address1,
          city,
          state,
          zipCode,
          url,
          phone,
          isRetired: false,
        },
        {
          onSuccess: () => close(),
        },
      );
    } else {
      addVenue(
        {
          name,
          address1,
          city,
          state,
          zipCode,
          url,
          phone,
          isRetired: false,
        },
        {
          onSuccess: (newVenue) => {
            beforeOnClose(newVenue.id);
            close();
          },
        },
      );
    }
  }

  function close() {
    if (isModal) {
      onCloseModal();
    } else {
      navigate(defaultDashboardUrl);
    }
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    e.target.value = formatted;
  };

  const disabled = isAdding || isUpdating || isLoading;

  if (disabled) return <Spinner />;

  return (
    <>
      <h2 className="mb-5 text-center">Add Venue</h2>
      {/* fancy onSubmit; we need to stop the form post from propagating up to the AddEvent page when opened in a modal */}
      <form
        onSubmit={(event) => {
          event.stopPropagation();
          handleSubmit(submitFunc, invalidSubmit)(event);
        }}
      >
        <FormContainer>
          {venue && (
            <input type="hidden" id="id" value={venue.id} {...register("id")} />
          )}
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
              disabled={disabled}
              defaultValue={venue?.name}
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
              disabled={disabled}
              defaultValue={venue?.address1}
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
              disabled={disabled}
              defaultValue={venue?.city}
            />
          </InputDiv>

          <InputDiv
            label="State"
            labelFor="state"
            error={errors?.state?.message}
            required={true}
          >
            <SelectBox
              keyName="id"
              valueKeyName="abv"
              textKeyName="name"
              options={states}
              isRequired={true}
              isNumericValue={false}
              labelFor="state"
              onChange={() => {}}
              register={register}
              defaultValue={venue?.state}
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
              maxLength={5}
              inputMode="numeric"
              placeholder="99999"
              disabled={disabled}
              defaultValue={venue?.zipCode}
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
              disabled={disabled}
              defaultValue={formatPhoneNumber(venue?.phone)}
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
              disabled={disabled}
              defaultValue={venue?.url}
              {...register("url", {
                required: false,
                pattern: {
                  value: urlValidationRegex,
                  message: "Invalid URL",
                },
              })}
            />
          </InputDiv>
          <FormButtonRow>
            <SubmitButton disabled={disabled}>
              {venue?.id ? "Update" : "Submit"} Venue
            </SubmitButton>
            <ResetButton disabled={disabled} onClick={reset} />
            <Button color="neutral" disabled={disabled} onClick={close}>
              Cancel
            </Button>
          </FormButtonRow>
        </FormContainer>
      </form>
    </>
  );
}

export default AddVenue;
