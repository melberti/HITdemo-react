import Button from "./Button";

function ResetButton({ disabled, onClick, size = "normal" }) {
  return (
    <Button
      disabled={disabled}
      color="neutral"
      size={size}
      onClick={onClick}
      type="reset"
    >
      Reset
    </Button>
  );
}

export default ResetButton;
