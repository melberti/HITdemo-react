import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import { useSignIn } from "../features/authentication/useSignIn";
import { emailValidationRegex } from "../utilities/utilities";
import SubmitButton from "../ui/SubmitButton";
import CancelButton from "../ui/CancelButton";
import InputDiv from "../ui/InputDiv";
import FormContainer from "../ui/FormContainer";
import ButtonRow from "../ui/ButtonRow";

function SignIn() {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const { signIn, isLoading } = useSignIn();

  function submitFunc(data) {
    //console.log(data);

    if (!errors.length) {
      const { email, password } = data;
      signIn(
        { email, password },
        {
          onSuccess: () => {
            toast.success("Sign in successful");
          },
          onSettled: reset(),
        },
      );
    } else {
      return errors;
    }
  }

  return (
    <>
      <h2 className="mb-5 text-center">Sign In</h2>
      <form onSubmit={handleSubmit(submitFunc)}>
        <FormContainer>
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
              {...register("password", { required: true })}
              disabled={isLoading}
            />
            {errors?.password}
          </InputDiv>

          <ButtonRow>
            <SubmitButton isLoading={isLoading}>Sign In</SubmitButton>
            <CancelButton isLoading={isLoading} onClick={reset} />
          </ButtonRow>

          <ButtonRow>
            Not a member yet?{" "}
            <Link to="/signup" className="caret">
              Sign Up
            </Link>
          </ButtonRow>
        </FormContainer>
      </form>
    </>
  );
}

export default SignIn;
