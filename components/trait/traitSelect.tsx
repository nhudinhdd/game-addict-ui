import { SelectBar } from "components/select/select";
import useTrait from "libs/hooks/useTrait";
import { PlayerSeasonTraitRes } from "models/apiWapper/playerSeasonTrait";

interface TraitSelectProps {
  setValue?: (values: string) => void;
  isMultipleSelect?: boolean;
  traitDefault?: string[];
}
export function TraitSelect(props: TraitSelectProps) {
  const { setValue, isMultipleSelect, traitDefault } = props;
  const { data, isLoading } = useTrait();
  console.log(traitDefault);

  if (isLoading) {
    return null;
  }
  return (
    <SelectBar
      setValueSelect={setValue}
      data={data}
      keyName="traitID"
      keyValue="name"
      isDataList={false}
      selectNameHeader="Trait"
      selectNameInput="TraitSelectInput"
      isMultipleSelect={isMultipleSelect}
      listDefaultValue={traitDefault}
    ></SelectBar>
  );
}
