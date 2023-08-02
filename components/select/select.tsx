import { faCirclePlus, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface SelectBarProps {
  setValueSelect: (value: string) => void;
  data: Array<any>;
  keyName: string;
  keyValue: string;
  isDataList: boolean;
  selectNameHeader: string;
  defaultValue?: string;
  selectNameInput?: string;
  isMultipleSelect?: boolean;
  listDefaultValue?: string[];
}

interface SelectBarWithoutFilterProps {
  setValueSelect: (value: string) => void;
  keyName: string;
  keyValue: string;
  data: Array<any>;
  defaultValue?: string;
  selectNameInput?: string;
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
  const {
    setValueSelect,
    keyName,
    keyValue,
    data,
    defaultValue,
    selectNameInput,
  } = props;
  useEffect(() => {}, [defaultValue]);
  return (
    <select
      name={selectNameInput || "selectBarWithOutFilter"}
      onChange={(e) => {
        setValueSelect(e.target.value);
      }}
      defaultValue={defaultValue}
      className="border-2 border-slate-600 rounded-lg h-8 mr-2 mb-2"
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
    selectNameHeader,
    defaultValue,
    selectNameInput,
    isMultipleSelect,
    listDefaultValue,
  } = props;
  const SelectBarWithOutFilter = () => {
    return (
      <SelectBarWithoutFilter
        data={data}
        keyName={keyName}
        keyValue={keyValue}
        setValueSelect={setValueSelect}
        defaultValue={defaultValue}
        selectNameInput={selectNameInput}
      ></SelectBarWithoutFilter>
    );
  };
  useEffect(() => {
    if (defaultValue)
      setSelectDropDown([<SelectBarWithOutFilter></SelectBarWithOutFilter>]);
  }, [defaultValue]);
  useEffect(() => {
    if (listDefaultValue?.length > 0) {
      const arr = listDefaultValue?.map((value) => {
        return (
          <SelectBarWithoutFilter
            data={data}
            keyName={keyName}
            keyValue={keyValue}
            setValueSelect={setValueSelect}
            defaultValue={value}
            selectNameInput={selectNameInput}
          ></SelectBarWithoutFilter>
        );
      });
      setSelectDropDown(arr);
    }
  }, listDefaultValue);
  const [selectDropDown, setSelectDropDown] = useState([
    <SelectBarWithOutFilter></SelectBarWithOutFilter>,
  ]);
  const addSelectDropDown = () => {
    setSelectDropDown(
      selectDropDown.concat(<SelectBarWithOutFilter></SelectBarWithOutFilter>)
    );
  };

  const removewSelectDropDown = () => {
    setSelectDropDown(selectDropDown.slice(0, -1));
  };

  return (
    <div className="flex-row mb-3">
      <div className="mb-3">
        <label htmlFor="selectProperties" className="font-bold text-lg">
          {selectNameHeader}
        </label>
      </div>
      <div className="mb-2">
        {isDataList ? (
          <SelectBarWithFilter
            data={data}
            keyName={keyName}
            keyValue={keyValue}
            setValueSelect={setValueSelect}
            defaultValue={defaultValue}
          ></SelectBarWithFilter>
        ) : (
          selectDropDown?.map((select) => {
            return select;
          })
        )}
      </div>

      {isMultipleSelect && (
        <div>
          <FontAwesomeIcon
            icon={faCirclePlus}
            style={{ color: "#000000" }}
            size="lg"
            className="cursor-pointer mr-2"
            onClick={addSelectDropDown}
          />
          <FontAwesomeIcon
            icon={faDeleteLeft}
            size="lg"
            style={{ color: "#000000" }}
            className="cursor-pointer"
            onClick={removewSelectDropDown}
          />
        </div>
      )}
    </div>
  );
}
