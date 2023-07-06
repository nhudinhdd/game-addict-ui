import useTournament from "libs/hooks/useTournament";
import { useEffect, useState } from "react";

interface SelectProps {
  setTournamentID: (id: string) => void;
  tourID?: string;
}
export function TournamentSelect(props: SelectProps) {
  const { setTournamentID, tourID } = props;
  const { data, isLoading } = useTournament();
  const [valueSelect, setValueSelect] = useState("");
  useEffect(() => {
    setTournamentID(valueSelect);
  }, [valueSelect]);
  if (isLoading) {
    return null;
  }
  return (
    <div className="flex-row mb-3">
      <div className="mb-3">
        <label htmlFor="tournamentSelect" className="font-bold text-lg">
          Tournament
        </label>
      </div>
      <div>
        <select
          name="tournamentSelect"
          defaultValue={tourID}
          onChange={(e) => {
            setValueSelect(e.target.value);
          }}
          className="border-2 border-slate-600 rounded-lg h-8"
        >
          <option value="">Tất cả</option>
          {data?.map((cotinent) => (
            <option value={cotinent.tourID} key={cotinent.tourID}>
              {cotinent.tourName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
