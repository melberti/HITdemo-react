import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import Button from "../ui/Button";
import { useSignIn } from "../features/authentication/useSignIn";

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
      <h3 className="mb-5 text-center">Sign In</h3>
      <form onSubmit={handleSubmit(submitFunc)}>
        <div className="flex flex-col items-center justify-center">
          <div className="inputDiv">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              {...register("email", { required: true })}
              disabled={isLoading}
            />
            {errors?.email}
          </div>
          <div className="inputDiv">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              {...register("password", { required: true })}
              disabled={isLoading}
            />
            {errors?.password}
          </div>

          <div className="inputDiv">
            <Button disabled={isLoading}>Sign In</Button>
          </div>

          <div className="mt-10">
            Not a member yet? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignIn;
