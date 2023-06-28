import useContinent from "libs/hooks/useCotinent";
import { ContinentRes } from "models/continent/continent";
import useSWR from "swr";

interface ContinentSelectProps {
  setContinentID: (id: string) => void;
  continentID?: string;
}
export function ContinentSelect(props: ContinentSelectProps) {
  const { setContinentID, continentID } = props;
  const { data } = useContinent();
  console.log("test");

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
          defaultValue={continentID ? continentID : ""}
          onChange={(e) => {
            setContinentID(e.target.value);
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
