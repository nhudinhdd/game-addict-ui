import useNation from "libs/hooks/useNation";
import { useEffect, useState } from "react";

interface NationSelectProps {
  continentID?: string;
  setNationID?: (id: string) => void;
}
export function NationSelect(props: NationSelectProps) {
  const { continentID, setNationID } = props;
  const { data, isLoading } = useNation({ continentID: continentID });
  const [valueSelect, setValueSelect] = useState("");

  useEffect(() => {
    if (valueSelect) setNationID(valueSelect);
    else {
      if (!isLoading) setNationID(data[0].nationID);
    }
  }, [valueSelect, isLoading]);
  if (isLoading) {
    return null;
  }
  return (
    <div className="flex-row mb-3">
      <div className="mb-3">
        <label htmlFor="nationSelect" className="font-bold text-lg">
          Nation
        </label>
      </div>
      <div>
        <select
          name="nationSelect"
          onChange={(e) => {
            setValueSelect(e.target.value);
          }}
          className="border-2 border-slate-600 rounded-lg h-8"
        >
          {Array.isArray(data) && data.length ? (
            data.map((nation) => (
              <option value={nation.nationID} key={nation.nationName}>
                {nation.nationName}
              </option>
            ))
          ) : (
            <option value="" disabled selected>
              ---------
            </option>
          )}
        </select>
      </div>
    </div>
  );
}
