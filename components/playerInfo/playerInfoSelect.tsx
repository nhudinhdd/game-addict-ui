import { SelectBar } from "components/select/select";
import usePlayerInfo from "libs/hooks/usePlayerInfo";
import { useEffect, useState } from "react";

interface PlayerInfoSelectProps {
  setPlayerID: (id: string) => void;
  playerIdDefault?: string;
}
export function PlayerInfoSelect(props: PlayerInfoSelectProps) {
  const { setPlayerID, playerIdDefault } = props;
  const { data, isLoading } = usePlayerInfo();
  const [valueSelect, setValueSelect] = useState(playerIdDefault || "");

  useEffect(() => {
    setPlayerID(valueSelect);
  }, [valueSelect]);
  if (isLoading) {
    return null;
  }
  return (
    <SelectBar
      setValueSelect={setValueSelect}
      data={data}
      keyName="playerID"
      keyValue="lastName"
      isDataList={true}
      selectName="Player"
      defaultValue={playerIdDefault}
    ></SelectBar>
  );
}
