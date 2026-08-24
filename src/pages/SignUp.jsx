import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { useSignUp } from "../features/authentication/useSignup";
import { emailValidationRegex } from "../utilities/utilities";
import SubmitButton from "../ui/SubmitButton";
import CancelButton from "../ui/CancelButton";
import InputDiv from "../ui/InputDiv";
import FormContainer from "../ui/FormContainer";
import ButtonRow from "../ui/ButtonRow";

function SignUp() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();

  const { signUp, isLoading } = useSignUp();

  function submitFunc(data) {
    if (!errors.length) {
      const { email, password, firstName, lastName } = data;

      signUp(
        { email, password, firstName, lastName },
        {
          onSuccess: () => {
            toast.success("Sign up successful. Please log in.", {
              duration: 6000,
            });
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

  return (
    <>
      <h2 className="mb-5 text-center">Sign Up</h2>

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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </InputDiv>

          <ButtonRow>
            <SubmitButton isLoading={isLoading}>Sign Up</SubmitButton>
            <CancelButton isLoading={isLoading} onClick={reset} />
          </ButtonRow>

          <ButtonRow>
            Already a member?{" "}
            <Link to="/signin" className="caret">
              Sign In
            </Link>
          </ButtonRow>
        </FormContainer>
      </form>
    </>
  );
}

export default SignUp;
