import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { useSignUp } from "../features/authentication/useSignup";
import { emailValidationRegex } from "../utilities/utilities";
import Button from "../ui/Button";
import SubmitButton from "../ui/SubmitButton";
import ResetButton from "../ui/ResetButton";
import InputDiv from "../ui/InputDiv";
import FormContainer from "../ui/FormContainer";
import FormButtonRow from "../ui/FormButtonRow";

function SignUp() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();

  const { signUp, isPending } = useSignUp();

  function submitFunc(data) {
    if (!errors.length) {
      const { email, password, firstName, lastName } = data;

      signUp(
        { email, password, firstName, lastName },
        {
          onSuccess: () => {
            toast.success(
              'Sign up successful. Please check your email for an email from Supabase with the subject "Confirm your email address". You must confirm your address before you can sign in.',
              {
                duration: 10000,
              },
            );
            navigate("/signin");
          },
          onSettled: reset(),
        },
      );
    } else {
      console.log(errors);
      return errors;
    }
  }

  //return to home when Cancel is clicked
  function close() {
    navigate("/");
  }

  return (
    <>
      <h2 className="mb-5 text-center">Sign Up</h2>

      <p className="mx-123">
        <span className="font-semibold">Please use a valid email address.</span>{" "}
        After signing up you will receive an email from Supabase with the
        subject "Confirm your email address". You must confirm your address
        before you can sign in.
      </p>
      <form onSubmit={handleSubmit(submitFunc)}>
        <FormContainer>
          <InputDiv
            labelFor="firstName"
            label="First Name"
            error={errors?.firstName?.message}
          >
            <input
              id="firstName"
              type="text"
              required
              {...register("firstName", {
                required: true,
              })}
              disabled={isPending}
            />
          </InputDiv>

          <InputDiv
            labelFor="lastName"
            label="Last Name"
            error={errors?.lastName?.message}
          >
            <input
              id="lastName"
              type="text"
              required
              {...register("lastName", {
                required: true,
              })}
              disabled={isPending}
            />
          </InputDiv>

          <InputDiv
            labelFor="email"
            label="Email"
            error={errors?.email?.message}
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
              disabled={isPending}
            />
          </InputDiv>

          <InputDiv
            labelFor="password"
            label="Password"
            error={errors?.password?.message}
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
            labelFor="confirmPassword"
            label="Confirm Password"
            error={errors?.confirmPassword?.message}
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
            <SubmitButton disabled={isPending}>Sign Up</SubmitButton>
            <ResetButton disabled={isPending} onClick={reset} />
            <Button
              color="neutral"
              disabled={isPending}
              onClick={() => close()}
              type="button"
            >
              Cancel
            </Button>
          </FormButtonRow>

          <FormButtonRow>
            Already a member?{" "}
            <Link to="/signin" className="caret">
              Sign In
            </Link>
          </FormButtonRow>
        </FormContainer>
      </form>
    </>
  );
}

export default SignUp;
