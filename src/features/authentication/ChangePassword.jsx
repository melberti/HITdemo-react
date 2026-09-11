import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useUpdatePassword } from "./useUpdatePassword";
import InputDiv from "../../ui/InputDiv";
import Button from "../../ui/Button";
import SubmitButton from "../../ui/SubmitButton";
import ResetButton from "../../ui/ResetButton";
import FormButtonRow from "../../ui/FormButtonRow";
import FormContainer from "../../ui/FormContainer";

function ChangePassword() {
  const { formState, reset, handleSubmit, register, getValues } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();

  const { updatePassword, isUpdating } = useUpdatePassword();

  function submitFunc(data) {
    const { currentPassword, newPassword } = data;
    updatePassword(
      { currentPassword, newPassword },
      { onSuccess: () => navigate("/dashboard") },
    );
  }

  function cancel() {
    navigate("/dashboard");
  }

  return (
    <>
      <h3 className="mx-auto mt-15 w-110 border-t-4 border-t-neutral-300 pt-3 text-center">
        Change Password
      </h3>

      <form onSubmit={handleSubmit(submitFunc)}>
        <FormContainer>
          <InputDiv
            labelFor="currentPassword"
            label="Current Password"
            error={errors?.currentPassword?.message}
            required={true}
          >
            <input
              id="currentPassword"
              type="password"
              required
              {...register("currentPassword", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Must be at least 8 characters",
                },
              })}
              disabled={isUpdating}
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
              disabled={isUpdating}
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
                  value === getValues().newPassword ||
                  "Repeat password not matched",
              })}
              disabled={isUpdating}
            />
          </InputDiv>

          <FormButtonRow>
            <SubmitButton disabled={isUpdating}>Change Password</SubmitButton>
            <ResetButton disabled={isUpdating} onClick={reset} />
            <Button
              color="neutral"
              disabled={isUpdating}
              onClick={() => cancel()}
              type="button"
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
