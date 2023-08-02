import { SelectBar } from "components/select/select";
import useSeason from "libs/hooks/useSeason";
import { useEffect, useState } from "react";

interface SeasonSelectProps {
  setSeasonID?: (id: string) => void;
  defaultID?: string;
}
export function SeasonSelect(props: SeasonSelectProps) {
  const { setSeasonID, defaultID } = props;
  const { data, isLoading } = useSeason();
  const [valueSelect, setValueSelect] = useState(defaultID || "");
  console.log(defaultID);

  useEffect(() => {
    setSeasonID(valueSelect);
  }, [valueSelect]);
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
      selectNameHeader="Season"
      defaultValue={defaultID}
    ></SelectBar>
  );
}
