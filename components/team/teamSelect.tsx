import { SelectBar } from "components/select/select";
import useTeam from "libs/hooks/useTeam";
import { useEffect, useState } from "react";

interface TeamSelectProps {
  tourID?: string;
  setTeamID?: (id: string) => void;
  teamIdDefault?: string;
}
export function TeamSelect(props: TeamSelectProps) {
  const { tourID, setTeamID, teamIdDefault } = props;

  const { data, isLoading } = useTeam({ tourID: tourID });
  const [valueSelect, setValueSelect] = useState(teamIdDefault || "");

  useEffect(() => {
    setTeamID(valueSelect);
  }, [valueSelect]);
  if (isLoading) {
    return null;
  }
  return (
    <SelectBar
      setValueSelect={setValueSelect}
      data={data}
      keyName="teamID"
      keyValue="teamName"
      isDataList={false}
      selectNameHeader="Team"
      defaultValue={teamIdDefault}
    ></SelectBar>
  );
}
