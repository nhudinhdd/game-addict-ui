import { SelectBar } from "components/select/select";
import useSeason from "libs/hooks/useSeason";
import useTrait from "libs/hooks/useTrait";
import { useEffect, useState } from "react";

interface SeasonSelectProps {
  setSeasonID?: (id: string) => void;
}
export function TraitSelect(props: SeasonSelectProps) {
  const { setSeasonID } = props;
  const { data, isLoading } = useSeason();
  const [valueSelect, setValueSelect] = useState("");

  useEffect(() => {
    if (valueSelect) setSeasonID(valueSelect);
    else {
      if (!isLoading) setSeasonID(data[0].seasonID);
    }
  }, [valueSelect, isLoading]);
  if (isLoading) {
    return null;
  }
  return (
    <SelectBar
      setValueSelect={setValueSelect}
      data={data}
      keyName="seasonID"
      keyValue="shortName"
      isDataList={false}
    ></SelectBar>
  );
}
