import { useForm } from "react-hook-form";
import InputDiv from "../../ui/InputDiv";
import Button from "../../ui/Button";
import SubmitButton from "../../ui/SubmitButton";
import ResetButton from "../../ui/ResetButton";
import FormButtonRow from "../../ui/FormButtonRow";
import FormContainer from "../../ui/FormContainer";

function ChangePassword() {
  const { formState, reset, handleSubmit, register, getValues } = useForm();
  const { errors } = formState;

  function submitFunc() {
    alert("This functionality is work in progress");
  }

  //todo; replace
  const isPending = false;

  return (
    <>
      <h3 className="mx-auto mt-15 w-110 border-t-4 border-t-neutral-300 pt-3 text-center">
        Change Password
      </h3>
      <p className="max-w-auto text-center">
        <span className="font-bold">NOTE:</span> This form is a work in
        progress.
      </p>

      <form onSubmit={handleSubmit(submitFunc)}>
        <FormContainer>
          <InputDiv
            labelFor="password"
            label="Current Password"
            error={errors?.password?.message}
            required={true}
          >
            <input
              id="password"
              type="password"
              required
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Must be at least 8 characters",
                },
              })}
              disabled={isPending}
            />
          </InputDiv>

          <InputDiv
            labelFor="newPassword"
            label="New Password"
            error={errors?.newPassword?.message}
            required={true}
          >
            <input
              id="newPassword"
              type="password"
              required
              {...register("newPassword", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Must be at least 8 characters",
                },
              })}
              disabled={isPending}
            />
          </InputDiv>

          <InputDiv
            labelFor="confirmPassword"
            label="Confirm Password"
            error={errors?.confirmPassword?.message}
            required={true}
          >
            <input
              id="confirmPassword"
              type="password"
              required
              {...register("confirmPassword", {
                validate: (value) =>
                  value === getValues().password ||
                  "Repeat password not matched",
              })}
              disabled={isPending}
            />
          </InputDiv>

          <FormButtonRow>
            <SubmitButton disabled={isPending}>Change Password</SubmitButton>
            <ResetButton disabled={isPending} onClick={reset} />
            <Button
              color="neutral"
              disabled={isPending}
              onClick={() => close()}
            >
              Cancel
            </Button>
          </FormButtonRow>
        </FormContainer>
      </form>
    </>
  );
}

export default ChangePassword;
