import { useStates } from "../features/venue/useStates";
import SelectBox from "./SelectBox";

function SelectState({ register }) {
  const { states, isLoading } = useStates();

  if (isLoading) {
    return null;
  }

  return (
    <SelectBox
      keyName="id"
      valueKeyName="abv"
      textKeyName="name"
      options={states}
      isRequired={true}
      isNumericValue={false}
      labelFor="state"
      onChange={() => {}}
      register={register}
    />
  );
}

export default SelectState;
