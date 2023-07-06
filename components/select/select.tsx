interface SelectBarProps {
  setValueSelect: (value: string) => void;
  data: Array<any>;
  keyName: string;
  keyValue: string;
  isDataList: boolean;
  selectName: string;
  defaultValue?: string;
}

interface SelectBarWithoutFilterProps {
  setValueSelect: (value: string) => void;
  keyName: string;
  keyValue: string;
  data: Array<any>;
  defaultValue?: string;
}

interface SelectBarWithFilterProps {
  data: Array<any>;
  keyName: string;
  keyValue: string;
  setValueSelect: (value: string) => void;
  defaultValue?: string;
}

interface DataOption {
  data: Array<any>;
  keyName: string;
  keyValue: string;
}

function SelectBarWithoutFilter(props: SelectBarWithoutFilterProps) {
  const { setValueSelect, keyName, keyValue, data, defaultValue } = props;
  return (
    <select
      name="selectProperties"
      onChange={(e) => {
        setValueSelect(e.target.value);
      }}
      defaultValue={defaultValue}
      className="border-2 border-slate-600 rounded-lg h-8"
    >
      <DataOption data={data} keyName={keyName} keyValue={keyValue} />
    </select>
  );
}

function SelectBarWithFilter(props: SelectBarWithFilterProps) {
  const { data, keyName, keyValue, setValueSelect, defaultValue } = props;

  return (
    <div>
      <input
        list="data"
        onChange={(e) => {
          setValueSelect(e.target.value);
        }}
        defaultValue={defaultValue}
        placeholder="Search Player"
      ></input>
      <datalist id="data">
        <DataOption data={data} keyName={keyName} keyValue={keyValue} />
      </datalist>
    </div>
  );
}

function DataOption(props: DataOption) {
  const { data, keyName, keyValue } = props;
  return (
    <>
      <option value="">Tất cả</option>
      {Array.isArray(data) && data.length ? (
        data.map((input) => (
          <option value={input[`${keyName}`]} key={input[`${keyName}`]}>
            {input[`${keyValue}`]}
          </option>
        ))
      ) : (
        <option value="" disabled selected>
          ---------
        </option>
      )}
    </>
  );
}
export function SelectBar(props: SelectBarProps) {
  const {
    setValueSelect,
    data,
    keyName,
    keyValue,
    isDataList,
    selectName,
    defaultValue,
  } = props;

  return (
    <div className="flex-row mb-3">
      <div className="mb-3">
        <label htmlFor="selectProperties" className="font-bold text-lg">
          {selectName}
        </label>
      </div>
      <div>
        {isDataList ? (
          <SelectBarWithFilter
            data={data}
            keyName={keyName}
            keyValue={keyValue}
            setValueSelect={setValueSelect}
            defaultValue={defaultValue}
          ></SelectBarWithFilter>
        ) : (
          <SelectBarWithoutFilter
            data={data}
            keyName={keyName}
            keyValue={keyValue}
            setValueSelect={setValueSelect}
            defaultValue={defaultValue}
          ></SelectBarWithoutFilter>
        )}
      </div>
    </div>
  );
}
