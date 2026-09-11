import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useUser } from "../features/authentication/useUser";
import { useUpdateUser } from "../features/authentication/useUpdateUser";
import { emailValidationRegex } from "../utilities/utilities";
import FormContainer from "../ui/FormContainer";
import InputDiv from "../ui/InputDiv";
import Button from "../ui/Button";
import SubmitButton from "../ui/SubmitButton";
import ResetButton from "../ui/ResetButton";
import FormButtonRow from "../ui/FormButtonRow";
import Spinner from "../ui/Spinner";
import ChangePassword from "../features/authentication/ChangePassword";

function Profile() {
  const { formState, handleSubmit, register, reset } = useForm();
  const { errors } = formState;

  const { user, isLoading } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const navigate = useNavigate();

  function submitFunc(data) {
    const { firstName, lastName, email } = data;
    updateUser(
      { firstName, lastName, email },
      { onSuccess: () => navigate("/dashboard") },
    );
  }

  function cancel() {
    navigate("/dashboard");
  }

  const disabled = isLoading || isUpdating;

  if (isLoading) return <Spinner />;

  return (
    <>
      <h3 className="mb-5 text-center">Update Profile</h3>
      <p className="mx-100">
        <span className="font-semibold">
          You must provide a valid email address.
        </span>{" "}
        Any change to email address after sign up will generate emails to both
        old and new addresses. Both addresses will receive an email from
        Supabase with the subject "Confirm your email address". You must confirm
        the change from BOTH accounts before you can sign in using that email
        address or see that address in your profile.
      </p>
      <p className="mx-100">
        Please note that because this is a demo web site, there are email limits
        of 2-3 per hour across all users. As a result, you may not receive the
        emails mentioned above, and may have to make any update to email address
        at a later time.
      </p>
      <form
        onSubmit={(event) => {
          handleSubmit(submitFunc)(event);
        }}
      >
        <FormContainer>
          {user && (
            <input
              type="hidden"
              id="userId"
              value={user.id}
              {...register("id")}
            />
          )}
          <InputDiv
            labelFor="firstName"
            label="First Name"
            error={errors?.firstName?.message}
            required={true}
          >
            <input
              id="firstName"
              type="text"
              required
              {...register("firstName", {
                required: true,
              })}
              disabled={isUpdating}
              defaultValue={user.user_metadata.firstName}
            />
          </InputDiv>

          <InputDiv
            labelFor="lastName"
            label="Last Name"
            error={errors?.lastName?.message}
            required={true}
          >
            <input
              id="lastName"
              type="text"
              required
              {...register("lastName", {
                required: true,
              })}
              disabled={isUpdating}
              defaultValue={user.user_metadata.lastName}
            />
          </InputDiv>

          <InputDiv
            labelFor="email"
            label="Email"
            error={errors?.email?.message}
            required={true}
          >
            <input
              id="email"
              type="email"
              required
              {...register("email", {
                required: true,
                pattern: {
                  value: emailValidationRegex,
                  message: "Invalid email",
                },
              })}
              disabled={isUpdating}
              defaultValue={user.email}
            />
          </InputDiv>
          <FormButtonRow>
            <SubmitButton disabled={disabled}>Update Profile</SubmitButton>
            <ResetButton disabled={disabled} onClick={reset} />
            <Button
              color="neutral"
              disabled={disabled}
              onClick={cancel}
              type="button"
            >
              Cancel
            </Button>
          </FormButtonRow>
        </FormContainer>
      </form>
      <div>
        <ChangePassword />
      </div>
    </>
  );
}

export default Profile;
