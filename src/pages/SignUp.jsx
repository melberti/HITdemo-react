import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import Button from "../ui/Button";
import { useSignUp } from "../features/authentication/useSignup";
import FormError from "../ui/FormError";
import { emailValidationRegex } from "../utilities/utilities";

function SignUp() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();

  const { signUp, isLoading } = useSignUp();

  function submitFunc(data) {
    //console.log(data);

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
      return errors;
    }
  }

  return (
    <form onSubmit={handleSubmit(submitFunc)}>
      <div className="flex flex-col items-center justify-center">
        <div className="inputDiv">
          <label htmlFor="firstName">First Name</label>
          <div className="flex flex-col">
            <input
              id="firstName"
              type="text"
              required
              {...register("firstName", {
                required: true,
                minLength: {
                  value: 2,
                  message: "You must provide at least 2 characters",
                },
              })}
              disabled={isLoading}
            />
            <FormError message={errors?.email?.message} />
          </div>
        </div>

        <div className="inputDiv">
          <label htmlFor="lastName">Last Name</label>
          <div className="flex flex-col">
            <input
              id="lastName"
              type="text"
              required
              {...register("lastName", {
                required: true,
                minLength: {
                  value: 2,
                  message: "You must provide at least 2 characters",
                },
              })}
              disabled={isLoading}
            />
            <FormError message={errors?.email?.message} />
          </div>
        </div>

        <div className="inputDiv">
          <label htmlFor="email">Email</label>
          <div className="flex flex-col">
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
            <FormError message={errors?.email?.message} />
          </div>
        </div>

        <div className="inputDiv">
          <label htmlFor="password">Password</label>
          <div className="flex flex-col">
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
            <FormError message={errors?.password?.message} />
          </div>
        </div>

        <div className="inputDiv">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="flex flex-col">
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
            <FormError message={errors?.confirmPassword?.message} />
          </div>
        </div>

        <div className="inputDiv">
          <Button disabled={isLoading} type="primary" size="normal">
            Sign Up
          </Button>
        </div>

        <div className="mt-10">
          Already a member? <Link to="/sigin">Sign In</Link>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
