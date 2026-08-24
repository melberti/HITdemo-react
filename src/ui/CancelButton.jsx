import Button from "./Button";

function CancelButton({ isLoading, onClick, size = "normal" }) {
  return (
    <Button disabled={isLoading} type="neutral" size={size} onClick={onClick}>
      Cancel
    </Button>
  );
}

export default CancelButton;
