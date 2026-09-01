import Button from "./Button";
import ButtonRow from "./ButtonRow";

function ConfirmAction({ action, objectName, onConfirm, onCloseModal }) {
  function carryoutOnConfirm() {
    onConfirm?.();
    onCloseModal?.();
  }
  return (
    <>
      <h3>
        Are you sure you want to {action.toUpperCase()} {objectName}?
      </h3>
      <ButtonRow>
        <Button type="button" onClick={carryoutOnConfirm} color="primary">
          Yes
        </Button>
        <Button type="button" onClick={() => onCloseModal?.()} color="neutral">
          No
        </Button>
      </ButtonRow>
    </>
  );
}

export default ConfirmAction;
