import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import { useSignIn } from "../features/authentication/useSignIn";
import { emailValidationRegex } from "../utilities/utilities";
import { useNavigate } from "react-router";
import Button from "../ui/Button";
import SubmitButton from "../ui/SubmitButton";
import ResetButton from "../ui/ResetButton";
import InputDiv from "../ui/InputDiv";
import FormContainer from "../ui/FormContainer";
import ButtonRow from "../ui/ButtonRow";

function SignIn() {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const { signIn, isLoading } = useSignIn();
  const navigate = useNavigate();

  function submitFunc(data) {
    if (!errors.length) {
      const { email, password } = data;
      signIn(
        { email, password },
        {
          onSuccess: () => {
            toast.success("Sign in successful");
          },
          onError: () => {
            console.log("something wrong");
          },
          onSettled: reset(),
        },
      );
    } else {
      return errors;
    }
  }

  //return to home when Cancel is clicked
  function close() {
    navigate("/");
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
              autoFocus
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
            <SubmitButton disabled={isLoading}>Sign In</SubmitButton>
            <ResetButton disabled={isLoading} onClick={reset} />
            <Button
              color="neutral"
              disabled={isLoading}
              onClick={() => close()}
            >
              Cancel
            </Button>
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
