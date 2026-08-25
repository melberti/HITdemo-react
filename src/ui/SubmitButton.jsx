import Button from "./Button";

function SubmitButton({ disabled, children }) {
  return (
    <Button disabled={disabled} color="primary" size="normal">
      {children}
    </Button>
  );
}

export default SubmitButton;
