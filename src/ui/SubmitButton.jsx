import Button from "./Button";

function SubmitButton({ isLoading, children }) {
  return (
    <Button disabled={isLoading} type="primary" size="normal">
      {children}
    </Button>
  );
}

export default SubmitButton;
