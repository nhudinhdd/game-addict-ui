import { SelectBar } from "components/select/select";
import useTrait from "libs/hooks/useTrait";
import { useEffect, useState } from "react";

interface TraitSelectProps {
  setTraitID?: (id: string) => void;
}
export function TraitSelect(props: TraitSelectProps) {
  const { setTraitID } = props;
  const { data, isLoading } = useTrait();
  const [valueSelect, setValueSelect] = useState("");

  useEffect(() => {
    if (valueSelect) setTraitID(valueSelect);
    else {
      if (!isLoading) setTraitID(data[0].traitID);
    }
  }, [valueSelect, isLoading]);
  if (isLoading) {
    return null;
  }
  return (
    <SelectBar
      setValueSelect={setValueSelect}
      data={data}
      keyName="traitID"
      keyValue="name"
      isDataList={false}
      selectName="Trait"
    ></SelectBar>
  );
}
