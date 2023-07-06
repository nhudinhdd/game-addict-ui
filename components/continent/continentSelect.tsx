import useContinent from "libs/hooks/useCotinent";
import { useEffect, useState } from "react";

interface ContinentSelectProps {
  setContinentID: (id: string) => void;
  continentID?: string;
}
export function ContinentSelect(props: ContinentSelectProps) {
  const { setContinentID, continentID } = props;
  const { data, isLoading } = useContinent();
  const [valueSelect, setValueSelect] = useState("");
  useEffect(() => {
    if (valueSelect) setContinentID(valueSelect);
    else {
      setContinentID(continentID);
    }
  });
  if (isLoading) {
    return null;
  }
  return (
    <div className="flex-row mb-3">
      <div className="mb-3">
        <label htmlFor="contientSelect" className="font-bold text-lg">
          Continent
        </label>
      </div>
      <div>
        <select
          name="contientSelect"
          defaultValue={continentID}
          onChange={(e) => {
            setValueSelect(e.target.value);
          }}
          className="border-2 border-slate-600 rounded-lg h-8"
        >
          <option value="">Tất cả</option>
          {data?.map((cotinent) => (
            <option value={cotinent.continentID} key={cotinent.continentID}>
              {cotinent.continentName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
